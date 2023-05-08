import { ExerciseStatus } from 'common/types';
import { DateString } from 'common/utils';

export interface ExerciseEntity {
  id: string;
  userId: string;
  exerciseTypeId: string;
  date: DateString;
  effort: number;
  setsCount?: number;
  status: ExerciseStatus;
}
