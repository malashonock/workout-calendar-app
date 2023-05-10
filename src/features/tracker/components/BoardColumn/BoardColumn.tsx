import { FunctionComponent, useState } from 'react';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { DroppableProvided } from 'react-beautiful-dnd';

import { ExerciseDto } from 'common/model/dto';
import { ExerciseCard } from '../ExerciseCard';
import { ExerciseStatus } from 'common/types';
import { AddExerciseDialog } from '../AddExerciseDialog';
import { StrictModeDroppable } from 'common/components';

import styles from './BoardColumn.module.scss';
import AddIcon from '@mui/icons-material/Add';

interface BoardColumnProps {
  title: string;
  status: ExerciseStatus;
  exercises: ExerciseDto[];
}

export const BoardColumn: FunctionComponent<BoardColumnProps> = ({
  status,
  title,
  exercises,
}) => {
  const [addExerciseDialogOpen, setAddExerciseDialogOpen] = useState(false);

  const handleAddExerciseDialogClose = (): void => {
    setAddExerciseDialogOpen(false);
  };

  const handleOpenAddExerciseDialog = (): void => {
    setAddExerciseDialogOpen(true);
  };

  return (
    <>
      <StrictModeDroppable
        droppableId={status}
        direction="vertical"
        type="exercise"
      >
        {({ droppableProps, innerRef, placeholder }: DroppableProvided) => (
          <Paper className={styles.wrapper} elevation={0}>
            <Box className={styles.header}>
              <Typography className={styles.title}>{title}</Typography>
              <IconButton
                color="success"
                size="small"
                className={styles.addItemButton}
                title="Add exercise"
                onClick={handleOpenAddExerciseDialog}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Stack className={styles.items} {...droppableProps} ref={innerRef}>
              {exercises.map(
                (exercise: ExerciseDto, index: number): JSX.Element => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                  />
                ),
              )}
              {placeholder}
            </Stack>
          </Paper>
        )}
      </StrictModeDroppable>
      <AddExerciseDialog
        status={status}
        open={addExerciseDialogOpen}
        onClose={handleAddExerciseDialogClose}
      />
    </>
  );
};
