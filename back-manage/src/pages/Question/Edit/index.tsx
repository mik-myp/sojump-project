import { useParams } from 'react-router';
import { Layout, Spin, theme } from 'antd';
import { useRequest } from 'ahooks';
import { getQuestion } from '@/service';
import { useQuestionStore } from '@/store';
import EditorHeader from './components/EditorHeader';
import EditorSidebar from './components/EditorSidebar';
import EditorCanvas from './components/EditorCanvas';
import EditorInspector from './components/EditorInspector';
const { Header, Content } = Layout;
const Edit = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { questionInfo, saveQuestionInfo } = useQuestionStore();

  const { id } = useParams();

  const { loading } = useRequest(getQuestion, {
    defaultParams: [
      {
        id: id!,
      },
    ],
    onSuccess: res => {
      saveQuestionInfo({
        ...res,
        componentList: [
          {
            id: '1',
            type: 'questionTitle',
            props: {
              text: '信息收集',
              level: 1,
              align: 'left',
            },
          },
          {
            id: '2',
            type: 'questionInput',
            props: {
              title: '姓名',
              placeholder: '请输入姓名',
            },
          },
          {
            id: '3',
            type: 'questionTitle',
            props: {
              text: '信息收集',
              level: 1,
              align: 'left',
            },
          },
        ],
      });
    },
  });

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <Layout className="h-full">
        <Header style={{ background: colorBgContainer }} className="flex items-center p-4!">
          <EditorHeader />
        </Header>
        <Content className="h-full flex p-4">
          <EditorSidebar />
          <EditorCanvas />
          <EditorInspector />
        </Content>
      </Layout>
    </>
  );
};

export default Edit;
