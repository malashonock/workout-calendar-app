import { FunctionComponent, useEffect, useState } from 'react';
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { ExerciseDto } from 'common/model/dto';
import { columnsConfig } from './columnsConfig';
import { BoardColumnTree, buildColumnTrees } from './buildColumnTrees';
import { BoardColumn } from '../BoardColumn';
import { ExerciseService } from 'common/services';
import { selectAuthToken } from 'common/store';

import styles from './TrackerPage.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const TrackerPage: FunctionComponent = () => {
  const token = useSelector(selectAuthToken);
  const { date } = useParams();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const exercises = useLoaderData() as ExerciseDto[];

  const [columnTrees, setColumnTrees] = useState<BoardColumnTree[]>([]);
  useEffect(() => {
    setColumnTrees(buildColumnTrees(columnsConfig, exercises));
  }, [exercises]);

  const handleGotoPrevDay = (): void => {
    const prevDay = dayjs(date).add(-1, 'day').format('YYYY-MM-DD');
    navigate(`/tracker/${prevDay}`);
  };

  const handleGotoNextDay = (): void => {
    const nextDay = dayjs(date).add(+1, 'day').format('YYYY-MM-DD');
    navigate(`/tracker/${nextDay}`);
  };

  const handleDragEnd = async ({
    source,
    destination,
    type,
  }: DropResult): Promise<void> => {
    // dropped outside any valid droppable
    if (!destination) {
      return;
    }

    // dropped where drag started
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // dragged an exercise within the same column
    if (destination.droppableId === source.droppableId) {
      // TODO: reorder exercises within the column
      return;
    }

    // dragged an exercise between columns
    {
      const sourceColumn = columnTrees.find(
        (column) => column.status === source.droppableId,
      );
      const destinationColumn = columnTrees.find(
        (column) => column.status === destination.droppableId,
      );

      // TODO: reorder exercises within columns
      if (!sourceColumn || !destinationColumn) {
        // something went wrong
        return;
      }

      // Remove dragged exercise from source column
      const draggedExercise = sourceColumn.exercises.splice(source.index, 1)[0];

      // Append dragged exercise to destination column
      destinationColumn.exercises.push(draggedExercise);

      // update column trees state optimistically (assuming API will change ordering later)
      draggedExercise.status = destinationColumn.status;
      setColumnTrees(
        columnTrees.map((columnTree) => {
          if (columnTree.status === sourceColumn.status) {
            return { ...columnTree, exercises: sourceColumn.exercises };
          }

          if (columnTree.status === destinationColumn.status) {
            return { ...columnTree, exercises: destinationColumn.exercises };
          }

          return columnTree;
        }),
      );

      // sync status change with the server
      try {
        if (!token) {
          throw new Error('User not authenticated');
        }

        await ExerciseService.updateExercise(
          draggedExercise.id,
          {
            status: draggedExercise.status,
          },
          token,
        );

        revalidator.revalidate();
      } catch (error) {
        console.log(error);
      }

      // TODO: sync ordering
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper className={styles.wrapper}>
        <Box className={styles.header}>
          <IconButton onClick={handleGotoPrevDay}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography className={styles.date}>
            {dayjs(date).format('ddd, MMMM D, YYYY')}
          </Typography>
          <IconButton onClick={handleGotoNextDay}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
        <Stack direction="row" className={styles.board}>
          {columnTrees.map(
            ({ status, title, exercises }: BoardColumnTree): JSX.Element => (
              <BoardColumn
                key={status}
                status={status}
                title={title}
                exercises={exercises}
              />
            ),
          )}
        </Stack>
      </Paper>
    </DragDropContext>
  );
};
