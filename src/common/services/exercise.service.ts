import { ExerciseFields } from 'common/model/form-fields';
import { CalendarStatsDto, ExerciseDto } from 'common/model/dto';
import {
  DateString,
  FetchService,
  MonthString,
  MutationMethod,
} from 'common/utils';

const createExercise = async (
  exerciseData: ExerciseFields,
  token: string,
): Promise<ExerciseDto> => {
  const createdExercise = await FetchService.runMutation<
    ExerciseFields,
    ExerciseDto
  >('/exercises', MutationMethod.POST, exerciseData, token);
  return createdExercise;
};

const updateExercise = async (
  id: string,
  exerciseData: ExerciseFields,
  token: string,
): Promise<ExerciseDto> => {
  const updatedExercise = await FetchService.runMutation<
    ExerciseFields,
    ExerciseDto
  >(`/exercises/${id}`, MutationMethod.PATCH, exerciseData, token);
  return updatedExercise;
};

const deleteExercise = async (id: string, token: string): Promise<void> => {
  await FetchService.runMutation<null, ExerciseDto>(
    `/exercises/${id}`,
    MutationMethod.DELETE,
    null,
    token,
  );
};

const getExercise = async (id: string, token: string): Promise<ExerciseDto> => {
  const exercise = await FetchService.runQuery<ExerciseDto>(
    `/exercises/${id}`,
    token,
  );
  return exercise;
};

const getUserDayExercises = async (
  date: DateString,
  token: string,
): Promise<ExerciseDto[]> => {
  const exercises = await FetchService.runQuery<ExerciseDto[]>(
    `/tracker/${date}`,
    token,
  );
  return exercises;
};

const getUserCalendarStats = async (
  month: MonthString,
  token: string,
): Promise<CalendarStatsDto> => {
  const stats = await FetchService.runQuery<CalendarStatsDto>(
    `/calendar/${month}`,
    token,
  );
  return stats;
};

export const ExerciseService = {
  createExercise,
  updateExercise,
  deleteExercise,
  getExercise,
  getUserDayExercises,
  getUserCalendarStats,
};
