import { FunctionComponent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { TimeScale } from 'common/types';
import { PeriodSettings } from '../../types';

import styles from './TimeScaleSelector.module.scss';

interface TimeScaleSelectorProps extends PeriodSettings {
  onChange: (newScale: TimeScale) => void;
}

export const TimeScaleSelector: FunctionComponent<TimeScaleSelectorProps> = ({
  timeScale,
  startDate,
  onChange,
}) => {
  const timeScaleOptions = [TimeScale.Week, TimeScale.Month, TimeScale.Year];

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeScale: TimeScale,
  ) => {
    onChange(newTimeScale);
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
