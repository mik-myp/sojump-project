import DroppableComponentList from '@/components/DroppableComponentList';
import useDropEnd from '@/hooks/useDropEnd';
import useLock from '@/hooks/useLock';
import useShow from '@/hooks/useShow';
import type { IComponent } from '@/service/interface';
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
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const LayerItem = ({
  component,
  currentId,
  onSelect,
  onToggleShow,
  onToggleLock,
}: {
  component: IComponent;
  currentId?: string;
  onSelect: (component: IComponent) => void;
  onToggleShow: (id: string) => void;
  onToggleLock: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: component.id!,
      disabled: component.lock,
    });
  const transformWithoutScale = transform
    ? { ...transform, scaleX: 1, scaleY: 1, scaleZ: 1 }
    : null;
  const style = {
    transform: CSS.Transform.toString(transformWithoutScale),
    transition,
    marginBottom: '12px',
  };

  return (
    <div
      className="w-full flex justify-between items-center px-3 h-10 bg-white rounded-lg shadow-sm"
      ref={setNodeRef}
      style={style}
    >
      <div className={classNames('flex gap-2 items-center')}>
        <HolderOutlined
          ref={setActivatorNodeRef}
          {...(!component.lock ? { ...attributes, ...listeners } : {})}
          className={classNames({
            'cursor-grab!': !component.lock,
            'cursor-not-allowed!': component.lock,
          })}
        />
        <span
          onClick={() => {
            if (!component.show) return;
            onSelect(component);
          }}
          className={classNames('cursor-pointer! select-none', {
            ['text-[#69B1FF]!']: component.id === currentId,
          })}
        >
          {component.title}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="cursor-pointer!" onClick={() => onToggleShow(component.id!)}>
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
        <div className="cursor-pointer!" onClick={() => onToggleLock(component.id!)}>
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
  );
};

const Layer = () => {
  const dragDropEnd = useDropEnd();
  const changeComponentShow = useShow();
  const changeComponentLock = useLock();

  const { currentQuestionComponent, saveCurrentQuestionComponent } = useQuestionStore();
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={dragDropEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="flex flex-col">
          <DroppableComponentList
            renderComponent={component => (
              <LayerItem
                key={component.id}
                component={component}
                currentId={currentQuestionComponent.id}
                onSelect={saveCurrentQuestionComponent}
                onToggleShow={changeComponentShow}
                onToggleLock={changeComponentLock}
              />
            )}
          />
          <div style={{ marginBottom: '12px' }} />
        </div>
      </DndContext>
    </>
  );
};
export default Layer;
