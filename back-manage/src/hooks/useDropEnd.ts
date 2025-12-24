import type { DragEndEvent } from '@dnd-kit/core';
import useMove from './useMove';
import { useQuestionStore } from '@/store';

const useDropEnd = () => {
  const { move } = useMove();
  const { questionInfo } = useQuestionStore();
  const componentList = questionInfo?.componentList || [];

  const dragDropEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !active?.id) return;
    const sourceIndex = componentList.findIndex(item => item.id === active.id);
    const destinationIndex = componentList.findIndex(item => item.id === over.id);
    if (sourceIndex === -1 || destinationIndex === -1) return;
    if (sourceIndex === destinationIndex) return;
    move(sourceIndex, destinationIndex);
  };

  return dragDropEnd;
};

export default useDropEnd;
