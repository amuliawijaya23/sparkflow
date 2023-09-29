'use client';
import { Box, Button, Alert, Typography, Link } from '@mui/material';
import Loading from '@components/Loading';
import Login from './Login';
import Register from './Register';
import useAuthentication from '@hooks/useAuthentication';
import { LOGIN, REGISTER } from '@hooks/useAuthentication';

const Authentication = () => {
  const {
    form,
    username,
    email,
    isEmailValid,
    password,
    error,
    loading,
    isVerified,
    handleFormLogin,
    handleFormRegister,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    setIsVerified,
    handleRegister,
    handleLogin,
  } = useAuthentication();

  const Copyright = () => {
    return (
      <Typography variant="body2" align="center" sx={{ mt: 5 }}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          SparkFlow
        </Link>
        {` ${new Date().getFullYear()}`}
        {'.'}
      </Typography>
    );
  };

  if (loading) {
    return (
      <Box sx={{ mt: 4 }}>
        <Loading />
      </Box>
    );
  }

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
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
          signIn={handleLogin}
        />
      )}
      {form === REGISTER && (
        <Register
          username={username}
          email={email}
          isEmailValid={isEmailValid}
          password={password}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          setUsername={handleUsernameChange}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
          submitForm={handleRegister}
        />
      )}
      <Copyright />
    </Box>
  );
};

export default Authentication;
