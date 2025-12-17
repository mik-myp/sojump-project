import request from '@/utils/request';
import type { ILoginParams, IUserInfo } from './interface';

export function login(data: ILoginParams) {
  return request<{ token: string }>('/user/login', {
    method: 'POST',
    data,
  });
}
export function register(data: ILoginParams) {
  return request('/user/register', {
    method: 'POST',
    data,
  });
}

export function getUserInfo() {
  return request<IUserInfo>('/user/info', {
    method: 'GET',
  });
}
