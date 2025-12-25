export type TQuestionInputProps = {
  title?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export type TQuestionTitleProps = {
  level?: 1 | 2 | 3 | 4 | 5;
  text?: string;
  align?: 'left' | 'center' | 'right';
};
