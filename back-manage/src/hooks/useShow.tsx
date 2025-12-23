import { useQuestionStore } from '@/store';

const useShow = () => {
  const {
    questionInfo,
    saveQuestionInfo,
    currentQuestionComponent,
    saveCurrentQuestionComponent,
    clearCurrentQuestionComponent,
  } = useQuestionStore();
  const handleChangeComponentShow = (componentId: string) => {
    const updatedComponents = questionInfo.componentList?.map(component => {
      if (component.id === componentId) {
        const updated = { ...component, show: !component.show };
        if (currentQuestionComponent?.id === componentId) {
          saveCurrentQuestionComponent(updated);
          if (!updated.show) {
            clearCurrentQuestionComponent();
          }
        }
        return updated;
      }
      return component;
    });
    saveQuestionInfo({ componentList: updatedComponents });
  };
  return handleChangeComponentShow;
};
export default useShow;
