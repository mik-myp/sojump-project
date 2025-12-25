import { getAnswers } from '@/service';
import { useQuestionStore } from '@/store';
import { useAntdTable, useRequest } from 'ahooks';
import { Table } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useParams } from 'react-router';

const TITLE_MAP = {
  questionTitle: 'text',
  questionInput: 'title',
};

const StatTable = () => {
  const { questionInfo, currentQuestionComponent, answerList, saveAnswerList } = useQuestionStore();

  const { componentList } = questionInfo;

  const { id } = useParams();

  const { loading } = useRequest(getAnswers, {
    defaultParams: [
      {
        id: id!,
      },
    ],
    onSuccess: res => {
      saveAnswerList(res.map(item => ({ ...item, ...(item.answers || {}) })));
    },
  });

  const columns = useMemo(() => {
    return componentList
      ?.filter(item => item.show)
      ?.map(item => {
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
          width: 200,
          render: (text: string) => {
            return text ?? '--';
          },
        };
      });
  }, [componentList, currentQuestionComponent.id]);

  return (
    <div className="overflow-x-auto flex-1 mx-4">
      <Table
        dataSource={answerList.concat(answerList)}
        loading={loading}
        rowKey="_id"
        columns={columns}
        pagination={false}
        scroll={{
          y: '85vh',
          x: 'max-content',
        }}
      />
    </div>
  );
};
export default StatTable;
