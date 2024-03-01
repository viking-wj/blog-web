import http from '@/utils/http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function searchArticleList(
  data: { title: string; categoryId: string; useId: string },
  config?: AxiosRequestConfig
): Promise<AxiosResponse> {
  return http.post('/article', data, config);
}
