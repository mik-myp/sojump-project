"use client";

import { Button, Result } from "antd";
import Link from "next/link";

export default function AnswerSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <Result
        status="success"
        title="提交成功"
        subTitle="感谢您的填写，您的答案已成功提交。"
        extra={[
          <Link href="/" key="home" className="w-full">
            <Button type="primary" block>
              返回首页
            </Button>
          </Link>,
        ]}
      />
    </main>
  );
}
