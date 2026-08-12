import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { describe, expect, it } from 'vitest'
import { isRetryableRequest, toAppError, unwrapResponse } from './http'

describe('unwrapResponse', () => {
  it('unwraps a successful backend envelope', () => {
    expect(unwrapResponse<{ id: string }>({ code: 200, message: 'ok', data: { id: '1' } })).toEqual({ id: '1' })
  })

  it('throws an AppError for a failed business code', () => {
    expect(() => unwrapResponse({ code: 201, message: '查询失败', data: null })).toThrowError(
      expect.objectContaining({ name: 'AppError', code: '201', message: '查询失败' })
    )
  })

  it('keeps non-envelope payloads intact', () => {
    expect(unwrapResponse(['one'])).toEqual(['one'])
  })
})

describe('isRetryableRequest', () => {
  it('retries temporary GET failures within the limit', () => {
    expect(isRetryableRequest('GET', 503, 0, false)).toBe(true)
    expect(isRetryableRequest('get', undefined, 1, true)).toBe(true)
  })

  it('does not retry writes, permanent failures, or exhausted requests', () => {
    expect(isRetryableRequest('POST', 503, 0, false)).toBe(false)
    expect(isRetryableRequest('GET', 404, 0, false)).toBe(false)
    expect(isRetryableRequest('GET', 503, 2, false)).toBe(false)
  })
})

describe('toAppError', () => {
  it('maps HTTP status codes to actionable messages', () => {
    const config = {} as InternalAxiosRequestConfig
    const response = {
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config,
      data: {}
    } as AxiosResponse
    const error = new AxiosError('failed', 'ERR_BAD_REQUEST', config, undefined, response)

    expect(toAppError(error)).toEqual(
      expect.objectContaining({
        name: 'AppError',
        status: 404,
        code: 'ERR_BAD_REQUEST',
        message: '请求的内容不存在。'
      })
    )
  })
})
