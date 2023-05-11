import { FunctionComponent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import dayjs from 'dayjs';

import { TimeScale } from 'common/types';
import { PeriodSettings } from '../../types';

import styles from './TimeScaleSelector.module.scss';

interface TimeScaleSelectorProps {
  state: PeriodSettings;
  setState: (newState: PeriodSettings) => void;
}

export const TimeScaleSelector: FunctionComponent<TimeScaleSelectorProps> = ({
  state,
  setState,
}) => {
  const { timeScale, startDate } = state;

  const timeScaleOptions = [TimeScale.Week, TimeScale.Month, TimeScale.Year];

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeScale: TimeScale,
  ) => {
    const newStartDate: Date = dayjs(startDate).startOf(newTimeScale).toDate();

    setState({
      timeScale: newTimeScale,
      startDate: newStartDate,
    });
  };

  return (
    <ToggleButtonGroup exclusive value={timeScale} onChange={handleChange}>
      {timeScaleOptions.map(
        (option: TimeScale): JSX.Element => (
          <ToggleButton
            key={option}
            value={option}
            disabled={option === timeScale}
          >
            {option}
          </ToggleButton>
        ),
      )}
    </ToggleButtonGroup>
  );
};
