import React, { useState, useEffect } from 'react';

import { getUsers } from '@actions/user.actions';
import { useSession } from 'next-auth/react';

interface User {
  _id: string;
  email: string;
}

const useBoardForm = () => {
  const [name, setName] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [team, setTeam] = useState<any>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const getUserList = async () => {
      const userList = await getUsers();

      const userOptions = [];

      for (const u of userList) {
        if (u.email !== session?.user?.email) {
          userOptions.push({ _id: u._id, email: u.email });
        }
      }
      setUsers(userOptions);
    };

    getUserList();
  }, [session?.user?.email]);

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(e.target.value);
  };

  const handleCreateForm = () => {};

  return { name, team, users, setTeam, handleChangeName, handleCreateForm };
};

export default useBoardForm;
