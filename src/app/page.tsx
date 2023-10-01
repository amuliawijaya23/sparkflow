import {
  Unstable_Grid2 as Grid,
  Paper,
  Box,
  Typography,
  Avatar,
} from '@mui/material';

import Authentication from '@components/Authentication';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <Grid container component={Paper} sx={{ height: '100vh' }}>
      <Grid
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("/background.jpg")',
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
          <Avatar src="" alt="logo" sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography component="h1" variant="h4">
            SparkFlow
          </Typography>
          <Authentication />
        </Box>
      </Grid>
    </Grid>
  );
}
