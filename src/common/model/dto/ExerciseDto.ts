import { ExerciseStatus } from 'common/types';
import { ExerciseTypeDto } from './ExerciseTypeDto';
import { DateString } from 'common/utils';

export interface ExerciseDto {
  id: string;
  exerciseType: ExerciseTypeDto;
  date: DateString;
  effort: number;
  setsCount?: number;
  status: ExerciseStatus;
}
