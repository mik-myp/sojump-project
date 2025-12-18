import { Form, Input, Radio, Select } from 'antd';

const QuestionTitleSetting = () => {
  return (
    <>
      <Form.Item label="文案" name="text">
        <Input />
      </Form.Item>
      <Form.Item label="级别" name="level">
        <Select
          options={[
            {
              label: 1,
              value: 1,
            },
            {
              label: 2,
              value: 2,
            },
            {
              label: 3,
              value: 3,
            },
            {
              label: 4,
              value: 4,
            },
            {
              label: 5,
              value: 5,
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="对齐方式" name="align">
        <Radio.Group
          options={[
            {
              label: '左对齐',
              value: 'left',
            },
            {
              label: '居中',
              value: 'center',
            },
            {
              label: '右对齐',
              value: 'right',
            },
          ]}
        />
      </Form.Item>
    </>
  );
};
export default QuestionTitleSetting;
