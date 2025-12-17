import React from 'react';
import { Button, Result } from 'antd';

const Page403: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="对不起，您没有访问此页面的权限。"
    extra={<Button type="primary">返回首页</Button>}
  />
);

export default Page403;
