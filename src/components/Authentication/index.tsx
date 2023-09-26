'use client';
import { Box, Button, Alert } from '@mui/material';
import Login from './Login';
import Register from './Register';
import useAuthentication from './useAuthentication';
import { LOGIN, REGISTER } from './useAuthentication';

const Authentication = () => {
  const {
    form,
    username,
    email,
    isEmailValid,
    password,
    error,
    handleFormLogin,
    handleFormRegister,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  } = useAuthentication();

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
          isEmailValid={isEmailValid}
          password={password}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
        />
      )}
      {form === REGISTER && (
        <Register
          username={username}
          email={email}
          isEmailValid={isEmailValid}
          password={password}
          setUsername={handleUsernameChange}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
          submitForm={handleRegister}
        />
      )}
    </Box>
  );
};

export default Authentication;
