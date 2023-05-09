import { FunctionComponent } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

import { ExerciseDto } from 'common/model/dto';
import { ExerciseCard } from '../ExerciseCard';

import styles from './BoardColumn.module.scss';

interface BoardColumnProps {
  title: string;
  exercises: ExerciseDto[];
}

export const BoardColumn: FunctionComponent<BoardColumnProps> = ({
  title,
  exercises,
}) => {
  return (
    <Droppable droppableId={'1'} direction="vertical" type="task">
      {({ droppableProps, innerRef, placeholder }: DroppableProvided) => (
        <Paper
          className={styles.wrapper}
          elevation={0}
          {...droppableProps}
          ref={innerRef}
        >
          <Typography className={styles.title}>{title}</Typography>
          <Stack className={styles.items}>
            {exercises.map(
              (exercise: ExerciseDto, index: number): JSX.Element => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                />
              ),
            )}
          </Stack>
          {placeholder}
        </Paper>
      )}
    </Droppable>
  );
};
