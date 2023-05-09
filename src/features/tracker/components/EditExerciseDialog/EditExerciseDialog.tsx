import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import {
  ExerciseFormDialog,
  ExerciseFormValues,
  findExerciseTypeById,
} from '..';
import { useAuth } from 'features/auth/hooks';
import { useExerciseTypes } from '../../hooks';
import { DialogProps, ExerciseStatus } from 'common/types';
import { ExerciseService } from 'common/services';
import { ExerciseDto } from 'common/model/dto';

interface EditExerciseDialogProps extends DialogProps {
  exercise: ExerciseDto;
}

export const EditExerciseDialog: FunctionComponent<EditExerciseDialogProps> = ({
  exercise,
  open,
  onClose,
}) => {
  const { token } = useAuth();
  const exerciseTypes = useExerciseTypes();
  const { date } = useParams();

  return (
    <ExerciseFormDialog
      open={open}
      onClose={onClose}
      title="Edit exercise"
      initialValues={{
        exerciseTypeId: exercise.exerciseType.id,
        effort: exercise.effort,
        setsCount: exercise.setsCount,
      }}
      submit={{
        text: 'Save',
        callback: async (updatedExerciseData: ExerciseFormValues) => {
          try {
            if (!token) {
              throw new Error('User not authenticated');
            }

            if (!date) {
              throw new Error('Date not specified');
            }

            const { exerciseTypeId, effort, setsCount } = updatedExerciseData;

            if (effort === '') {
              throw new Error('Effort not specified');
            }

            if (setsCount === '') {
              throw new Error('Sets count not specified');
            }

            await ExerciseService.updateExercise(
              exercise.id,
              {
                exerciseTypeId,
                effort,
                setsCount: findExerciseTypeById(exerciseTypes, exerciseTypeId)
                  ?.withSets
                  ? setsCount
                  : undefined,
              },
              token,
            );

            onClose();
          } catch (error) {
            console.log(error);
          }
        },
      }}
    />
  );
};
