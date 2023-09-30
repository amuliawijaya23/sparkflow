import React, { useState, useEffect } from 'react';

import { getUsers } from '@actions/user.actions';

interface User {
  _id: string;
  email: string;
}

const useBoardForm = () => {
  const [name, setName] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [team, setTeam] = useState<any>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUserList = async () => {
      const userList = await getUsers();
      const userOptions = userList.map((user) => {
        return { _id: user._id, email: user.email };
      });
      setUsers(userOptions);
    };

    getUserList();
  }, []);

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(e.target.value);
  };

  return { name, team, users, setTeam, handleChangeName };
};

export default useBoardForm;
