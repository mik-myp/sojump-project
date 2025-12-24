import type { TQuestionInputProps, TQuestionTitleProps } from './interface';

export const defaultInputProps: TQuestionInputProps = {
  title: '输入框标题',
  placeholder: '请输入...',
};

export const defaultTitleProps: TQuestionTitleProps = {
  level: 1,
  text: '一行标题',
  align: 'left',
};
