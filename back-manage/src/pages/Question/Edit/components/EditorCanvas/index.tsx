import DroppableComponentList from '@/components/DroppableComponentList';
import DraggableComponent from './DraggableComponent';
import useDropEnd from '@/hooks/useDropEnd';
import { useQuestionStore } from '@/store';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const EditorCanvas = () => {
  const dragDropEnd = useDropEnd();
  const { questionInfo } = useQuestionStore();
  const { px, py } = questionInfo.pageSetting || { px: 0, py: 0 };
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="flex-1 flex justify-center overflow-hidden">
      <div
        className="bg-white my-2 w-125 max-w-full h-11/12 overflow-y-auto overflow-x-hidden shadow-lg"
        style={{
          paddingInline: px,
          paddingBlock: py,
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={dragDropEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <div className="flex flex-col py-3">
            <DroppableComponentList
              renderComponent={component => {
                return <DraggableComponent component={component} key={component.id} />;
              }}
              hideComponent
            />
            <div style={{ marginBottom: '12px' }} />
          </div>
        </DndContext>
      </div>
    </div>
  );
};
export default EditorCanvas;
