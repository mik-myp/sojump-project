import { getQuestions, removeQuestions, restoreQuestions } from '@/service';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAntdTable, useRequest } from 'ahooks';
import { Button, message, Modal, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const Trash = () => {
  const { tableProps, refresh } = useAntdTable(getQuestions, {
    defaultParams: [
      {
        isDeleted: true,
        current: 1,
        pageSize: 10,
      },
    ],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { loading: restoreLoading, run: restoreRun } = useRequest(restoreQuestions, {
    manual: true,
    onSuccess: () => {
      message.success('恢复成功');
      setSelectedRowKeys([]);
      refresh();
    },
  });

  const { loading: removeLoading, run: removeRun } = useRequest(removeQuestions, {
    manual: true,
    onSuccess: () => {
      message.success('彻底删除成功');
      setSelectedRowKeys([]);
      refresh();
    },
  });

  const handleRestore = () => {
    if (!selectedRowKeys.length) {
      message.error('请选择要恢复的问卷');
      return;
    }
    restoreRun(selectedRowKeys as string[]);
  };
  const handlePermanentlyDelete = () => {
    removeRun(selectedRowKeys as string[]);
  };

  return (
    <>
      <div className="flex gap-6 my-6">
        <Button
          type="primary"
          loading={restoreLoading}
          icon={<ReloadOutlined />}
          onClick={handleRestore}
        >
          恢复
        </Button>
        <Button
          type="primary"
          danger
          loading={removeLoading}
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
        rowKey="_id"
        {...tableProps}
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
