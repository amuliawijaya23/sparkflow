import { Unstable_Grid2 as Grid, Paper } from '@mui/material';
import { redirect } from 'next/navigation';

import Login from '@components/Login';

export default async function Home() {
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
        <Login />
      </Grid>
    </Grid>
  );
}
