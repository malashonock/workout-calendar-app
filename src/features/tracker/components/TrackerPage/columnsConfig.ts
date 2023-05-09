import { ExerciseStatus } from 'common/types';

export interface BoardColumnConfig {
  status: ExerciseStatus;
  title: string;
}

export const columnsConfig: BoardColumnConfig[] = [
  {
    status: ExerciseStatus.ToDo,
    title: 'To do',
  },
  {
    status: ExerciseStatus.InProgress,
    title: 'In progress',
  },
  {
    status: ExerciseStatus.Done,
    title: 'Done',
  },
];
