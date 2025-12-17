import { DeleteOutlined, ReloadOutlined, StarOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table, Tag, type PaginationProps } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router';

const Trash = () => {
  const [data, setData] = useState([
    {
      id: '1',
      title: '问卷1',
      createdAt: '2023-10-01T10:00:00Z',
      answerCount: 5,
      isPublished: false,
      isStar: true,
    },
    {
      id: '2',
      title: '问卷2',
      createdAt: '2023-10-01T10:00:00Z',
      answerCount: 51,
      isPublished: true,
      isStar: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState<
    Pick<PaginationProps, 'current' | 'pageSize' | 'total'>
  >({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRestore = () => {
    if (!selectedRowKeys.length) {
      message.error('请选择要恢复的问卷');
      return;
    }
  };
  const handlePermanentlyDelete = () => {};

  return (
    <>
      <div className="flex gap-6 my-6">
        <Button type="primary" icon={<ReloadOutlined />} onClick={handleRestore}>
          恢复
        </Button>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            if (!selectedRowKeys.length) {
              message.error('请选择要彻底删除的问卷');
              return;
            }
            Modal.confirm({
              title: '确定彻底删除吗？',
              onOk: handlePermanentlyDelete,
            });
          }}
        >
          彻底删除
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        pagination={{
          ...paginationInfo,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPaginationInfo({
              current: page,
              pageSize: pageSize,
            });
          },
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys),
          columnWidth: 50,
        }}
        scroll={{
          y: 1050,
        }}
        columns={[
          {
            title: '问卷标题',
            dataIndex: 'title',
            width: '40%',
            render: (text, record) => {
              const { id, isStar, isPublished } = record;
              return (
                <div className="flex gap-2">
                  {isStar && <StarOutlined className="text-red-500!" />}
                  <Link to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}>
                    {text}
                  </Link>
                </div>
              );
            },
          },
          {
            title: '是否发布',
            dataIndex: 'isPublished',
            width: '40%',
            render: text =>
              text ? (
                <Tag color={'processing'} variant="outlined">
                  已发布
                </Tag>
              ) : (
                <Tag color={'default'} variant="outlined">
                  未发布
                </Tag>
              ),
          },
          {
            title: '答卷数量',
            dataIndex: 'answerCount',
            width: '40%',
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: '40%',
            render: text => {
              return text ? dayjs(text).format('YYYY-MM-DD HH:mm') : '--';
            },
          },
        ]}
      />
    </>
  );
};

export default Trash;
