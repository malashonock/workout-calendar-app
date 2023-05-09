import {
  Button,
  Grid,
  Box,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import * as yup from 'yup';

import { ExerciseTypeDto } from 'common/model/dto';
import { DialogProps } from 'common/types';
import { useExerciseTypes } from 'features/tracker/hooks';

import styles from './ExerciseFormDialog.module.scss';

export interface ExerciseFormValues {
  exerciseTypeId: string;
  effort: number | '';
  setsCount?: number | '';
}

interface ExerciseFormDialogProps extends DialogProps {
  title: string;
  initialValues: ExerciseFormValues;
  submit: {
    text: string;
    callback: (values: ExerciseFormValues) => Promise<void>;
  };
}

const exerciseTypeValidation = yup
  .string()
  .required('Exercise type is required');
const effortValidation = yup
  .number()
  .positive()
  .required('Effort estimate is required');
const setsCountValidation = yup
  .number()
  .positive()
  .required('Sets count is required');

export const findExerciseTypeById = (
  exerciseTypes: ExerciseTypeDto[],
  id: string,
): ExerciseTypeDto | undefined => {
  return exerciseTypes.find(
    (exerciseType: ExerciseTypeDto): boolean => exerciseType.id === id,
  );
};

export const ExerciseFormDialog = ({
  open,
  onClose,
  title,
  initialValues,
  submit,
}: ExerciseFormDialogProps): JSX.Element => {
  const validationSchema = yup.object(
    Object.assign(
      {
        exerciseTypeId: exerciseTypeValidation,
        effort: effortValidation,
      },
      initialValues.setsCount !== undefined ? setsCountValidation : {},
    ),
  );

  const exerciseTypes = useExerciseTypes();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: ExerciseFormValues, { setSubmitting }) => {
        await submit.callback(values);
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, values, errors, dirty }) => (
        <Dialog open={open} onClose={onClose}>
          <Box className={styles.wrapper}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 0,
                }}
              >
                <Box sx={{ mt: 3 }}>
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          component={Select}
                          name="exerciseTypeId"
                          label="Exercise type"
                          formControl={{ fullWidth: true }}
                        >
                          {exerciseTypes.map(
                            (exerciseType: ExerciseTypeDto): JSX.Element => (
                              <MenuItem
                                key={exerciseType.id}
                                value={exerciseType.id}
                              >
                                {exerciseType.name}
                              </MenuItem>
                            ),
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          name="effort"
                          label={`Effort, ${
                            findExerciseTypeById(
                              exerciseTypes,
                              values.exerciseTypeId,
                            )?.unitOfEffort || 'reps'
                          }`}
                          fullWidth
                        />
                      </Grid>
                      {findExerciseTypeById(
                        exerciseTypes,
                        values.exerciseTypeId,
                      )?.withSets ? (
                        <Grid item xs={12}>
                          <Field
                            component={TextField}
                            name="setsCount"
                            label="Sets count"
                            fullWidth
                          />
                        </Grid>
                      ) : null}
                    </Grid>
                  </Form>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 || !dirty || isSubmitting
                }
                onClick={submitForm}
              >
                {submit.text}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </Formik>
  );
};
