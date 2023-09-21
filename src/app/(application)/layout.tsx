'use client';

import Sidebar from '@components/Sidebar';
import Loading from '@components/Loading';
import useUserData from '../../hooks/useUserData';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, error } = useUserData();

  return (
    <Sidebar>
      {isLoading && <Loading />}
      {!isLoading && children}
    </Sidebar>
  );
}
