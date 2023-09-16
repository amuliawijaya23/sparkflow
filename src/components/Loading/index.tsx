import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <CircularProgress />
    </Box>
  );
};
