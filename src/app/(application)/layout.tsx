'use client';
import Box from '@mui/material/Box';
import Navigation from '@components/Navigation';
import Loading from '@components/Loading';

import useApplication from '@hooks/useApplication';

import { redirect } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useApplication();

  const randomColor = (() => {
    const hex = Math.floor(Math.random() * 0xffffff);
    const color = '#' + hex.toString(16);

    return color;
  })();

  if (status === 'loading') {
    return (
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <Loading />
      </Box>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/');
  }

  return <Navigation avatarColor={randomColor}>{children}</Navigation>;
}
