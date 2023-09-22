'use client';

import Sidebar from '@components/Sidebar';
import Loading from '@components/Loading';
import useUserData from '../../hooks/useUserData';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, error } = useUserData();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <></>;
  }

  return <Sidebar>{children}</Sidebar>;
}
