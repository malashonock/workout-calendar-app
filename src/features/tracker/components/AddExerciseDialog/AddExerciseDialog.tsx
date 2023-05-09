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

import styles from './AddExerciseDialog.module.scss';

interface AddExerciseDialogProps extends DialogProps {
  status: ExerciseStatus;
}

export const AddExerciseDialog: FunctionComponent<AddExerciseDialogProps> = ({
  status,
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
      title="Add exercise"
      initialValues={{
        exerciseTypeId: exerciseTypes[0]?.id || '',
        effort: '',
        setsCount: exerciseTypes[0]?.withSets ? '' : undefined,
      }}
      submit={{
        text: 'Save',
        callback: async (newExerciseData: ExerciseFormValues) => {
          try {
            if (!token) {
              throw new Error('User not authenticated');
            }

            if (!date) {
              throw new Error('Date not specified');
            }

            const { exerciseTypeId, effort, setsCount } = newExerciseData;

            if (effort === '') {
              throw new Error('Effort not specified');
            }

            if (setsCount === '') {
              throw new Error('Sets count not specified');
            }

            await ExerciseService.createExercise(
              {
                date,
                exerciseTypeId,
                status,
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
