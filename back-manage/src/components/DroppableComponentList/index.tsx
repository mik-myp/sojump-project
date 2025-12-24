import { useQuestionStore } from '@/store';
import React from 'react';
import type { IComponent } from '@/service/interface';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const DroppableComponentList = ({
  renderComponent = () => null,
  hideComponent = false,
}: {
  renderComponent: (component: IComponent, index: number) => React.ReactNode;
  hideComponent?: boolean;
}) => {
  const { questionInfo } = useQuestionStore();

  const { componentList = [] } = questionInfo || {};
  const components = componentList.filter(item => {
    if (hideComponent) return item.show;
    return true;
  });

  return (
    <SortableContext
      items={components.map(component => component.id!)}
      strategy={verticalListSortingStrategy}
    >
      {components.map(renderComponent)}
    </SortableContext>
  );
};

export default React.memo(DroppableComponentList);
