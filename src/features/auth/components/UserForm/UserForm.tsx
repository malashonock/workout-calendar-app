import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Avatar,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { PasswordField } from '..';
import * as yup from 'yup';

import { UserFields } from 'common/model/form-fields';

import styles from './UserForm.module.scss';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface UserFormProps<TValues extends Partial<UserFields> = UserFields> {
  avatar?: JSX.Element;
  title: string;
  initialValues: TValues;
  submit: {
    text: string;
    callback: (values: TValues) => Promise<void>;
  };
  auxLink?: {
    text: string;
    redirectTo: string;
  };
}

const nameValidation = { name: yup.string().required('Name is required') };
const emailValidation = {
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
};
const passwordValidation = {
  password: yup.string().required('Password is required'),
};

export const UserForm = <TValues extends Partial<UserFields> = UserFields>({
  avatar = <LockOutlinedIcon />,
  title,
  initialValues,
  submit,
  auxLink,
}: UserFormProps<TValues>): JSX.Element => {
  const { name, email, password } = initialValues;
  const validationSchema = yup.object(
    Object.assign(
      {},
      name !== undefined ? nameValidation : {},
      email !== undefined ? emailValidation : {},
      password !== undefined ? passwordValidation : {},
    ),
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: TValues, { setSubmitting }) => {
        await submit.callback(values);
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, errors, dirty }) => (
        <Container maxWidth="xs" sx={{ padding: '24px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>{avatar}</Avatar>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Form>
                <Grid container spacing={2}>
                  {initialValues.name !== undefined ? (
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="name"
                        label="Name"
                        fullWidth
                      />
                    </Grid>
                  ) : null}
                  {initialValues.email !== undefined ? (
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                      />
                    </Grid>
                  ) : null}
                  {initialValues.password !== undefined ? (
                    <Grid item xs={12}>
                      <Field
                        component={PasswordField}
                        name="password"
                        label="Password"
                        fullWidth
                      />
                    </Grid>
                  ) : null}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    Object.keys(errors).length > 0 || !dirty || isSubmitting
                  }
                  onClick={submitForm}
                >
                  {submit.text}
                </Button>
                {auxLink ? (
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link
                        component={RouterLink}
                        to={auxLink.redirectTo}
                        variant="body2"
                      >
                        {auxLink.text}
                      </Link>
                    </Grid>
                  </Grid>
                ) : null}
              </Form>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};
