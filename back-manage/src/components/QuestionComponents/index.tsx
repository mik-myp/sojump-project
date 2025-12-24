/* eslint-disable react-refresh/only-export-components */
import type { IComponent, TComponentType } from '@/service/interface';
import { defaultInputProps, defaultTitleProps } from './constants';
import type { TQuestionInputProps, TQuestionTitleProps } from './interface';
import QuestionInput from './QuestionInput';
import QuestionInputSetting from './QuestionInput/Setting';
import QuestionTitle from './QuestionTitle';
import QuestionTitleSetting from './QuestionTitle/Setting';

export {
  defaultInputProps,
  defaultTitleProps,
  QuestionInput,
  QuestionTitle,
  QuestionInputSetting,
  QuestionTitleSetting,
};

export type { TQuestionInputProps, TQuestionTitleProps };

export const COMPONENT_MAP: Record<TComponentType, React.ComponentType<Record<string, unknown>>> = {
  questionTitle: QuestionTitle,
  questionInput: QuestionInput,
};

export const renderComponent = (component: IComponent) => {
  const Component = COMPONENT_MAP[component.type!];
  if (!Component) return null;

  return <Component {...((component.props as Record<string, unknown>) ?? {})} />;
};
