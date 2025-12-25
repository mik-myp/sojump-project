import { Input } from 'antd';
import type { TQuestionInputProps } from './interface';
import { defaultInputProps } from './constants';

const QuestionInput = (props: TQuestionInputProps) => {
  const { title = '输入框标题', placeholder = '请输入...', value, onChange } = {
    ...defaultInputProps,
    ...props,
  };

  return (
    <div className="mb-2">
      <div className="mb-2 text-base font-bold">{title}</div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={event => onChange?.(event.target.value)}
      />
    </div>
  );
};

export default QuestionInput;
