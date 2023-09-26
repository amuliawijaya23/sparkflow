import React, { useState } from 'react';
import {
  Button,
  Link,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginProps {
  email: string;
  isEmailValid: boolean;
  password: string;
  setEmail: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setPassword: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  signIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Login = ({
  email,
  isEmailValid,
  password,
  setEmail,
  setPassword,
  signIn,
}: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl size="small" variant="outlined" sx={{ mt: 1 }}>
        <InputLabel htmlFor="outlined-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-email"
          type="email"
          onChange={setEmail}
          value={email}
          label="Email"
          error={!isEmailValid && email.length > 0}
        />
        {!isEmailValid && email.length > 0 && (
          <FormHelperText>Please use a valid email address.</FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ mt: 1 }} size="small" variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={setPassword}
          value={password}
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        onClick={signIn}
        sx={{ mt: 2, mb: 1 }}>
        Sign In
      </Button>
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
    </>
  );
};

export default Login;
