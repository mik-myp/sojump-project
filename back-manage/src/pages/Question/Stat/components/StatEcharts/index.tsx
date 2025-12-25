import { useQuestionStore } from '@/store';
import { Column, Line, Pie } from '@ant-design/plots';
import { useMemo } from 'react';

const StatEcharts = () => {
  const {
    currentQuestionComponent,
    answerList,
    questionInfo: { componentList = [] } = {},
  } = useQuestionStore();

  const data = useMemo(() => {
    const currentData = answerList.map(item => item[currentQuestionComponent.id!]).filter(Boolean);
    const currentObj = currentData.reduce((acc: Record<string, number>, cur) => {
      acc[cur as string] = (acc[cur as string] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 将统计结果转换为图表需要的数据格式
    return Object.entries(currentObj).map(([type, count]) => ({
      type,
      value: count,
    }));
  }, [answerList, currentQuestionComponent.id]);

  const renderChart = useMemo(() => {
    const config = {
      data,
      xField: 'type',
      yField: 'value',
      legend: true,
    };
    let chartIndex = componentList.findIndex(item => item.id === currentQuestionComponent.id);
    if (chartIndex > -1) {
      chartIndex = chartIndex % 3;
    } else {
      chartIndex = 0;
    }
    switch (chartIndex) {
      case 0:
        return <Column {...config} />;
      case 1:
        return <Line {...config} />;
      case 2:
        return <Pie data={data} angleField={config.yField} colorField={config.xField} />;
      default:
        return <Column {...config} />;
    }
  }, [data, currentQuestionComponent.id, componentList]);

  return currentQuestionComponent.id && data.length ? (
    <div className="w-1/4 max-w-200 bg-white px-2 h-full">{renderChart}</div>
  ) : null;
};

export default StatEcharts;
