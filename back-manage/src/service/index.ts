import request from '@/utils/request';
import type { ILoginParams, IUserInfo, IQuestion, IQuestionParams, IAnswer } from './interface';

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
    autoSave?: boolean;
  },
) {
  const { autoSave, ...rest } = data;
  return request<IQuestion>(`/question/${data.id}`, {
    method: 'PATCH',
    data: rest,
  });
}

export async function restoreQuestions(ids: string[]) {
  return request(`/question`, {
    method: 'PATCH',
    data: {
      ids,
    },
  });
}

export async function removeQuestions(ids: string[]) {
  return request(`/question`, {
    method: 'DELETE',
    data: {
      ids,
    },
  });
}
export async function copyQuestion(data: { id: string }) {
  return request<{
    id: string;
  }>(`/question/duplicate/${data.id}`, {
    method: 'POST',
  });
}

export async function getQuestion(data: { id: string }) {
  return request<IQuestion>(`/question/${data.id}`, {
    method: 'GET',
  });
}

export async function getAnswers(data: { id: string }) {
  return request<IAnswer[]>('/answer', {
    method: 'GET',
    params: data,
  });
}
