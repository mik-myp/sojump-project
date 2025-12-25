import Link from "next/link";
import AnswerClient from "./AnswerClient";
import type { IQuestionnaire } from "@/types/question";

export const revalidate = 0;

const SERVICE_BASE_URL =
  process.env.NEXT_PUBLIC_SERVICE_BASE_URL || "http://localhost:8888";

async function getQuestionnaire(id: string): Promise<IQuestionnaire | null> {
  try {
    const res = await fetch(`${SERVICE_BASE_URL}/questionNoAuth/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.code !== 0 || !data.data) return null;
    return data.data as IQuestionnaire;
  } catch {
    return null;
  }
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const questionnaire = await getQuestionnaire(id);

  if (!questionnaire) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-gray-900">
            问卷不存在或已下线
          </p>
          <p className="mt-2 text-sm text-gray-600">
            请确认链接是否正确，或联系问卷发布方。
          </p>
          <Link href="/" className="mt-6 block">
            <div className="w-full rounded-md bg-blue-500 px-4 py-3 text-center text-white">
              返回首页
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AnswerClient
      questionnaire={questionnaire}
      serviceBaseUrl={SERVICE_BASE_URL}
    />
  );
}
