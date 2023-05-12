import { FunctionComponent } from 'react';
import { Pie } from '@ant-design/plots';

import { ExerciseStatsDto } from 'common/model/dto';

interface DonutChartProps {
  data: ExerciseStatsDto['breakdownByStatus'];
  totalEffort: ExerciseStatsDto['totalEffort'];
  unitOfEffort: ExerciseStatsDto['exerciseType']['unitOfEffort'];
}

export const DonutChart: FunctionComponent<DonutChartProps> = ({
  data,
  totalEffort,
  unitOfEffort,
}) => {
  return (
    <Pie
      data={data || []}
      color={['orange', 'red', 'green']}
      colorField="status"
      angleField="effort"
      radius={1}
      innerRadius={0.8}
      legend={false}
      style={{
        width: '7rem',
        height: '7rem',
      }}
      statistic={{
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '1rem',
          },
          content: `${totalEffort} ${unitOfEffort}`,
        },
      }}
      label={undefined}
    />
  );
};
