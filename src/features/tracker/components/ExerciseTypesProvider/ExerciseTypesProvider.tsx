import { FunctionComponent, createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ExerciseTypeDto } from 'common/model/dto';
import { ExerciseTypeService } from 'common/services';

export const ExerciseTypesContext = createContext<ExerciseTypeDto[]>([]);

export const ExerciseTypesProvider: FunctionComponent = () => {
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseTypeDto[]>([]);

  useEffect(() => {
    (async () => {
      const types = await ExerciseTypeService.getExerciseTypes();
      setExerciseTypes(types);
    })();
  }, []);

  return (
    <ExerciseTypesContext.Provider value={exerciseTypes}>
      <Outlet />
    </ExerciseTypesContext.Provider>
  );
};
