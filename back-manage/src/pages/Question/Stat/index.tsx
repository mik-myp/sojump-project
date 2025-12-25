import { Layout, Spin, theme } from 'antd';
import StatHeader from './components/StatHeader';
import StatQuestion from './components/StatQuestion';
import StatTable from './components/StatTable';
import StatEcharts from './components/StatEcharts';
import { useOutletContext } from 'react-router';

const { Header, Content } = Layout;

const Stat = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id, loading, refresh } = useOutletContext<{
    id: string;
    loading: boolean;
    refresh: () => void;
  }>();

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <Layout className="h-full">
        <Header style={{ background: colorBgContainer }} className="flex items-center p-4!">
          <StatHeader />
        </Header>
        <Content className="h-full flex p-4">
          <StatQuestion />
          <StatTable />
          <StatEcharts />
        </Content>
      </Layout>
    </>
  );
};

export default Stat;
