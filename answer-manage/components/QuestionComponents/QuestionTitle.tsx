import { Typography } from 'antd';
import type { TQuestionTitleProps } from './interface';
import { defaultTitleProps } from './constants';

const QuestionTitle = (props: TQuestionTitleProps) => {
  const { level = 1, text = '一级标题', align = 'left' } = { ...defaultTitleProps, ...props };

  return (
    <Typography.Title level={level} style={{ textAlign: align, marginBottom: 0 }}>
      {text}
    </Typography.Title>
  );
};

export default QuestionTitle;
