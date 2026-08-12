import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/shared/config/env'

const RETRYABLE_STATUS = new Set([408, 429, 502, 503, 504])
const RETRYABLE_METHODS = new Set(['get', 'head', 'options'])
const MAX_RETRIES = 2
const BASE_RETRY_DELAY = 400

interface RetryableConfig extends InternalAxiosRequestConfig {
  retryCount?: number
}

interface ApiEnvelope<T> {
  code?: number
  message?: string
  data: T
}

export class AppError extends Error {
  readonly status?: number
  readonly code: string

  constructor(message: string, options: { code?: string; status?: number; cause?: unknown } = {}) {
    super(message, { cause: options.cause })
    this.name = 'AppError'
    this.code = options.code || 'UNKNOWN_ERROR'
    this.status = options.status
  }
}

const client: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
  headers: {
    Accept: 'application/json'
  }
})

export function isRetryableRequest(
  method: string | undefined,
  status: number | undefined,
  retryCount: number,
  networkError: boolean
): boolean {
  const normalizedMethod = method?.toLowerCase() || 'get'
  if (!RETRYABLE_METHODS.has(normalizedMethod) || retryCount >= MAX_RETRIES) return false
  return networkError || (status !== undefined && RETRYABLE_STATUS.has(status))
}

function canRetry(error: AxiosError, config?: RetryableConfig): config is RetryableConfig {
  if (!config) return false
  return isRetryableRequest(config.method, error.response?.status, config.retryCount || 0, !error.response)
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}

client.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as RetryableConfig | undefined

  if (canRetry(error, config)) {
    config.retryCount = (config.retryCount || 0) + 1
    await wait(BASE_RETRY_DELAY * 2 ** (config.retryCount - 1))
    return client(config)
  }

  return Promise.reject(error)
})

export function unwrapResponse<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    const envelope = payload as ApiEnvelope<T>
    if (envelope.code !== undefined && envelope.code !== 200) {
      throw new AppError(envelope.message || '服务返回业务错误。', {
        code: String(envelope.code)
      })
    }
    return envelope.data
  }

  return payload as T
}

export function toAppError(error: unknown): AppError {
  if (!axios.isAxiosError(error)) {
    return error instanceof AppError ? error : new AppError('发生未知错误，请稍后重试。', { cause: error })
  }

  const status = error.response?.status
  const responseData = error.response?.data as { message?: string } | undefined
  const fallbackMessages: Record<number, string> = {
    400: '请求参数有误，请检查后重试。',
    401: '登录状态已失效，请重新登录。',
    403: '当前账号无权执行此操作。',
    404: '请求的内容不存在。',
    408: '请求超时，请稍后重试。',
    429: '请求过于频繁，请稍后重试。',
    500: '服务暂时异常，请稍后重试。',
    502: '服务网关异常，请稍后重试。',
    503: '服务暂不可用，请稍后重试。',
    504: '服务响应超时，请稍后重试。'
  }

  const message =
    responseData?.message || (status ? fallbackMessages[status] : undefined) || '网络连接失败，请检查网络后重试。'
  return new AppError(message, {
    code: error.code || 'HTTP_ERROR',
    status,
    cause: error
  })
}

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await client.request<unknown>(config)
    return unwrapResponse<T>(response.data)
  } catch (error) {
    throw toAppError(error)
  }
}
