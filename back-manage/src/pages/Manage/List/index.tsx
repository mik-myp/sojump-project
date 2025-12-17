import Questionnaire from '@/components/Questionnaire';
import { useInfiniteScroll, useRequest } from 'ahooks';
import { Button, Spin, Divider, Skeleton, Empty } from 'antd';
import { useRef } from 'react';
import { addQuestion, getQuestions } from '@/service';
import { useNavigate } from 'react-router';
import type { IQuestion, TQuestionsInfiniteData } from '@/service/interface';

const PAGE_SIZE = 10;
const List = () => {
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  const { data, loading, loadingMore, noMore, reload, mutate } =
    useInfiniteScroll<TQuestionsInfiniteData>(
      lastData => {
        const nextPage = (lastData?.page ?? 0) + 1;
        return getQuestions({ page: nextPage, pageSize: PAGE_SIZE, isDeleted: false }).then(
          res => ({
            ...res,
            page: nextPage,
          }),
        );
      },
      {
        target: ref,
        isNoMore: d => (d?.list?.length ?? 0) >= (d?.total ?? 0),
      },
    );

  const list = data?.list ?? [];

  const { loading: addLoading, run: handleAdd } = useRequest(addQuestion, {
    manual: true,
    onSuccess: res => {
      const { id } = res;
      if (id) navigate(`/question/edit/${id}`);
    },
  });

  return (
    <div className="flex flex-col gap-4 m-4 ">
      <div className="flex justify-end">
        <Button type="primary" onClick={handleAdd} loading={addLoading}>
          新建问卷
        </Button>
      </div>

      <div
        style={{
          scrollbarWidth: 'none',
        }}
        className="h-250 overflow-auto"
        ref={ref}
      >
        <Spin spinning={loading}>
          {list.length === 0 ? (
            <div className="flex items-center justify-center h-full w-full">
              <Empty />
            </div>
          ) : (
            <div className="flex flex-col gap-4 pb-2.5">
              {list.map(item => (
                <Questionnaire
                  key={item._id}
                  _id={item._id}
                  title={item.title ?? ''}
                  createdAt={item.createdAt ?? ''}
                  answerCount={item.answerCount ?? 0}
                  isPublished={Boolean(item.isPublished)}
                  isStar={Boolean(item.isStar)}
                  onRefresh={reload}
                />
              ))}
            </div>
          )}
          {!noMore && loadingMore && <Skeleton paragraph={{ rows: 1 }} active />}
          {noMore && list.length > 0 && <Divider plain>没有更多了</Divider>}{' '}
        </Spin>
      </div>
    </div>
  );
};

export default List;
