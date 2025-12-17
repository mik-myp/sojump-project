import request from '@/utils/request';
import type { ILoginParams, IUserInfo, IQuestion, IQuestionParams } from './interface';

export async function login(data: ILoginParams) {
  return request<{ token: string }>('/user/login', {
    method: 'POST',
    data,
  });
}
export async function register(data: ILoginParams) {
  return request('/user/register', {
    method: 'POST',
    data,
  });
}

export async function getUserInfo() {
  return request<IUserInfo>('/user/info', {
    method: 'GET',
  });
}

export async function addQuestion() {
  return request<{
    id: string;
  }>('/question', {
    method: 'POST',
  });
}

export async function getQuestions(data: IQuestionParams) {
  return request<{
    list: IQuestion[];
    total: number;
  }>('/question', {
    method: 'GET',
    params: data,
  });
}

export async function updateQuestion(
  data: Partial<IQuestion> & {
    id: string;
  },
) {
  return request<IQuestion>(`/question/${data.id}`, {
    method: 'PATCH',
    data: data,
  });
}

export async function restoreQuestions(ids: string[]) {
  return request<IQuestion[]>(`/question`, {
    method: 'PATCH',
    data: {
      ids,
    },
  });
}

export async function removeQuestions(ids: string[]) {
  return request<IQuestion[]>(`/question`, {
    method: 'DELETE',
    data: {
      ids,
    },
  });
}
