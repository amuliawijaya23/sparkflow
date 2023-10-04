import React, { useState, useEffect } from 'react';

import { getUsers } from '@actions/user.actions';

import { useAppSelector } from '@redux/hooks';
import { selectUser } from '@redux/reducers/userSlice';

import { createBoard } from '@actions/board.actions';

interface User {
  _id: string;
  email: string;
}

const useBoardForm = () => {
  const user = useAppSelector(selectUser);

  const [name, setName] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [team, setTeam] = useState<any>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUserList = async () => {
      const userList = await getUsers();

      const userOptions = [];

      for (const u of userList) {
        if (u.email !== user?.email) {
          userOptions.push({ _id: u._id, email: u.email });
        }
      }
      setUsers(userOptions);
    };

    getUserList();
  }, [user?.email]);

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(e.target.value);
  };

  const handleCreateForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await createBoard({
      name: name,
      team: team,
      user: user?._id,
      logo: '',
    });
  };

  return { name, team, users, setTeam, handleChangeName, handleCreateForm };
};

export default useBoardForm;
