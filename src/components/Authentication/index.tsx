'use client';
import { useState } from 'react';
import { Box, Button, Alert } from '@mui/material';
import Login from './Login';
import Register from './Register';
import useAuthentication from './useAuthentication';

const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';

const Authentication = () => {
  const [form, setForm] = useState<string>(LOGIN);
  const {
    username,
    email,
    password,
    error,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    resetForm,
  } = useAuthentication();

  const handleFormLogin = () => {
    setForm(LOGIN);
    resetForm();
  };

  const handleFormRegister = () => {
    setForm(REGISTER);
    resetForm();
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '100%', md: '80%', xl: '50%' },
      }}>
      {error && (
        <Alert
          severity="error"
          variant="filled"
          sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          display: 'flex',
          mt: 1,
          mb: 1,
          border: 1,
          borderRadius: 1,
        }}>
        <Button
          color="primary"
          fullWidth
          variant={form === LOGIN ? 'contained' : 'outlined'}
          onClick={handleFormLogin}
          sx={{ borderRadius: 1, border: 0.5 }}>
          Login
        </Button>
        <Button
          color="primary"
          fullWidth
          variant={form === REGISTER ? 'contained' : 'outlined'}
          onClick={handleFormRegister}
          sx={{ borderRadius: 1, border: 0.5 }}>
          Register
        </Button>
      </Box>
      {form === LOGIN && (
        <Login
          email={email}
          password={password}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
        />
      )}
      {form === REGISTER && (
        <Register
          username={username}
          email={email}
          password={password}
          setUsername={handleUsernameChange}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
        />
      )}
    </Box>
  );
};

export default Authentication;