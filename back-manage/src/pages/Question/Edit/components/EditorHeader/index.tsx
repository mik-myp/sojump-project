import useLock from '@/hooks/useLock';
import useShow from '@/hooks/useShow';
import { useQuestionStore } from '@/store';
import generateId from '@/utils/generateId';
import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
  LockOutlined,
  RedoOutlined,
  SendOutlined,
  UndoOutlined,
  UnlockOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Flex, Tooltip, Typography } from 'antd';
import { useMemo } from 'react';
import useMove from '@/hooks/useMove';
import { useNavigate } from 'react-router';

const EditorHeader = ({
  onSave,
  onPublish,
  updateLoading,
}: {
  onSave: (autoSave: boolean) => void;
  onPublish: () => void;
  updateLoading: boolean;
}) => {
  const navigate = useNavigate();
  const {
    questionInfo,
    currentQuestionComponent,
    addQuestionComponent,
    removeQuestionComponent,
    undo,
    redo,
    past,
    future,
    saveQuestionInfo,
  } = useQuestionStore();
  const { componentList } = questionInfo;
  const { moveUp, moveDown } = useMove();
  const changeComponentLock = useLock();
  const changeComponentShow = useShow();

  const buttons = useMemo(
    () => [
      {
        title: '删除',
        disabled: !currentQuestionComponent.id || currentQuestionComponent.lock,
        icon: <DeleteOutlined />,
        onClick: () => removeQuestionComponent(currentQuestionComponent.id!),
      },
      {
        title: currentQuestionComponent.show ? '隐藏' : '显示',
        disabled: !currentQuestionComponent.id || currentQuestionComponent.lock,
        icon: currentQuestionComponent.show ? <EyeInvisibleOutlined /> : <EyeOutlined />,
        onClick: () => {
          changeComponentShow(currentQuestionComponent.id!);
        },
      },
      {
        title: currentQuestionComponent.lock ? '解锁' : '锁定',
        disabled: !currentQuestionComponent.id,
        icon: currentQuestionComponent.lock ? <UnlockOutlined /> : <LockOutlined />,
        onClick: () => changeComponentLock(currentQuestionComponent.id!),
      },
      {
        title: '复制',
        icon: <CopyOutlined />,
        disabled: !currentQuestionComponent.id,
        onClick: () => {
          addQuestionComponent({
            ...currentQuestionComponent,
            id: generateId(),
          });
        },
      },
      // {
      //   title: '不知道',
      //   disabled: !currentQuestionComponent.id,
      //   icon: <BlockOutlined />,
      //   onClick: () => {},
      // },
      {
        title: '向上移动',
        disabled: !currentQuestionComponent.id || currentQuestionComponent.lock,
        icon: <UpOutlined />,
        onClick: () => moveUp(currentQuestionComponent.id!),
      },
      {
        title: '向下移动',
        disabled: !currentQuestionComponent.id || currentQuestionComponent.lock,
        icon: <DownOutlined />,
        onClick: () => moveDown(currentQuestionComponent.id!),
      },
      {
        title: '撤销',
        icon: <UndoOutlined />,
        disabled: !(past && past.length > 0),
        onClick: () => undo(),
      },
      {
        title: '重做',
        icon: <RedoOutlined />,
        disabled: !(future && future.length > 0),
        onClick: () => redo(),
      },
    ],
    [
      currentQuestionComponent,
      changeComponentLock,
      changeComponentShow,
      addQuestionComponent,
      removeQuestionComponent,
      moveUp,
      moveDown,
      undo,
      redo,
      past,
      future,
    ],
  );

  return (
    <>
      <div className="w-100 flex items-center gap-2">
        <Button type="link" icon={<LeftOutlined />} onClick={() => navigate('/manage/list')}>
          返回
        </Button>
        <Typography.Text
          className="w-full cursor-default flex items-center gap-2 text-lg! font-bold mb-0! inset-auto!"
          editable={{
            onChange: value => {
              saveQuestionInfo({ title: value }, false);
            },
            autoSize: { minRows: 1, maxRows: 2 },
          }}
          ellipsis
        >
          {questionInfo?.title}
        </Typography.Text>
      </div>
      <Flex gap="small" className="flex-1" align="center" justify="center">
        {buttons.map(button => {
          return (
            <Tooltip title={button.title} key={button.title}>
              <Button
                shape="circle"
                icon={button.icon}
                onClick={button.onClick}
                disabled={button.disabled}
              />
            </Tooltip>
          );
        })}
      </Flex>
      <div className="w-100 flex items-center gap-2 justify-end">
        <Button
          icon={<CheckOutlined />}
          onClick={() => onSave(false)}
          loading={updateLoading}
          disabled={!componentList?.length}
        >
          保存
        </Button>
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={onPublish}
          loading={updateLoading}
          disabled={!componentList?.length}
        >
          发布
        </Button>
      </div>
    </>
  );
};
export default EditorHeader;
