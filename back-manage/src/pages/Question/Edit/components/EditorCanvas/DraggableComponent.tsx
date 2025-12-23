import { QuestionInput, QuestionTitle } from '@/components/QuestionComponents';
import type { IComponent, TComponentType } from '@/service/interface';
import { useQuestionStore } from '@/store';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

const COMPONENT_MAP: Record<TComponentType, React.ComponentType<Record<string, unknown>>> = {
  questionTitle: QuestionTitle,
  questionInput: QuestionInput,
};

const DraggableComponent = ({ component, index }: { component: IComponent; index: number }) => {
  const { currentQuestionComponent, saveCurrentQuestionComponent } = useQuestionStore();
  const renderComponent = (component: IComponent) => {
    const Component = COMPONENT_MAP[component.type!];
    if (!Component) return null;

    return <Component {...((component.props as Record<string, unknown>) ?? {})} />;
  };

  return (
    <Draggable draggableId={component.id!} index={index} isDragDisabled={component.lock}>
      {provided => (
        <div
          className={classNames(
            'p-3 border border-solid border-white hover:border-[#d9d9d9] rounded-sm w-full',
            {
              ['border-[#69B1FF]!']: component.id === currentQuestionComponent.id,
              'cursor-grab!': !component.lock,
              'cursor-not-allowed!': component.lock,
            },
          )}
          key={component.id}
          onClick={() => {
            saveCurrentQuestionComponent(component);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, marginBottom: '12px' }}
        >
          <div className="pointer-events-none">{renderComponent(component)}</div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableComponent;
