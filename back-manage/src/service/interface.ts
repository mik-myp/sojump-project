export interface ILoginParams {
  username: string;
  password: string;
}

export interface IUserInfo {
  _id: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IQuestionParams {
  page?: number;
  pageSize?: number;
  isDeleted?: boolean;
}

export type TComponentType = 'questionTitle' | 'questionInput';

export interface IComponent {
  id?: string;
  title?: string;
  type?: TComponentType;
  props?: Record<string, unknown>;
  show?: boolean;
  lock?: boolean;
}

export interface IQuestion {
  _id: string;
  title?: string;
  componentList?: Array<IComponent>;
  answerCount?: number;
  isStar?: boolean;
  isPublished?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  pageSetting?: {
    px: number;
    py: number;
  };
}

export type TQuestionsInfiniteData = {
  list: IQuestion[];
  total: number;
  page: number;
};
