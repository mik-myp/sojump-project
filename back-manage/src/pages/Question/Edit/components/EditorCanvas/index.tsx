import { useQuestionStore } from '@/store';
import type { IComponent } from '@/service/interface';
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';
import ComponentList from './ComponentList';

const reorder = (list: IComponent[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const EditorCanvas = () => {
  const { questionInfo, currentQuestionComponent, saveQuestionInfo, saveCurrentQuestionComponent } =
    useQuestionStore();

  const { componentList = [] } = questionInfo || {};

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const ordered = reorder(componentList, result.source.index, result.destination.index);

    saveQuestionInfo({
      componentList: ordered,
    });

    if (currentQuestionComponent?.id) {
      const latestCurrent = ordered.find(item => item.id === currentQuestionComponent.id);
      if (latestCurrent) {
        saveCurrentQuestionComponent(latestCurrent);
      }
    }
  }

  return (
    <div className="flex-1 flex justify-center overflow-hidden">
      <div className="bg-white my-2 px-2 w-125 max-w-full h-11/12 overflow-y-auto overflow-x-hidden shadow-lg">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="list"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
            direction="vertical"
          >
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col py-3"
              >
                <ComponentList />
                <div style={{ marginBottom: '12px' }}>{provided.placeholder}</div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
export default EditorCanvas;
