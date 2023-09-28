import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { useAppDispatch } from '@redux/hooks';
import { login } from '@redux/reducers/userSlice';

const useApplication = () => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = localStorage.getItem('user');

        if (userData) {
          const user = JSON.parse(userData);
          dispatch(login(user));
        }
      } catch (error) {
        throw new Error(`An error occured when fetching user data: ${error}`);
      }
    };

    if (session) {
      getUserData();
    }
  }, [session, dispatch]);

  return { status };
};

export default useApplication;
