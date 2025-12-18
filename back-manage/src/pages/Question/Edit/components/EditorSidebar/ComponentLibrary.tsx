import QuestionInput, {
  defaultInputProps,
  type TQuestionInputProps,
} from '@/components/QuestionComponents/QuestionInput';
import QuestionTitle, {
  defaultTitleProps,
  type TQuestionTitleProps,
} from '@/components/QuestionComponents/QuestionTitle';
import { useQuestionStore } from '@/store';
import generateId from '@/utils/generateId';
import type React from 'react';

type TComponentItem =
  | {
      type: 'questionTitle';
      component: React.ComponentType<TQuestionTitleProps>;
      defaultProps: TQuestionTitleProps;
    }
  | {
      type: 'questionInput';
      component: React.ComponentType<TQuestionInputProps>;
      defaultProps: TQuestionInputProps;
    };

// 定义组件组
const COMPONENT_GROUP: {
  title: string;
  components: TComponentItem[];
}[] = [
  {
    title: '文本显示',
    components: [
      {
        type: 'questionTitle',
        component: QuestionTitle,
        defaultProps: defaultTitleProps,
      },
    ],
  },
  {
    title: '用户输入',
    components: [
      {
        type: 'questionInput',
        component: QuestionInput,
        defaultProps: defaultInputProps,
      },
    ],
  },
];

const ComponentLibrary = () => {
  const { addQuestionComponent } = useQuestionStore();

  const handleAdd = ({ type, defaultProps }: TComponentItem) => {
    addQuestionComponent({
      id: generateId(),
      type,
      props: defaultProps,
    });
  };

  return (
    <div>
      {COMPONENT_GROUP.map(group => {
        return (
          <div className="mb-8">
            <div className="text-xl font-bold mb-4">{group.title}</div>
            <div className="flex flex-col gap-4">
              {group.components.map((item, index) => (
                <div
                  className="bg-gray-100 p-4 rounded-md select-none"
                  onClick={() => handleAdd(item)}
                  key={index}
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
