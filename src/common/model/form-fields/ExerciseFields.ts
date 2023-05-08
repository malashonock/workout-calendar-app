import { ExerciseStatus } from 'common/types';
import { DateString } from 'common/utils';

export interface ExerciseFields {
  date: DateString;
  exerciseTypeId: string;
  effort: number;
  setsCount?: number;
  status: ExerciseStatus;
}

export type UpdateExerciseFields = Partial<Omit<ExerciseFields, 'date'>>;
