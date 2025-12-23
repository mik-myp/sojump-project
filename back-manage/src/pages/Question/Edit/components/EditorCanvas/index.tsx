import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DroppableComponentList from '@/components/DroppableComponentList';
import DraggableComponent from './DraggableComponent';
import useDropEnd from '@/hooks/useDropEnd';
import { useQuestionStore } from '@/store';

const EditorCanvas = () => {
  const dragDropEnd = useDropEnd();
  const { questionInfo } = useQuestionStore();
  const { px, py } = questionInfo.pageSetting || { px: 0, py: 0 };

  return (
    <div className="flex-1 flex justify-center overflow-hidden">
      <div
        className="bg-white my-2 w-125 max-w-full h-11/12 overflow-y-auto overflow-x-hidden shadow-lg"
        style={{
          paddingInline: px,
          paddingBlock: py,
        }}
      >
        <DragDropContext onDragEnd={dragDropEnd}>
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
                <DroppableComponentList
                  renderComponent={(component, index) => {
                    return (
                      <DraggableComponent component={component} index={index} key={component.id} />
                    );
                  }}
                  hideComponent
                />
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
