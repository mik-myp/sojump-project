import type { IComponent, IQuestion } from '@/service/interface';
import { create } from 'zustand';

const questionInfo: IQuestion = {
  _id: '',
};

const useQuestionStore = create<{
  questionInfo: IQuestion;
  currentQuestionComponent: IComponent;
  saveQuestionInfo: (question: Partial<IQuestion>) => void;
  clearQuestionInfo: () => void;
  saveCurrentQuestionComponent: (component: IComponent) => void;
  addQuestionComponent: (component: IComponent) => void;
}>(set => ({
  questionInfo,
  currentQuestionComponent: {},
  saveQuestionInfo: question =>
    set(state => ({ questionInfo: { ...state.questionInfo, ...question } })),
  clearQuestionInfo: () =>
    set({
      questionInfo,
    }),
  saveCurrentQuestionComponent: component => {
    return set(state => ({
      currentQuestionComponent: component,
      questionInfo: {
        ...state.questionInfo,
        componentList: state.questionInfo.componentList?.map(item =>
          item.id === component.id ? component : item,
        ),
      },
    }));
  },
  addQuestionComponent: component =>
    set(state => ({
      questionInfo: {
        ...state.questionInfo,
        componentList: [...(state.questionInfo.componentList || []), component],
      },
    })),
}));

export default useQuestionStore;
