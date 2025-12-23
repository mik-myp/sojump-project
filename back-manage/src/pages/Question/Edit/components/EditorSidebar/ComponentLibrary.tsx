import {
  defaultInputProps,
  defaultTitleProps,
  QuestionInput,
  QuestionTitle,
  type TQuestionInputProps,
  type TQuestionTitleProps,
} from '@/components/QuestionComponents';
import { useQuestionStore } from '@/store';
import generateId from '@/utils/generateId';
import type React from 'react';

type TComponentItem =
  | {
      type: 'questionTitle';
      component: React.ComponentType<TQuestionTitleProps>;
      defaultProps: TQuestionTitleProps;
      title: string;
    }
  | {
      type: 'questionInput';
      component: React.ComponentType<TQuestionInputProps>;
      defaultProps: TQuestionInputProps;
      title: string;
    };

// 定义组件组
const COMPONENT_GROUP: {
  title: string;
  id: string;
  components: TComponentItem[];
}[] = [
  {
    title: '文本显示',
    id: 'text-show',
    components: [
      {
        type: 'questionTitle',
        title: '标题组件',
        component: QuestionTitle,
        defaultProps: defaultTitleProps,
      },
    ],
  },
  {
    title: '用户输入',
    id: 'user-input',
    components: [
      {
        type: 'questionInput',
        title: '输入框组件',
        component: QuestionInput,
        defaultProps: defaultInputProps,
      },
    ],
  },
];

const ComponentLibrary = () => {
  const { addQuestionComponent } = useQuestionStore();

  const handleAdd = ({ type, defaultProps, title }: TComponentItem) => {
    addQuestionComponent({
      id: generateId(),
      type,
      title,
      props: defaultProps,
      show: true,
    });
  };

  return (
    <div>
      {COMPONENT_GROUP.map(group => {
        return (
          <div className="mb-8" key={group.id}>
            <div className="text-xl font-bold mb-4">{group.title}</div>
            <div className="flex flex-col gap-4">
              {group.components.map(item => (
                <div
                  className="bg-gray-100 p-4 rounded-md select-none"
                  onClick={() => handleAdd(item)}
                  key={item.type}
                >
                  <div className="pointer-events-none">
                    <item.component />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ComponentLibrary;
