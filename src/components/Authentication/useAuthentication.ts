import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { createUser, findUser } from '@actions/user.actions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@redux/hooks';
import { login } from '@redux/reducers/userSlice';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

const useAuthentication = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<string>(LOGIN);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormLogin = () => {
    setForm(LOGIN);
    resetForm();
  };

  const handleFormRegister = () => {
    setForm(REGISTER);
    resetForm();
  };

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

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!isEmailValid) {
      setError('Please use a valid email address.');
      return;
    }

    let success = true;
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password.');
        return;
      }

      const user = await findUser(email);

      if (user !== undefined) {
        dispatch(
          login({
            _id: user['_id'],
            username: user['username'],
            email: user['email'],
            emailVerified: user['emailVerified'],
            picture: user['picture'],
          }),
        );
      }
    } catch (err) {
      success = false;
      throw new Error(`An error occured while signing in: ${err}`);
    }
    if (success) {
      router.push('/dashboard');
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!isEmailValid) {
      setError('Please use a valid email address.');
      return;
    }

    const user = await findUser(email);
    if (user !== undefined) {
      setError('A user with that email address already exists.');
      return;
    }
    let success = true;
    try {
      createUser({
        username: username,
        email: email,
        emailVerified: false,
        picture: '',
        password: password,
      });
    } catch (err) {
      success = false;
      throw new Error(`An error occured during registration: ${err}`);
    }
    if (success) {
      handleFormLogin();
    }
  };

  return {
    form,
    username,
    email,
    isEmailValid,
    password,
    error,
    handleFormLogin,
    handleFormRegister,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
    handleLogin,
  };
};

export default useAuthentication;
