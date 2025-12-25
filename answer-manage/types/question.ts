export type TComponentType = 'questionTitle' | 'questionInput';

export interface IComponent {
  id?: string;
  title?: string;
  type?: TComponentType;
  props?: Record<string, unknown>;
  show?: boolean;
  lock?: boolean;
}

export interface IQuestionnaire {
  _id: string;
  title?: string;
  componentList?: Array<IComponent>;
  answerCount?: number;
  isStar?: boolean;
  isPublished?: boolean;
  isDeleted?: boolean;
  pageSetting?: {
    px: number;
    py: number;
  };
  createdAt?: string;
  updatedAt?: string;
}
