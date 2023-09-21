import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAppDispatch } from '@redux/hooks';
import { login } from '@redux/reducers/userSlice';
import { UserProfile } from '@auth0/nextjs-auth0/client';

import { useRouter } from 'next/navigation';

const useUserData = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const getUserData = (data: UserProfile) => {
      dispatch(login(data));
    };

    if (user) {
      getUserData(user);
    } else {
      router.push('/');
    }
  }, [dispatch, router, user]);

  return {
    error,
    isLoading,
  };
};

export default useUserData;
