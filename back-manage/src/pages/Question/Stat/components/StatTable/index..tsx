import { getAnswers } from '@/service';
import { useQuestionStore } from '@/store';
import { useAntdTable } from 'ahooks';
import { Table } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useParams } from 'react-router';

const TITLE_MAP = {
  questionTitle: 'text',
  questionInput: 'title',
};

const StatTable = () => {
  const { questionInfo, currentQuestionComponent } = useQuestionStore();

  const { componentList } = questionInfo;

  const { id } = useParams();

  const { tableProps, refresh } = useAntdTable(getAnswers, {
    defaultParams: [
      {
        id: id!,
        current: 1,
        pageSize: 10,
      },
    ],
  });

  console.log('🚀 ~ index..tsx:31 ~ StatTable ~ tableProps:', tableProps);

  const columns = useMemo(() => {
    return componentList?.map(item => {
      return {
        title: (
          <div
            className={classNames({
              'text-blue-500': item.id === currentQuestionComponent.id,
            })}
          >
            {item.props![TITLE_MAP[item.type!]] as string}
          </div>
        ),
        dataIndex: item.id,
      };
    });
  }, [componentList, currentQuestionComponent.id]);

  return (
    <div className="flex-1 mx-4">
      <Table
        {...tableProps}
        rowKey="_id"
        columns={columns}
        scroll={{
          x: true,
          y: 500,
        }}
        dataSource={[]}
        size="middle"
      />
    </div>
  );
};
export default StatTable;
