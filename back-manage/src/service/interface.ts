export interface ILoginParams {
  username: string;
  password: string;
}

export interface IUserInfo {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestionParams {
  page?: number;
  pageSize?: number;
  isDeleted?: boolean;
}

export interface IQuestion {
  _id: string;
  title?: string;
  questionList?: Array<Record<string, unknown>>;
  answerCount?: number;
  isStar?: boolean;
  isPublished?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TQuestionsInfiniteData = {
  list: IQuestion[];
  total: number;
  page: number;
};
