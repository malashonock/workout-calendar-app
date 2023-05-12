import { ExerciseTypeDto } from './ExerciseTypeDto';
import { ExerciseStatus, TimeScale } from 'common/types';
import { DateString } from 'common/utils';

export interface ExerciseStatsDto {
  exerciseType: ExerciseTypeDto;
  timeScale: TimeScale;
  startDate: DateString;
  totalEffort?: number;
  effortChange?: number; // Percentage vs totalEffort for previous period
  breakdownByStatus?: Array<{
    status: ExerciseStatus;
    effort: number;
  }>;
  breakdownBySubperiod?:
    | Array<{
        dayOfWeek: string;
        effort: number;
      }>
    | Array<{
        day: number;
        effort: number;
      }>
    | Array<{
        month: number;
        effort: number;
      }>;
}
