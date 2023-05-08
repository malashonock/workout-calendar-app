import { DateString, MonthString } from 'common/utils';
import { ExerciseEntity } from './ExerciseEntity';

export type ExerciseTable = {
  [yearMonth in MonthString]: {
    [date in DateString]: ExerciseEntity[];
  };
};
