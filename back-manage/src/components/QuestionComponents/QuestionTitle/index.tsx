import { Typography } from 'antd';
import classNames from 'classnames';

export type TQuestionTitleProps = {
  level?: 1 | 2 | 3 | 4 | 5;
  text?: string;
  align?: 'left' | 'center' | 'right';
};

export const defaultTitleProps: TQuestionTitleProps = {
  level: 1,
  text: '一行标题',
  align: 'left',
};

const QuestionTitle = (props: TQuestionTitleProps) => {
  const { level = 1, text = '一行标题', align = 'left' } = { ...defaultTitleProps, ...props };

  return (
    <Typography.Title
      level={level}
      className={classNames('mb-0!', {
        ['text-left']: align === 'left',
        ['text-center']: align === 'center',
        ['text-right']: align === 'right',
      })}
    >
      {text}
    </Typography.Title>
  );
};
export default QuestionTitle;
