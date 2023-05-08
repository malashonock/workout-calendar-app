import { ExerciseTypeDto } from 'common/model/dto';
import { FetchService } from 'common/utils';

const getExerciseTypes = async (): Promise<ExerciseTypeDto[]> => {
  const types = await FetchService.runQuery<ExerciseTypeDto[]>(
    `/exercisetypes`,
  );
  return types;
};

const getExerciseType = async (id: string): Promise<ExerciseTypeDto> => {
  const type = await FetchService.runQuery<ExerciseTypeDto>(
    `/exercisetypes/${id}`,
  );
  return type;
};

export const ExerciseTypeService = {
  getExerciseTypes,
  getExerciseType,
};
