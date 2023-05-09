import { FunctionComponent } from 'react';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

import { ExerciseDto } from 'common/model/dto';
import { ExerciseCard } from '../ExerciseCard';

import styles from './BoardColumn.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { ExerciseStatus } from 'common/types';

interface BoardColumnProps {
  title: string;
  status: ExerciseStatus;
  exercises: ExerciseDto[];
}

export const BoardColumn: FunctionComponent<BoardColumnProps> = ({
  title,
  exercises,
}) => {
  const handleAddExercise = (): void => {};

  return (
    <Droppable droppableId={'1'} direction="vertical" type="task">
      {({ droppableProps, innerRef, placeholder }: DroppableProvided) => (
        <Paper
          className={styles.wrapper}
          elevation={0}
          {...droppableProps}
          ref={innerRef}
        >
          <Box className={styles.header}>
            <Typography className={styles.title}>{title}</Typography>
            <IconButton
              color="success"
              size="small"
              className={styles.addItemButton}
              title="Add exercise"
            >
              <AddIcon />
            </IconButton>
          </Box>
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
