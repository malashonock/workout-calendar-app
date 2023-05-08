import { ExerciseFields, UpdateExerciseFields } from 'common/model/form-fields';
import { ExerciseEntity, ExerciseTable } from '../entities';
import {
  DateString,
  MonthString,
  getFromLocalStorage,
  saveToLocalStorage,
} from 'common/utils';
import dayjs from 'dayjs';

const addExercise = async (
  exerciseData: ExerciseFields,
): Promise<ExerciseEntity> => {
  let exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const exercises = await ExerciseRepository.getAllExercises();

  const id = String(exercises.length + 1);
  const createdExercise: ExerciseEntity = {
    id,
    ...exerciseData,
  };

  const { date } = exerciseData;
  const yearMonth: MonthString = dayjs(date).format('YYYY-DD');
  exerciseTable = {
    ...exerciseTable,
    [yearMonth]: {
      ...exerciseTable[yearMonth],
      [date]: [...exerciseTable[yearMonth][date], createdExercise],
    },
  };
  saveToLocalStorage('exercises', exerciseTable);

  return createdExercise;
};

const updateExercise = async (
  id: string,
  exerciseData: UpdateExerciseFields,
): Promise<ExerciseEntity> => {
  let updatedExercise = await ExerciseRepository.getExerciseById(id);
  if (!updatedExercise) {
    throw new Error('Exercise not found');
  }

  updatedExercise = {
    ...updatedExercise,
    ...exerciseData,
  };

  let exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const { date } = updatedExercise;
  const yearMonth: MonthString = dayjs(date).format('YYYY-DD');
  exerciseTable = {
    ...exerciseTable,
    [yearMonth]: {
      ...exerciseTable[yearMonth],
      [date]: exerciseTable[yearMonth][date].map(
        (exercise: ExerciseEntity): ExerciseEntity => {
          return exercise.id === id ? exercise : updatedExercise!;
        },
      ),
    },
  };
  saveToLocalStorage('exercises', exerciseTable);

  return updatedExercise;
};

const deleteExercise = async (id: string): Promise<void> => {
  let deletedExercise = await ExerciseRepository.getExerciseById(id);
  if (!deletedExercise) {
    throw new Error('Exercise not found');
  }

  let exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const { date } = deletedExercise;
  const yearMonth: MonthString = dayjs(date).format('YYYY-DD');
  exerciseTable = {
    ...exerciseTable,
    [yearMonth]: {
      ...exerciseTable[yearMonth],
      [date]: exerciseTable[yearMonth][date].filter(
        (exercise: ExerciseEntity): boolean => {
          return exercise.id !== deletedExercise!.id;
        },
      ),
    },
  };
  saveToLocalStorage('exercises', exerciseTable);
};

const getAllExercises = async (): Promise<ExerciseEntity[]> => {
  const exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});

  const exercises: ExerciseEntity[] = [];
  for (const monthRecord of Object.values(exerciseTable)) {
    for (const dayExercises of Object.values(monthRecord)) {
      exercises.push(...dayExercises);
    }
  }

  return exercises;
};

const getExercisesByMonth = async (
  yearMonth: MonthString,
): Promise<ExerciseEntity[]> => {
  const exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const monthRecord = exerciseTable[yearMonth] || {};

  const exercises: ExerciseEntity[] = [];
  for (const dayExercises of Object.values(monthRecord)) {
    exercises.push(...dayExercises);
  }

  return exercises;
};

const getExercisesByDate = async (
  date: DateString,
): Promise<ExerciseEntity[]> => {
  const exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const yearMonth: MonthString = dayjs(date).format('YYYY-MM');
  const monthRecord = exerciseTable[yearMonth][date] || {};
  return Object.values(monthRecord);
};

const getExerciseById = async (id: string): Promise<ExerciseEntity | null> => {
  const types = await ExerciseRepository.getAllExercises();
  return types.find((type: ExerciseEntity): boolean => type.id === id) || null;
};

export const ExerciseRepository = {
  addExercise,
  updateExercise,
  deleteExercise,
  getAllExercises,
  getExercisesByMonth,
  getExercisesByDate,
  getExerciseById,
};
