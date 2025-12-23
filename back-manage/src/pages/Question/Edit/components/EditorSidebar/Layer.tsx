import DroppableComponentList from '@/components/DroppableComponentList';
import useDropEnd from '@/hooks/useDropEnd';
import useLock from '@/hooks/useLock';
import useShow from '@/hooks/useShow';
import { useQuestionStore } from '@/store';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  HolderOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Layer = () => {
  const dragDropEnd = useDropEnd();
  const changeComponentShow = useShow();
  const changeComponentLock = useLock();

  const { currentQuestionComponent, saveCurrentQuestionComponent } = useQuestionStore();

  return (
    <>
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
                    <Draggable
                      draggableId={component.id!}
                      index={index}
                      key={component.id}
                      isDragDisabled={component.lock}
                    >
                      {provided => (
                        <div
                          key={component.id}
                          className="w-full flex justify-between items-center px-3 h-10 bg-white rounded-lg shadow-sm"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{ ...provided.draggableProps.style, marginBottom: '12px' }}
                        >
                          <div className={classNames('flex gap-2 items-center')}>
                            <HolderOutlined
                              {...(!component.lock ? provided.dragHandleProps : {})}
                              className={classNames({
                                'cursor-grab!': !component.lock,
                                'cursor-not-allowed!': component.lock,
                              })}
                            />
                            <span
                              onClick={() => {
                                if (!component.show) return;
                                saveCurrentQuestionComponent(component);
                              }}
                              className={classNames('cursor-pointer! select-none', {
                                ['text-[#69B1FF]!']: component.id === currentQuestionComponent.id,
                              })}
                            >
                              {component.title}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <div
                              className="cursor-pointer!"
                              onClick={() => changeComponentShow(component.id!)}
                            >
                              {component.show ? (
                                <Tooltip title="隐藏">
                                  <EyeInvisibleOutlined />
                                </Tooltip>
                              ) : (
                                <Tooltip title="显示">
                                  <EyeOutlined />
                                </Tooltip>
                              )}
                            </div>
                            <div
                              className="cursor-pointer!"
                              onClick={() => changeComponentLock(component.id!)}
                            >
                              {component.lock ? (
                                <Tooltip title="解锁">
                                  <UnlockOutlined />
                                </Tooltip>
                              ) : (
                                <Tooltip title="锁定">
                                  <LockOutlined />
                                </Tooltip>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                }}
              />
              <div style={{ marginBottom: '12px' }}>{provided.placeholder}</div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default Layer;
