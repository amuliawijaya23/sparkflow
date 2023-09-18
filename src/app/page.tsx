'use client';
import {
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Link,
} from '@mui/material';

import { useRouter } from 'next/navigation';

export default function Home() {
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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        xs={false}
        sm={4}
        md={7}
        sx={{
          // backgroundImage: '',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <Avatar
            // src={'/17.png'}
            alt="logo"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
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
            <Grid container>
              <Grid xs={12}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
