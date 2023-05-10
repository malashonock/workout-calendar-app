import { ExerciseTypeFields } from 'common/model/form-fields';
import { ExerciseTypeEntity } from '../entities';
import { getFromLocalStorage, saveToLocalStorage } from 'common/utils';

const addType = async (
  exerciseTypeData: ExerciseTypeFields,
): Promise<ExerciseTypeEntity> => {
  const types = getFromLocalStorage<ExerciseTypeEntity[]>('exercise-types', []);

  const id = String(types.length + 1);
  const createdType: ExerciseTypeEntity = {
    id,
    ...exerciseTypeData,
  };

  types.push(createdType);
  saveToLocalStorage('exercise-types', types);

  return createdType;
};

const getAllTypes = async (): Promise<ExerciseTypeEntity[]> => {
  return getFromLocalStorage<ExerciseTypeEntity[]>('exercise-types', []);
};

const getTypeById = async (id: string): Promise<ExerciseTypeEntity | null> => {
  const types = await ExerciseTypeRepository.getAllTypes();
  return (
    types.find((type: ExerciseTypeEntity): boolean => type.id === id) || null
  );
};

const seedTypes = async (): Promise<void> => {
  const types: ExerciseTypeEntity[] = [
    {
      id: '1',
      name: 'Outdoor jogging',
      color: '#4caf50', // MUI green[500]
      unitOfEffort: 'km',
      withSets: false,
      isOutdoor: true,
    },
    {
      id: '2',
      name: 'Push-ups',
      color: '#ff5722', // MUI deepOrange[500]
      unitOfEffort: 'reps',
      withSets: true,
      isOutdoor: false,
    },
    {
      id: '3',
      name: 'Squats',
      color: '#e91e63', // MUI pink[500]
      unitOfEffort: 'reps',
      withSets: true,
      isOutdoor: false,
    },
    {
      id: '4',
      name: 'Abs',
      color: '#673ab7', // MUI deepPurple[500]
      unitOfEffort: 'reps',
      withSets: true,
      isOutdoor: false,
    },
    {
      id: '5',
      name: 'Plank',
      color: '#03a9f4', // MUI lightBlue[500]
      unitOfEffort: 'min',
      withSets: true,
      isOutdoor: false,
    },
  ];

  saveToLocalStorage('exercise-types', types);
};

export const ExerciseTypeRepository = {
  addType,
  getAllTypes,
  getTypeById,
  seedTypes,
};
