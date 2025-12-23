import { useQuestionStore } from '@/store';

const useLock = () => {
  const { questionInfo, saveQuestionInfo, currentQuestionComponent, saveCurrentQuestionComponent } =
    useQuestionStore();
  const handleChangeComponentLock = (componentId: string) => {
    const updatedComponents = questionInfo.componentList?.map(component => {
      if (component.id === componentId) {
        const updated = { ...component, lock: !component.lock };
        // 如果当前选中的是被修改的组件，同时更新 currentQuestionComponent
        if (currentQuestionComponent?.id === componentId) {
          saveCurrentQuestionComponent(updated);
        }
        return updated;
      }
      return component;
    });
    saveQuestionInfo({ componentList: updatedComponents });
  };
  return handleChangeComponentLock;
};
export default useLock;
