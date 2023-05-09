import { FunctionComponent } from 'react';

import { ConfirmDialog, ConfirmDialogProps } from 'common/components';

type ConfirmDeleteExerciseDialogProps = Pick<
  ConfirmDialogProps,
  'open' | 'onClose'
>;

export const ConfirmDeleteExerciseDialog: FunctionComponent<
  ConfirmDeleteExerciseDialogProps
> = ({ open, onClose }) => {
  return (
    <ConfirmDialog
      title="Delete exercise"
      message="Are you sure you want to delete this exercise?"
      open={open}
      onClose={(choice: boolean) => onClose(choice)}
    />
  );
};
