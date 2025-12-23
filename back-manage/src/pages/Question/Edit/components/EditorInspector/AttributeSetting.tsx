import { QuestionInputSetting, QuestionTitleSetting } from '@/components/QuestionComponents';
import { useQuestionStore } from '@/store';
import { Form, type FormProps } from 'antd';
import { useEffect } from 'react';

const AttributeSetting = () => {
  const { currentQuestionComponent, saveCurrentQuestionComponent } = useQuestionStore();
  const [form] = Form.useForm();

  const { type, props, lock } = currentQuestionComponent || {};

  const disabled = lock || !currentQuestionComponent?.id;

  const handleValuesChange: FormProps['onValuesChange'] = (_changedFields, allFields) => {
    saveCurrentQuestionComponent({
      ...currentQuestionComponent,
      props: allFields,
    });
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ ...props });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionComponent?.id]);

  const renderSetting = () => {
    switch (type) {
      case 'questionTitle':
        return <QuestionTitleSetting />;
      case 'questionInput':
        return <QuestionInputSetting />;
      default:
        return null;
    }
  };

  return (
    <Form form={form} onValuesChange={handleValuesChange} layout="vertical" disabled={disabled}>
      {renderSetting()}
    </Form>
  );
};
export default AttributeSetting;
