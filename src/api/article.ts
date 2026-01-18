import http from '@/utils/http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// 查询首页文章列表
export async function searchArticleList(
  data: { title: string; categoryId: string; useId: string },
  config?: AxiosRequestConfig
): Promise<AxiosResponse> {
  return http.post('/article', data, config);
}

// 查询文章详情
export async function searchArticleDetail(
  id: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> {
  return http.get(`/article/${id}`, config);
}
