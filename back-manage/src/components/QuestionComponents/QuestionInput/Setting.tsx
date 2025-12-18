import { Form, Input } from 'antd';

const QuestionInputSetting = () => {
  return (
    <>
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="占位符" name="placeholder">
        <Input />
      </Form.Item>
    </>
  );
};
export default QuestionInputSetting;
