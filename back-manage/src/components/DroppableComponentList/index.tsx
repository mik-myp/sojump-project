import { useQuestionStore } from '@/store';
import React from 'react';
import type { IComponent } from '@/service/interface';

const DroppableComponentList = ({
  renderComponent = () => null,
  hideComponent = false,
}: {
  renderComponent: (component: IComponent, index: number) => React.ReactNode;
  hideComponent?: boolean;
}) => {
  const { questionInfo } = useQuestionStore();

  const { componentList = [] } = questionInfo || {};
  return componentList
    .filter(item => {
      if (hideComponent) return item.show;
      return true;
    })
    .map(renderComponent);
};

export default React.memo(DroppableComponentList);
