import { Typography } from 'antd';
import classNames from 'classnames';
import type { TQuestionTitleProps } from '../interface';
import { defaultTitleProps } from '../constants';

const QuestionTitle = (props: TQuestionTitleProps) => {
  const { level = 1, text = '一行标题', align = 'left' } = { ...defaultTitleProps, ...props };

  return (
    <Typography.Title
      level={level}
      className={classNames('mb-0! select-none', {
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
