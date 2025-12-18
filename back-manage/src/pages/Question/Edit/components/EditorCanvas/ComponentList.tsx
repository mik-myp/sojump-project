import { useQuestionStore } from '@/store';
import React from 'react';
import DraggableComponent from './DraggableComponent';

const ComponentList = () => {
  const { questionInfo } = useQuestionStore();

  const { componentList = [] } = questionInfo || {};
  return componentList.map((component, index: number) => (
    <DraggableComponent component={component} index={index} key={component.id} />
  ));
};
export default React.memo(ComponentList);
