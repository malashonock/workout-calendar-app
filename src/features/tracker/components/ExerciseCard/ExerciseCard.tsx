import { CSSProperties, FunctionComponent, useState } from 'react';
import { useRevalidator } from 'react-router-dom';
import { Card, IconButton, Typography } from '@mui/material';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import cn from 'classnames';

import { ExerciseDto } from 'common/model/dto';
import { EditExerciseDialog, ConfirmDeleteExerciseDialog } from '..';
import { ExerciseService } from 'common/services';
import { useAuth } from 'features/auth/hooks';

import styles from './ExerciseCard.module.scss';
import { Delete, Edit } from '@mui/icons-material';

interface TaskProps {
  exercise: ExerciseDto;
  index: number;
}

export const ExerciseCard: FunctionComponent<TaskProps> = ({
  exercise,
  index,
}: TaskProps): JSX.Element => {
  const { token } = useAuth();
  const revalidator = useRevalidator();

  const { id, exerciseType, effort, setsCount } = exercise;

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const handleOpenEditDialog = (): void => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = (): void => {
    setEditDialogOpen(false);
  };

  const handleOpenConfirmDeleteDialog = (): void => {
    setConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDeleteDialogClose = async (
    deleteConfirmed: boolean,
  ): Promise<void> => {
    setConfirmDeleteDialogOpen(false);

    if (deleteConfirmed) {
      await handleDelete();
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }

      await ExerciseService.deleteExercise(exercise.id, token);
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {({ draggableProps, dragHandleProps, innerRef }: DraggableProvided) => (
          <Card
            className={styles.wrapper}
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
          >
            <div
              className={styles.marker}
              style={{ '--marker-color': exerciseType.color } as CSSProperties}
            />
            <Typography className={styles.exerciseType}>
              {exerciseType.name}
            </Typography>
            <Typography className={styles.effort} color="text.secondary">
              {`${effort} ${exerciseType.unitOfEffort}`}
              {exerciseType.withSets ? ` × ${setsCount} sets` : ''}
            </Typography>
            <IconButton
              className={cn(styles.actionButton, styles.editButton)}
              color="warning"
              size="small"
              onClick={handleOpenEditDialog}
              title="Edit exercise"
            >
              <Edit className={styles.actionButtonIcon} />
            </IconButton>
            <IconButton
              className={cn(styles.actionButton, styles.deleteButton)}
              color="error"
              size="small"
              onClick={handleOpenConfirmDeleteDialog}
              title="Delete exercise"
            >
              <Delete className={styles.actionButtonIcon} />
            </IconButton>
          </Card>
        )}
      </Draggable>
      <EditExerciseDialog
        exercise={exercise}
        open={editDialogOpen}
        onClose={handleEditDialogClose}
      />
      <ConfirmDeleteExerciseDialog
        open={confirmDeleteDialogOpen}
        onClose={handleConfirmDeleteDialogClose}
      />
    </>
  );
};
