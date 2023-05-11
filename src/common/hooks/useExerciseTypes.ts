import { useContext } from 'react';

import { ExerciseTypeDto } from 'common/model/dto';
import { ExerciseTypesContext } from 'common/components';

export const useExerciseTypes = (): ExerciseTypeDto[] => {
  const exerciseTypes = useContext(ExerciseTypesContext);
  return exerciseTypes;
};
