import type { IComponent } from '@/service/interface';
import { useQuestionStore } from '@/store';
import classNames from 'classnames';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { renderComponent } from '@/components/QuestionComponents';

const DraggableComponent = ({ component }: { component: IComponent }) => {
  const { currentQuestionComponent, saveCurrentQuestionComponent } = useQuestionStore();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: component.id!,
    disabled: component.lock,
  });
  const transformWithoutScale = transform
    ? { ...transform, scaleX: 1, scaleY: 1, scaleZ: 1 }
    : null;
  const style = {
    transform: CSS.Transform.toString(transformWithoutScale),
    transition,
  };
  const handleSelect = () => {
    saveCurrentQuestionComponent(component);
  };
  const { onPointerDown, ...restListeners } = listeners || {};
  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = event => {
    onPointerDown?.(event);
    if (!event.defaultPrevented) handleSelect();
  };
  const draggableProps = component.lock
    ? {}
    : { ...attributes, ...restListeners, onPointerDown: handlePointerDown };

  return (
    <div
      className={classNames(
        'p-3 border border-solid border-white hover:border-[#d9d9d9] rounded-sm w-full mb-3',
        {
          ['border-[#69B1FF]!']: component.id === currentQuestionComponent.id,
          'cursor-grab!': !component.lock,
          'cursor-not-allowed!': component.lock,
        },
      )}
      {...draggableProps}
      onClick={handleSelect}
      ref={setNodeRef}
      style={style}
    >
      <div className="pointer-events-none flex-1">{renderComponent(component)}</div>
    </div>
  );
};

export default DraggableComponent;
