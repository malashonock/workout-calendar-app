import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import weekDay from 'dayjs/plugin/weekday';

import { TimeScaleSelector } from '../../components';
import { TimeScale } from 'common/types';
import { PeriodSettings } from '../../types';
import { buildSearchParams, parseSearchParams } from '../../utils';

import styles from './StatsPage.module.scss';

dayjs.extend(weekDay);

export const StatsPage: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [periodSettings, setPeriodSettings] = useState<PeriodSettings>(
    parseSearchParams(searchParams) || {
      timeScale: TimeScale.Week,
      startDate: dayjs().weekday(0).toDate(),
    },
  );

  // // Sync settings with search params update
  // useEffect(() => {
  //   setPeriodSettings(parseSearchParams(searchParams) || { ...periodSettings });
  // }, [searchParams]);

  // Sync search params with settings update
  useEffect(() => {
    setSearchParams(buildSearchParams(periodSettings));
  }, [periodSettings]);

  return (
    <Stack>
      <TimeScaleSelector state={periodSettings} setState={setPeriodSettings} />
    </Stack>
  );
};
