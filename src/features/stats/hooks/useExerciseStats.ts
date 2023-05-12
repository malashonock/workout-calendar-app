import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ExerciseStatsDto } from 'common/model/dto';
import { selectAuthToken } from 'common/store';
import { TimeScale } from 'common/types';
import { ExerciseService } from 'common/services';

export const useExerciseStats = (
  timeScale: TimeScale,
  startDate: Date,
): ExerciseStatsDto[] => {
  const token = useSelector(selectAuthToken);
  const [exerciseStats, setExerciseStats] = useState<ExerciseStatsDto[]>([]);

  useEffect(() => {
    (async () => {
      if (!token) {
        throw new Error('User not authenticated');
      }

      const stats = await ExerciseService.getUserExerciseStats(
        timeScale,
        startDate,
        token,
      );
      setExerciseStats(stats);
    })();
  }, [timeScale, startDate, token]);

  return exerciseStats;
};
