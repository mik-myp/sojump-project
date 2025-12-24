import { getQuestion } from '@/service';
import { useQuestionStore } from '@/store';
import { useRequest } from 'ahooks';
import { Outlet, useParams } from 'react-router';

const Question = () => {
  const { id } = useParams();
  const { initQuestionInfo } = useQuestionStore();

  const { loading, refresh } = useRequest(getQuestion, {
    defaultParams: [
      {
        id: id!,
      },
    ],
    onSuccess: res => {
      initQuestionInfo(res);
    },
  });

  return (
    <div className="h-screen">
      <Outlet context={{ id, loading, refresh }} />
    </div>
  );
};
export default Question;
