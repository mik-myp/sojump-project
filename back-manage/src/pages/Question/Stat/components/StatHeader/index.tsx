import { useQuestionStore } from '@/store';
import { CheckOutlined, CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Flex, message, Popover, QRCode, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const StatHeader = () => {
  const navigate = useNavigate();
  const { questionInfo } = useQuestionStore();
  const [isCopy, setIsCopy] = useState(false);

  const questionUrl = useMemo(
    () => `http://localhost:3000/question/${questionInfo?._id}`,
    [questionInfo?._id],
  );

  return (
    <>
      <div className="w-100 flex items-center gap-2">
        <Button type="link" icon={<LeftOutlined />} onClick={() => navigate('/manage/list')}>
          返回
        </Button>
        <Typography.Text
          className="w-full cursor-default flex items-center gap-2 text-lg! font-bold mb-0! inset-auto!"
          ellipsis
        >
          {questionInfo?.title}
        </Typography.Text>
      </div>
      <Flex gap="small" className="flex-1" align="center" justify="center">
        <Typography.Text
          className="mb-0! inset-auto! w-80! py-1 px-2 border rounded-md border-[#d9d9d9]"
          ellipsis
        >
          {questionUrl}
        </Typography.Text>
        <CopyToClipboard
          text={questionUrl}
          onCopy={() => {
            if (isCopy) return;
            message.success('复制成功');
            setIsCopy(true);
            setTimeout(() => {
              setIsCopy(false);
            }, 2000);
          }}
        >
          <Button icon={isCopy ? <CheckOutlined /> : <CopyOutlined />} />
        </CopyToClipboard>

        <Popover content={<QRCode value={questionUrl} bordered={false} />}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Flex>
      <div className="w-100 flex items-center gap-2 justify-end">
        <Button type="primary" onClick={() => navigate(`/question/edit/${questionInfo?._id}`)}>
          编辑问卷
        </Button>
      </div>
    </>
  );
};
export default StatHeader;
