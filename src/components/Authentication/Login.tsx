import React, { useState, useRef } from 'react';
import {
  Button,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from '@actions/reCaptcha.actions';

interface LoginProps {
  email: string;
  isEmailValid: boolean;
  password: string;
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setPassword: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  signIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const Login = ({
  email,
  isEmailValid,
  password,
  isVerified,
  setIsVerified,
  setEmail,
  setPassword,
  signIn,
}: LoginProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleCaptchaSubmission = async (token: string | null) => {
    let success = true;
    try {
      await verifyCaptcha(token);
    } catch (err) {
      success = false;
      setIsVerified(false);
    }
    if (success) {
      setIsVerified(true);
    }
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
      {isVerified && (
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          onClick={signIn}
          disabled={!isVerified}
          sx={{ mt: 2, mb: 1 }}>
          Sign In
        </Button>
      )}
      {!isVerified && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            ref={reCaptchaRef}
            onChange={handleCaptchaSubmission}
          />
        </Box>
      )}
    </>
  );
};

export default Login;
