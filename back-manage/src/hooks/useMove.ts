import type { IComponent } from '@/service/interface';
import { useQuestionStore } from '@/store';

const reorder = (list: IComponent[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useMove = () => {
  const { questionInfo, saveQuestionInfo, currentQuestionComponent, saveCurrentQuestionComponent } =
    useQuestionStore();

  const { componentList = [] } = questionInfo || {};

  const move = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return;
    const ordered = reorder(componentList, sourceIndex, destinationIndex);
    saveQuestionInfo({ componentList: ordered });
    if (currentQuestionComponent?.id) {
      const latestCurrent = ordered.find(item => item.id === currentQuestionComponent.id);
      if (latestCurrent) saveCurrentQuestionComponent(latestCurrent, false);
    }
  };

  const moveUp = (componentId: string) => {
    const index = componentList.findIndex(item => item.id === componentId);
    if (index <= 0) return;
    move(index, index - 1);
  };

  const moveDown = (componentId: string) => {
    const index = componentList.findIndex(item => item.id === componentId);
    if (index === -1 || index >= componentList.length - 1) return;
    move(index, index + 1);
  };

  return { move, moveUp, moveDown };
};

export default useMove;
