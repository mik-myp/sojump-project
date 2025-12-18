import { useQuestionStore } from '@/store';
import {
  BlockOutlined,
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  LeftOutlined,
  LockOutlined,
  RedoOutlined,
  SendOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import { useNavigate } from 'react-router';

const EditorHeader = () => {
  const navigate = useNavigate();
  const { questionInfo } = useQuestionStore();

  const buttons = [
    {
      title: '删除',
      icon: <DeleteOutlined />,
      onClick: () => {},
    },
    {
      title: '隐藏',
      icon: <EyeInvisibleOutlined />,
      onClick: () => {},
    },
    {
      title: '锁定',
      icon: <LockOutlined />,
      onClick: () => {},
    },
    {
      title: '复制',
      icon: <CopyOutlined />,
      onClick: () => {},
    },
    {
      title: '不知道',
      icon: <BlockOutlined />,
      onClick: () => {},
    },
    {
      title: '向上移动',
      icon: <UpOutlined />,
      onClick: () => {},
    },
    {
      title: '向下移动',
      icon: <DownOutlined />,
      onClick: () => {},
    },
    {
      title: '撤销',
      icon: <UndoOutlined />,
      onClick: () => {},
    },
    {
      title: '重做',
      icon: <RedoOutlined />,
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="w-100 flex items-center gap-2">
        <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
        <div className="cursor-pointer flex items-center gap-2 text-lg font-bold">
          <span>{questionInfo?.title}</span>
          <EditOutlined />
        </div>
      </div>
      <Flex gap="small" className="flex-1" align="center" justify="center">
        {buttons.map(button => {
          return (
            <Tooltip title={button.title} key={button.title}>
              <Button shape="circle" icon={button.icon} onClick={button.onClick} />
            </Tooltip>
          );
        })}
      </Flex>
      <div className="w-100 flex items-center gap-2 justify-end">
        <Button icon={<CheckOutlined />}>保存</Button>
        <Button type="primary" icon={<SendOutlined />}>
          发布
        </Button>
      </div>
    </>
  );
};
export default EditorHeader;
