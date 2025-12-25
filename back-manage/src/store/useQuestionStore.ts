import type { IAnswer } from './../service/interface';
import type { IComponent, IQuestion } from '@/service/interface';
import { create } from 'zustand';

export type TAnswerList = Omit<IAnswer, 'answers'> & {
  [key: string]: unknown;
};

export type TQuestionStore = {
  questionInfo: IQuestion;
  currentQuestionComponent: IComponent;
  saveQuestionInfo: (question: Partial<IQuestion>, recordHistory?: boolean) => void;
  initQuestionInfo: (question: Partial<IQuestion>) => void;
  saveCurrentQuestionComponent: (component: IComponent, recordHistory?: boolean) => void;
  addQuestionComponent: (component: IComponent) => void;
  removeQuestionComponent: (id: string) => void;
  clearCurrentQuestionComponent: () => void;
  past: IQuestion[];
  future: IQuestion[];
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  answerList: TAnswerList[];
  saveAnswerList: (answerList: TAnswerList[]) => void;
};

const questionInfo: IQuestion = {
  _id: '',
};

const useQuestionStore = create<TQuestionStore>(set => ({
  questionInfo,
  currentQuestionComponent: {},
  past: [],
  future: [],
  answerList: [],
  saveAnswerList: (answerList: TAnswerList[]) =>
    set(() => {
      return {
        answerList,
      };
    }),
  saveQuestionInfo: (question, recordHistory = true) =>
    set(state => {
      const prev = state.questionInfo;
      const next = { ...state.questionInfo, ...question };
      if (recordHistory) {
        return { questionInfo: next, past: [...(state.past || []), prev], future: [] };
      }
      return { questionInfo: next };
    }),
  initQuestionInfo: question =>
    set(state => ({
      questionInfo: { ...state.questionInfo, ...question },
    })),
  clearCurrentQuestionComponent: () =>
    set({
      currentQuestionComponent: {},
    }),
  saveCurrentQuestionComponent: (component, recordHistory = false) => {
    return set(state => {
      const prev = state.questionInfo;
      const nextQuestionInfo = {
        ...state.questionInfo,
        componentList: state.questionInfo.componentList?.map(item =>
          item.id === component.id ? component : item,
        ),
      };
      if (recordHistory) {
        return {
          currentQuestionComponent: component,
          questionInfo: nextQuestionInfo,
          past: [...(state.past || []), prev],
          future: [],
        };
      }
      return {
        currentQuestionComponent: component,
        questionInfo: nextQuestionInfo,
      };
    });
  },
  addQuestionComponent: component =>
    set(state => {
      const prev = state.questionInfo;
      const next = {
        ...state.questionInfo,
        componentList: [...(state.questionInfo.componentList || []), component],
      };
      return { questionInfo: next, past: [...(state.past || []), prev], future: [] };
    }),
  removeQuestionComponent: id =>
    set(state => {
      const prev = state.questionInfo;
      const next = {
        ...state.questionInfo,
        componentList: state.questionInfo.componentList?.filter(item => item.id !== id),
      } as IQuestion;
      return {
        questionInfo: next,
        currentQuestionComponent:
          state.currentQuestionComponent.id === id ? {} : state.currentQuestionComponent,
        past: [...(state.past || []), prev],
        future: [],
      };
    }),
  undo: () =>
    set(state => {
      const past = state.past || [];
      if (past.length === 0) return {};
      const prev = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      const future = [...(state.future || []), state.questionInfo];
      const newCurrent =
        prev.componentList?.find(item => item.id === state.currentQuestionComponent?.id) || {};
      return { questionInfo: prev, past: newPast, future, currentQuestionComponent: newCurrent };
    }),
  redo: () =>
    set(state => {
      const future = state.future || [];
      if (future.length === 0) return {};
      const next = future[future.length - 1];
      const newFuture = future.slice(0, future.length - 1);
      const past = [...(state.past || []), state.questionInfo];
      const newCurrent =
        next.componentList?.find(item => item.id === state.currentQuestionComponent?.id) || {};
      return { questionInfo: next, past, future: newFuture, currentQuestionComponent: newCurrent };
    }),
  clearHistory: () =>
    set(() => ({
      past: [],
      future: [],
    })),
}));

export default useQuestionStore;
