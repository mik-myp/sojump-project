import type { IComponent, TComponentType } from '@/types/question';
import { defaultInputProps, defaultTitleProps } from './constants';
import type { TQuestionInputProps, TQuestionTitleProps } from './interface';
import QuestionInput from './QuestionInput';
import QuestionTitle from './QuestionTitle';

export { defaultInputProps, defaultTitleProps, QuestionInput, QuestionTitle };
export type { TQuestionInputProps, TQuestionTitleProps };

export type RenderComponentOptions = {
  value?: string;
  onChange?: (value: string) => void;
};

export const COMPONENT_MAP: Record<TComponentType, React.ComponentType<Record<string, unknown>>> = {
  questionTitle: QuestionTitle,
  questionInput: QuestionInput,
};

export const renderComponent = (component: IComponent, options?: RenderComponentOptions) => {
  const Component = component.type ? COMPONENT_MAP[component.type] : null;
  if (!Component) return null;

  const props = component.props ?? {};
  if (component.type === 'questionInput') {
    const mergedProps: TQuestionInputProps = {
      ...defaultInputProps,
      ...(props as TQuestionInputProps),
      value: options?.value,
      onChange: options?.onChange,
    };
    return <Component {...mergedProps} />;
  }

  if (component.type === 'questionTitle') {
    const mergedProps: TQuestionTitleProps = {
      ...defaultTitleProps,
      ...(props as TQuestionTitleProps),
    };
    return <Component {...mergedProps} />;
  }

  return <Component {...(props as Record<string, unknown>)} />;
};
