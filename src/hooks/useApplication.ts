import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { useAppDispatch } from '@redux/hooks';
import { login } from '@redux/reducers/userSlice';
import { updateBoards } from '@redux/reducers/boardSlice';

import isURL from 'validator/lib/isURL';

import { getImageURL } from '@actions/s3.actions';
import { getBoards } from '@actions/board.actions';

const useApplication = () => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = localStorage.getItem('user');

        if (userData) {
          const user = JSON.parse(userData);
          if (user.picture && !isURL(user.picture)) {
            const imageURL = await getImageURL(user.picture);
            user.picture = imageURL;
          }

          dispatch(login(user));

          const boards = await getBoards(user._id);

          dispatch(updateBoards(boards));
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
