import { renderComponent } from '@/components/QuestionComponents';

import { useQuestionStore } from '@/store';
import classNames from 'classnames';

const StatQuestion = () => {
  const { questionInfo, currentQuestionComponent, saveCurrentQuestionComponent } =
    useQuestionStore();

  const { componentList } = questionInfo;

  const { px, py } = questionInfo.pageSetting || { px: 0, py: 0 };

  return (
    <div className="w-1/4 max-w-125 bg-white px-2 h-full overflow-hidden">
      <div
        className="max-w-full h-full overflow-y-auto overflow-x-hidden"
        style={{
          paddingInline: px,
          paddingBlock: py,
        }}
      >
        <div className="flex flex-col py-3">
          {componentList
            ?.filter(item => {
              return item.show;
            })
            .map(component => {
              return (
                <div
                  className={classNames(
                    'p-3 border border-solid border-white hover:border-[#d9d9d9] rounded-sm w-full mb-3',
                    {
                      ['border-[#69B1FF]!']: component.id === currentQuestionComponent.id,
                    },
                  )}
                  onClick={() => {
                    saveCurrentQuestionComponent(component);
                  }}
                  key={component.id}
                >
                  <div className="pointer-events-none flex-1">{renderComponent(component)}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default StatQuestion;
