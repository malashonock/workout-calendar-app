import { ExerciseFields } from 'common/model/form-fields';
import { ExerciseEntity, ExerciseTable } from '../entities';
import {
  DateString,
  MonthString,
  getFromLocalStorage,
  saveToLocalStorage,
} from 'common/utils';
import dayjs from 'dayjs';

const addExercise = async (
  userId: string,
  exerciseData: ExerciseFields,
): Promise<ExerciseEntity> => {
  let exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const exercises = await ExerciseRepository.getAllExercises();

  const id = String(exercises.length + 1);
  const createdExercise: ExerciseEntity = {
    id,
    userId,
    ...exerciseData,
  };

  const { date } = exerciseData;
  const yearMonth: MonthString = dayjs(date).format('YYYY-MM');
  exerciseTable = {
    ...exerciseTable,
    [yearMonth]: {
      ...exerciseTable[yearMonth],
      [date]: [
        ...((exerciseTable[yearMonth] ?? {})[date] ?? []),
        createdExercise,
      ],
    },
  };
  saveToLocalStorage('exercises', exerciseTable);

  return createdExercise;
};

const updateExercise = async (
  id: string,
  exerciseData: Partial<ExerciseFields>,
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
  const yearMonth: MonthString = dayjs(date).format('YYYY-MM');
  exerciseTable = {
    ...exerciseTable,
    [yearMonth]: {
      ...exerciseTable[yearMonth],
      [date]: ((exerciseTable[yearMonth] ?? {})[date] ?? []).map(
        (exercise: ExerciseEntity): ExerciseEntity => {
          return exercise.id === id ? updatedExercise! : exercise;
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
  const yearMonth: MonthString = dayjs(date).format('YYYY-MM');
  exerciseTable = {
    ...exerciseTable,
    [yearMonth]: {
      ...exerciseTable[yearMonth],
      [date]: ((exerciseTable[yearMonth] ?? {})[date] ?? []).filter(
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

const getAllUserExercises = async (
  userId: string,
): Promise<ExerciseEntity[]> => {
  const exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});

  const exercises: ExerciseEntity[] = [];
  for (const monthRecord of Object.values(exerciseTable)) {
    for (const dayExercises of Object.values(monthRecord)) {
      const userExcercises = dayExercises.filter(
        (exercise: ExerciseEntity): boolean => exercise.userId === userId,
      );
      exercises.push(...userExcercises);
    }
  }

  return exercises;
};

const getUserExercisesByMonth = async (
  userId: string,
  yearMonth: MonthString,
): Promise<ExerciseEntity[]> => {
  const exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const monthRecord = exerciseTable[yearMonth] || {};

  const exercises: ExerciseEntity[] = [];
  for (const dayExercises of Object.values(monthRecord)) {
    const userExcercises = dayExercises.filter(
      (exercise: ExerciseEntity): boolean => exercise.userId === userId,
    );
    exercises.push(...userExcercises);
  }

  return exercises;
};

const getUserExercisesByDate = async (
  userId: string,
  date: DateString,
): Promise<ExerciseEntity[]> => {
  const exerciseTable = getFromLocalStorage<ExerciseTable>('exercises', {});
  const yearMonth: MonthString = dayjs(date).format('YYYY-MM');
  const dayExercises = (exerciseTable[yearMonth] ?? {})[date] ?? [];
  const userExcercises = dayExercises.filter(
    (exercise: ExerciseEntity): boolean => exercise.userId === userId,
  );
  return userExcercises;
};

const getExerciseById = async (id: string): Promise<ExerciseEntity | null> => {
  const exercises = await ExerciseRepository.getAllExercises();
  return (
    exercises.find((exercise: ExerciseEntity): boolean => exercise.id === id) ||
    null
  );
};

export const ExerciseRepository = {
  addExercise,
  updateExercise,
  deleteExercise,
  getAllExercises,
  getAllUserExercises,
  getUserExercisesByMonth,
  getUserExercisesByDate,
  getExerciseById,
};
