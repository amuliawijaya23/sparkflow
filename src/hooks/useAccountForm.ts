import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { login } from '@redux/reducers/userSlice';
import { selectUser } from '@redux/reducers/userSlice';

import { uploadImage, getImageURL } from '@actions/s3.actions';

import { updateUser } from '@actions/user.actions';

import isURL from 'validator/lib/isURL';

const useAccountForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [error, setError] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null | undefined>(null);
  const [linkedIn, setLinkedIn] = useState<string | undefined>('');
  const [isLinkedInURL, setIsLinkedInURL] = useState<boolean>(false);
  const [instagram, setInstagram] = useState<string | undefined>('');
  const [isInstagramURL, setIsInstagramURL] = useState<boolean>(false);
  const [twitter, setTwitter] = useState<string | undefined>('');
  const [isTwitterURL, setIsTwitterURL] = useState<boolean>(false);
  const [github, setGithub] = useState<string | undefined>('');
  const [isGithubURL, setIsGithubURL] = useState<boolean>(false);

  useEffect(() => {
    const initializeForm = () => {
      setFirstName(user.firstName);
      setLastName(user.lastName);

      if (user.dateOfBirth) {
        setDateOfBirth(new Date(user.dateOfBirth));
      }
      if (user.linkedIn) {
        setLinkedIn(user.linkedIn);
      }
      if (user.instagram) {
        setInstagram(user.instagram);
      }
      if (user.twitter) {
        setTwitter(user.twitter);
      }
      if (user.github) {
        setGithub(user.github);
      }
    };

    if (user) {
      initializeForm();
    }
  }, [user]);

  const handleFirstNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLastName(e.target.value);
  };

  const handleDateOfBirthChange = (value: Date | null) => {
    setDateOfBirth(value);
  };

  const handleLinkedInChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsLinkedInURL(isURL(e.target.value));
    setLinkedIn(e.target.value);
  };

  const handleInstagramChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsInstagramURL(isURL(e.target.value));
    setInstagram(e.target.value);
  };

  const handleTwitterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsTwitterURL(isURL(e.target.value));
    setTwitter(e.target.value);
  };

  const handleGithubChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsGithubURL(isURL(e.target.value));
    setGithub(e.target.value);
  };

  const submitHandler = async () => {
    if (!firstName) {
      setError('First Name cannot be blank.');
    }

    if (
      (linkedIn && !isLinkedInURL) ||
      (instagram && !isInstagramURL) ||
      (twitter && !isTwitterURL) ||
      (github && !isGithubURL)
    ) {
      setError('Please enter a valid url for social profile.');
    }

    const userData = { ...user };

    if (image) {
      try {
        const data = new FormData();
        data.set('file', image);
        data.append('user', user._id);

        const result = await uploadImage(data);

        if (result) {
          userData.picture = result.key;
        }
      } catch (err) {
        throw new Error(`An error occured when uploading file: ${err}`);
      }
    }

    userData.firstName = firstName;
    userData.lastName = lastName;
    if (dateOfBirth) {
      userData.dateOfBirth = dateOfBirth;
    }
    userData.linkedIn = linkedIn;
    userData.instagram = instagram;
    userData.twitter = twitter;
    userData.github = github;

    try {
      await updateUser(user.email, userData);
      localStorage.clear();
      if (image) {
        const imageURL = await getImageURL(userData.picture);
        userData.picture = imageURL;
      }
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(login(userData));
    } catch (err) {
      throw new Error(`An error occured while updating user data: ${err}`);
    }
    return;
  };

  const resetForm = () => {
    setImage(null);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    user.dateOfBirth
      ? setDateOfBirth(new Date(user.dateOfBirth))
      : setDateOfBirth(null);
    user.linkedIn ? setLinkedIn(user.linkedIn) : setLinkedIn('');
    user.instagram ? setInstagram(user.instagram) : setInstagram('');
    user.twitter ? setTwitter(user.twitter) : setTwitter('');
    user.github ? setGithub(user.github) : setGithub('');
  };

  return {
    user,
    image,
    firstName,
    lastName,
    dateOfBirth,
    linkedIn,
    instagram,
    twitter,
    github,
    isLinkedInURL,
    isInstagramURL,
    isTwitterURL,
    isGithubURL,
    error,
    submitHandler,
    setImage,
    handleFirstNameChange,
    handleLastNameChange,
    handleDateOfBirthChange,
    handleLinkedInChange,
    handleInstagramChange,
    handleTwitterChange,
    handleGithubChange,
    resetForm,
  };
};

export default useAccountForm;
