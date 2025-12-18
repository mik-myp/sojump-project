import React from 'react';
import { Outlet } from 'react-router';
import { getUserInfo } from '@/service';
import { useUserStore } from '@/store';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';

const App: React.FC = () => {
  const { saveUserInfo } = useUserStore();

  const { loading } = useRequest(getUserInfo, {
    onSuccess: res => {
      saveUserInfo(res);
    },
  });

  return (
    <>
      <Spin spinning={loading} fullscreen></Spin>
      <Outlet />
    </>
  );
};

export default App;
