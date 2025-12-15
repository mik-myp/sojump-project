import Questionnaire from "@/components/Questionnaire";
import { Button, Divider, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      id: "1",
      title: "问卷1",
      createdAt: "2023-10-01T10:00:00Z",
      answerCount: 5,
      isPublished: false,
      isStar: true,
    },
    {
      id: "2",
      title: "问卷2",
      createdAt: "2023-10-01T10:00:00Z",
      answerCount: 51,
      isPublished: true,
      isStar: false,
    },
  ]);
  const [page, setPage] = useState(1);

  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   fetch(
  //     `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`,
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const results = Array.isArray(res) ? res : [];
  //       setData([...data, ...results]);
  //       setLoading(false);
  //       setPage(page + 1);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex justify-end">
        <Button type="primary">新建问卷</Button>
      </div>

      <div
        id="scrollableDiv"
        style={{
          scrollbarWidth: "none",
        }}
        className="h-175 overflow-auto"
      >
        <InfiniteScroll
          dataLength={data.length}
          // next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>没有更多了 🤐</Divider>}
          scrollableTarget="scrollableDiv"
          className="flex flex-col gap-4 pb-2.5"
        >
          {data.map((item) => {
            return <Questionnaire {...item} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default List;
