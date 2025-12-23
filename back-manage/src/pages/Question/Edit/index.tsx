import { useParams } from 'react-router';
import { Layout, message, Spin, theme } from 'antd';
import { useInterval, useRequest } from 'ahooks';
import { getQuestion, updateQuestion } from '@/service';
import { useQuestionStore } from '@/store';
import EditorHeader from './components/EditorHeader';
import EditorSidebar from './components/EditorSidebar';
import EditorCanvas from './components/EditorCanvas';
import EditorInspector from './components/EditorInspector';
import { useCallback, useEffect } from 'react';
const { Header, Content } = Layout;
const Edit = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { questionInfo, initQuestionInfo, clearHistory, clearCurrentQuestionComponent } =
    useQuestionStore();

  const { id } = useParams();

  const { loading, refresh } = useRequest(getQuestion, {
    defaultParams: [
      {
        id: id!,
      },
    ],
    onSuccess: res => {
      initQuestionInfo(res);
    },
  });

  const { run: updateRun, loading: updateLoading } = useRequest(updateQuestion, {
    manual: true,
    onSuccess: (_, params) => {
      const [{ autoSave }] = params;
      if (autoSave) {
        message.success('正在自动保存...，无需操作');
        return;
      }
      refresh();
    },
  });

  const handleSave = (autoSave: boolean) => {
    const { componentList, title } = questionInfo || {};
    updateRun({
      id: id!,
      title,
      componentList,
      autoSave,
    });
  };

  const handlePublish = () => {
    const { componentList, title } = questionInfo || {};
    updateRun({
      id: id!,
      title,
      componentList,
      isPublished: true,
    });
  };

  const clearInterval = useInterval(() => handleSave(true), 30000, {
    immediate: false,
  });

  const clearQuestion = useCallback(() => {
    clearHistory();
    clearCurrentQuestionComponent();
  }, [clearHistory, clearCurrentQuestionComponent]);

  useEffect(() => {
    return () => {
      clearInterval();
      clearQuestion();
    };
  }, [clearInterval, clearQuestion]);

  return (
    <>
      <Spin spinning={loading || updateLoading} fullscreen />
      <Layout className="h-full">
        <Header style={{ background: colorBgContainer }} className="flex items-center p-4!">
          <EditorHeader
            onSave={handleSave}
            onPublish={handlePublish}
            updateLoading={updateLoading}
          />
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
