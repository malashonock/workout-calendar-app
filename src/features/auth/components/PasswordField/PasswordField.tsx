import { useState, FunctionComponent } from 'react';
import { fieldToTextField, TextFieldProps } from 'formik-mui';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { VisibilityOff, Visibility } from '@mui/icons-material';

export const PasswordField: FunctionComponent<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      {...fieldToTextField(props)}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
