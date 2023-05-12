import { FunctionComponent } from 'react';
import { Column } from '@ant-design/plots';

import { ExerciseStatsDto } from 'common/model/dto';

interface LineChartProps {
  data: ExerciseStatsDto['breakdownBySubperiod'];
  color: string;
  periodFieldName: string;
}

export const LineChart: FunctionComponent<LineChartProps> = ({
  periodFieldName,
  data,
  color,
}) => {
  return (
    <Column
      data={data || []}
      xField={periodFieldName}
      yField="effort"
      style={{
        width: '9rem',
        height: '7rem',
      }}
      columnStyle={{
        fill: color,
      }}
    />
  );
};
