import Questionnaire from '@/components/Questionnaire';
import { getQuestions } from '@/service';
import { usePagination } from 'ahooks';
import { Empty, Pagination, Spin } from 'antd';

const List = () => {
  const { data, loading, pagination, refresh } = usePagination(
    ({ current, ...rest }) =>
      getQuestions({
        ...rest,
        page: current,
      }),
    {
      defaultParams: [
        {
          isStar: true,
          current: 1,
          pageSize: 10,
        },
      ],
    },
  );

  const list = data?.list || [];
  return (
    <>
      <Spin spinning={loading} fullscreen />
      <div className="flex flex-col gap-8 m-4">
        {list.length > 0 ? (
          <>
            <div
              className="flex flex-col gap-4 pb-2.5 h-240 overflow-auto"
              style={{
                scrollbarWidth: 'none',
              }}
            >
              {list.map(item => {
                return <Questionnaire key={item._id} {...item} onRefresh={refresh} />;
              })}
            </div>
            <Pagination
              {...pagination}
              align="center"
              showSizeChanger
              showQuickJumper
              showTitle
              showTotal={total => `总计 ${total} 条数据`}
            />
          </>
        ) : (
          <div className="flex items-center justify-center mt-50 h-full w-full">
            <Empty />
          </div>
        )}
      </div>
    </>
  );
};

export default List;
