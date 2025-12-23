import type { DropResult } from 'react-beautiful-dnd';
import useMove from './useMove';

const useDropEnd = () => {
  const { move } = useMove();

  const dragDropEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    move(result.source.index, result.destination.index);
  };

  return dragDropEnd;
};

export default useDropEnd;
