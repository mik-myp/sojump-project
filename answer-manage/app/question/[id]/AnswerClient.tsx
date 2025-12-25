"use client";

import { useMemo, useState } from "react";
import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { renderComponent } from "@/components/QuestionComponents";
import type { IComponent, IQuestionnaire } from "@/types/question";
import FormItem from "antd/es/form/FormItem";
import Text from "antd/es/typography/Text";

type Props = {
  questionnaire: IQuestionnaire;
  serviceBaseUrl: string;
};

const pickComponentKey = (component: IComponent, index: number) =>
  component.id ||
  component.title ||
  `${component.type ?? "component"}-${index}`;

const AnswerClient = ({ questionnaire, serviceBaseUrl }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();

  const componentList = useMemo(
    () => questionnaire.componentList ?? [],
    [questionnaire.componentList]
  );

  const handleSubmit = async (values: Record<string, unknown>) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${serviceBaseUrl}/answer/${questionnaire._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: values }),
      });
      const data = await res.json();
      if (data?.code === 0) {
        msgApi.success("提交成功");
        form.resetFields();
        router.push("/question/success");
      } else {
        msgApi.error(data?.message || "提交失败");
      }
    } catch (error) {
      msgApi.error("提交失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col bg-white p-4">
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="flex flex-1 flex-col gap-4"
      >
        {componentList.length === 0 ? (
          <Text type="secondary">暂无组件</Text>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1">
            {componentList.map((component, index) => {
              const key = pickComponentKey(component, index);
              if (component.type === "questionInput") {
                return (
                  <FormItem key={key} name={key}>
                    {renderComponent(component)}
                  </FormItem>
                );
              }

              return <div key={key}>{renderComponent(component)}</div>;
            })}
          </div>
        )}
        <div className="sticky bottom-0 left-0 right-0 bg-white pt-3">
          <FormItem className="mb-0!">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={submitting}
              block
            >
              提交问卷
            </Button>
          </FormItem>
        </div>
      </Form>
    </div>
  );
};

export default AnswerClient;
