import { useNavigate, useOutletContext } from 'react-router';
import { Layout, message, Spin, theme } from 'antd';
import { useInterval, useRequest } from 'ahooks';
import { updateQuestion } from '@/service';
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
  const { questionInfo, clearHistory, clearCurrentQuestionComponent } = useQuestionStore();
  const navigate = useNavigate();

  const { id, loading, refresh } = useOutletContext<{
    id: string;
    loading: boolean;
    refresh: () => void;
  }>();

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
    navigate('/manage/list');
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
