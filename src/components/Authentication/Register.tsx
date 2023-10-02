import React, { useState, useRef } from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from '@actions/reCaptcha.actions';

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  isEmailValid: boolean;
  password: string;
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstName: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setLastName: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setEmail: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setPassword: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  submitForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const Register = ({
  firstName,
  lastName,
  email,
  isEmailValid,
  password,
  isVerified,
  setIsVerified,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  submitForm,
}: RegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
    <Grid container sx={{ width: '100%' }}>
      <Grid xs={12} md={6} sx={{ p: 0.5 }}>
        <FormControl fullWidth size="small" variant="outlined" sx={{ mt: 0.5 }}>
          <InputLabel htmlFor="outlined-first-name">First Name</InputLabel>
          <OutlinedInput
            id="outlined-first-name"
            type="text"
            onChange={setFirstName}
            value={firstName}
            label="First Name"
          />
        </FormControl>
      </Grid>
      <Grid xs={12} md={6} sx={{ p: 0.5 }}>
        <FormControl fullWidth size="small" variant="outlined" sx={{ mt: 0.5 }}>
          <InputLabel htmlFor="outlined-last-name">Last Name</InputLabel>
          <OutlinedInput
            id="outlined-last-name"
            type="text"
            onChange={setLastName}
            value={lastName}
            label="Last Name"
          />
        </FormControl>
      </Grid>
      <Grid xs={12} sx={{ p: 0.5 }}>
        <FormControl fullWidth size="small" variant="outlined" sx={{ mt: 0.5 }}>
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
      </Grid>
      <Grid xs={12} sx={{ p: 0.5 }}>
        <FormControl fullWidth sx={{ mt: 0.5 }} size="small" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
      </Grid>
      <Grid xs={12}>
        {isVerified && (
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={submitForm}
            sx={{ mt: 2, mb: 1 }}>
            Sign Up
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
      </Grid>
    </Grid>
  );
};

export default Register;
