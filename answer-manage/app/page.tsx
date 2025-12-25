"use client";

import { Space } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <Space
        orientation="vertical"
        align="center"
        size="large"
        className="w-full max-w-md"
      >
        <Title level={2} className="mb-0">
          欢迎来到问卷填写
        </Title>
        <Paragraph className="text-center text-base text-zinc-600">
          请输入正确的问卷链接（/answer/问卷ID）进行填写。如果没有链接，请联系问卷发布方获取。
        </Paragraph>
      </Space>
    </div>
  );
}
