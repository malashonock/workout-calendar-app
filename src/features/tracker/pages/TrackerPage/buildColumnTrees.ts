import { ExerciseDto } from 'common/model/dto';
import { BoardColumnConfig } from './columnsConfig';

export interface BoardColumnTree extends BoardColumnConfig {
  exercises: ExerciseDto[];
}

export const buildColumnTrees = (
  columnsConfig: BoardColumnConfig[],
  exercises: ExerciseDto[],
): BoardColumnTree[] => {
  return columnsConfig.map(
    (columnConfig: BoardColumnConfig): BoardColumnTree => {
      return Object.assign(
        { ...columnConfig },
        {
          exercises: exercises.filter(
            (exercise: ExerciseDto): boolean =>
              exercise.status === columnConfig.status,
          ),
        },
      );
    },
  );
};
