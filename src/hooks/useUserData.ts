import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAppDispatch } from '@redux/hooks';
import { login } from '@redux/reducers/userSlice';
// import { User } from '@redux/reducers/userSlice';
import { UserProfile } from '@auth0/nextjs-auth0/client';

const useUserData = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useEffect');
    const getUserData = (data: UserProfile) => {
      dispatch(login(data));
    };

    if (user) {
      getUserData(user);
    }
  }, [dispatch, user]);

  return {
    error,
    isLoading,
  };
};

export default useUserData;
