import { useState, useEffect } from 'react';

import { ExerciseTypeDto } from 'common/model/dto';
import { ExerciseTypeService } from 'common/services';

export const useExerciseTypes = (): ExerciseTypeDto[] => {
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseTypeDto[]>([]);

  useEffect(() => {
    (async () => {
      const types = await ExerciseTypeService.getExerciseTypes();
      setExerciseTypes(types);
    })();
  }, []);

  return exerciseTypes;
};
