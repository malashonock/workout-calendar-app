import { FunctionComponent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: (choice: boolean) => void;
  title: string;
  message?: string;
  yesBtnText?: string;
  noBtnText?: string;
}

export const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({
  open,
  onClose,
  title,
  message,
  yesBtnText = 'Yes',
  noBtnText = 'No',
}) => {
  const handleYes = () => {
    onClose(true);
  };

  const handleNo = () => {
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo}>{noBtnText}</Button>
        <Button onClick={handleYes} autoFocus>
          {yesBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
