import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { createUser, findUser } from '@actions/user.actions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

const useAuthentication = () => {
  const router = useRouter();

  const [form, setForm] = useState<string>(LOGIN);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
    setIsVerified(false);
  };

  const handleFormLogin = () => {
    setForm(LOGIN);
    resetForm();
  };

  const handleFormRegister = () => {
    setForm(REGISTER);
    resetForm();
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
    setError('');
    setLoading(true);
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required.');
      setLoading(false);
      setIsVerified(false);
      return;
    }

    if (!isEmailValid) {
      setError('Please use a valid email address.');
      setLoading(false);
      setIsVerified(false);
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
        setIsVerified(false);
        setLoading(false);
        return;
      }
    } catch (err) {
      success = false;
      setIsVerified(false);
      setLoading(false);
      throw new Error(`An error occured while signing in: ${err}`);
    }
    if (success) {
      const user = await findUser(email);
      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: user?._id,
          username: user?.username,
          email: user?.email,
          emailVerified: user?.emailVerified,
          picture: user?.picture,
        }),
      );
      router.push('/dashboard');
      setIsVerified(false);
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setError('');
    setLoading(true);
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      setIsVerified(false);
      setLoading(false);
      return;
    }

    if (!isEmailValid) {
      setError('Please use a valid email address.');
      setIsVerified(false);
      setLoading(false);
      return;
    }

    const user = await findUser(email);
    if (user !== undefined) {
      setError('A user with that email address already exists.');
      setIsVerified(false);
      setLoading(false);
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
      setIsVerified(false);
      setLoading(false);
      throw new Error(`An error occured during registration: ${err}`);
    }
    if (success) {
      handleFormLogin();
      setLoading(false);
    }
  };

  return {
    form,
    username,
    email,
    isEmailValid,
    password,
    isVerified,
    error,
    loading,
    handleFormLogin,
    handleFormRegister,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    setIsVerified,
    handleRegister,
    handleLogin,
  };
};

export default useAuthentication;
