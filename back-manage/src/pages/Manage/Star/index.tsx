import Questionnaire from "@/components/Questionnaire";
import { Empty, Pagination, Spin, type PaginationProps } from "antd";
import { useEffect, useState } from "react";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    // {
    //   id: "1",
    //   title: "问卷1",
    //   createdAt: "2023-10-01T10:00:00Z",
    //   answerCount: 5,
    //   isPublished: false,
    //   isStar: true,
    // },
    // {
    //   id: "2",
    //   title: "问卷2",
    //   createdAt: "2023-10-01T10:00:00Z",
    //   answerCount: 51,
    //   isPublished: true,
    //   isStar: false,
    // },
  ]);
  const [paginationInfo, setPaginationInfo] = useState<
    Pick<PaginationProps, "current" | "pageSize" | "total">
  >({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    console.log(paginationInfo);
  }, [paginationInfo]);

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col gap-8 m-4">
        {data.length > 0 ? (
          <>
            <div
              className="flex flex-col gap-4 pb-2.5 max-h-260 overflow-auto"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {data.map((item) => {
                return <Questionnaire {...item} />;
              })}
            </div>
            <Pagination
              align="center"
              showSizeChanger
              showQuickJumper
              showTitle
              showTotal={(total) => `总计 ${total} 条数据`}
              {...paginationInfo}
              onChange={(page, pageSize) => {
                setPaginationInfo({
                  current: page,
                  pageSize: pageSize,
                });
              }}
            />
          </>
        ) : (
          <div className="flex items-center justify-center mt-50 h-full w-full">
            <Empty />
          </div>
        )}
      </div>
    </Spin>
  );
};

export default List;
