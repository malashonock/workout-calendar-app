import { useContext } from 'react';

import { ExerciseTypeDto } from 'common/model/dto';
import { ExerciseTypesContext } from '../components';

export const useExerciseTypes = (): ExerciseTypeDto[] => {
  const exerciseTypes = useContext(ExerciseTypesContext);
  return exerciseTypes;
};
