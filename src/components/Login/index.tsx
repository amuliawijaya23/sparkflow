'use client';
import { Box, Typography, Avatar, Button, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

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

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      <Avatar src="" alt="logo" sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography component="h1" variant="h4">
        SparkFlow
      </Typography>
      <Typography component="h3" variant="h6">
        Sign in to start working.
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => router.push('/api/auth/login')}>
          Sign in
        </Button>
        <Box>
          <Box>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </Box>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Login;
