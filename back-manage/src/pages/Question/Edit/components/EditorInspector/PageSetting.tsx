import { useQuestionStore } from '@/store';
import { Form, InputNumber, type FormProps } from 'antd';

const PageSetting = () => {
  const [form] = Form.useForm();
  const { saveQuestionInfo, questionInfo } = useQuestionStore();

  const handleValuesChange: FormProps['onValuesChange'] = (_changedFields, allFields) => {
    saveQuestionInfo({ ...questionInfo, pageSetting: allFields });
  };

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      initialValues={questionInfo.pageSetting || { px: 0, py: 0 }}
    >
      <Form.Item label="上下内边距" name="px">
        <InputNumber style={{ width: '100%' }} suffix="px" />
      </Form.Item>
      <Form.Item label="左右内边距" name="py">
        <InputNumber style={{ width: '100%' }} suffix="px" />
      </Form.Item>
    </Form>
  );
};
export default PageSetting;
