import { Input } from 'antd';

export type TQuestionInputProps = {
  title?: string;
  placeholder?: string;
};

export const defaultInputProps = {
  title: '输入框标题',
  placeholder: '请输入...',
};

const QuestionInput = (props: TQuestionInputProps) => {
  const { title = '输入框标题', placeholder = '请输入...' } = { ...defaultInputProps, ...props };

  return (
    <div className="mb-2">
      <div className="mb-2 text-base font-bold">{title}</div>
      <Input placeholder={placeholder} />
    </div>
  );
};
export default QuestionInput;
