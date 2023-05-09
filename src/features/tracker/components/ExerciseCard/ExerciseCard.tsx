import { CSSProperties, FunctionComponent, MouseEvent, useState } from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import cn from 'classnames';

import styles from './ExerciseCard.module.scss';
import { Delete, Edit } from '@mui/icons-material';
import { ExerciseDto } from 'common/model/dto';

interface TaskProps {
  exercise: ExerciseDto;
  index: number;
}

export const ExerciseCard: FunctionComponent<TaskProps> = ({
  exercise,
  index,
}: TaskProps): JSX.Element => {
  const { id, exerciseType, effort, setsCount } = exercise;

  const [callingForm, setCallingForm] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCallingForm(true);
    setModalType('edit');
  };

  const handleView = () => {
    setCallingForm(true);
    setModalType('view');
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {({ draggableProps, dragHandleProps, innerRef }: DraggableProvided) => (
          <Card
            className={styles.wrapper}
            onClick={handleView}
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
              onClick={handleEdit}
              title="Edit exercise"
            >
              <Edit className={styles.actionButtonIcon} />
            </IconButton>
            <IconButton
              className={cn(styles.actionButton, styles.deleteButton)}
              color="error"
              size="small"
              onClick={handleDelete}
              title="Delete exercise"
            >
              <Delete className={styles.actionButtonIcon} />
            </IconButton>
          </Card>
        )}
      </Draggable>
      {/* {callingForm && modalType === 'edit' && (
        <ModalTasks
          type="edit exercis"
          setCallingForm={setCallingForm}
          taskId={taskId}
          boardId={boardId}
          columnId={columnId}
          titleEdit={title}
          descriptionEdit={description}
          users={users}
        />
      )} */}
      {/* {callingForm && modalType === 'view' && (
        <ModalTasks
          type="view exercis"
          setCallingForm={setCallingForm}
          taskId={taskId}
          boardId={boardId}
          columnId={columnId}
          titleEdit={title}
          descriptionEdit={description}
          users={users}
        />
      )} */}
    </>
  );
};
