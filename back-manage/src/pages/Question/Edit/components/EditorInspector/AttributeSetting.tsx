import QuestionInputSetting from '@/components/QuestionComponents/QuestionInput/Setting';
import QuestionTitleSetting from '@/components/QuestionComponents/QuestionTitle/Setting';
import { useQuestionStore } from '@/store';
import { Form } from 'antd';
import { useEffect } from 'react';

const AttributeSetting = () => {
  const { currentQuestionComponent, saveCurrentQuestionComponent } = useQuestionStore();
  const [form] = Form.useForm();

  const { type, props } = currentQuestionComponent || {};

  const handleValuesChange = (_changedFields: any, allFields: any) => {
    saveCurrentQuestionComponent({
      ...currentQuestionComponent,
      props: allFields,
    });
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ ...props });
  }, [currentQuestionComponent]);

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
    <Form form={form} onValuesChange={handleValuesChange} layout="vertical">
      {renderSetting()}
    </Form>
  );
};
export default AttributeSetting;
