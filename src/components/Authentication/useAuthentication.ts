import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { createUser } from '@actions/user.actions';

const useAuthentication = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsEmailValid(isEmail(e.target.value));
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      createUser({
        username: username,
        email: email,
        email_verified: false,
        password: password,
      });
    } catch (err) {
      throw new Error(`An error occured during registration: ${err}`);
    }
  };

  return {
    username,
    email,
    isEmailValid,
    password,
    error,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    resetForm,
    handleRegister,
  };
};

export default useAuthentication;
