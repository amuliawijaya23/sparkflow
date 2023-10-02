import { useState } from 'react';

import { useAppSelector } from '@redux/hooks';
import { selectUser } from '@redux/reducers/userSlice';

import { uploadFile } from '@actions/upload.actions';

const useAccountForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const user = useAppSelector(selectUser);

  const submitHandler = async () => {
    if (image) {
      try {
        const data = new FormData();
        data.set('file', image);
        data.append('user', user._id);

        const res = await uploadFile(data);

        User.findOneAndUpdate({ email: user.email }, {});
      } catch (error) {}
    }
  };

  return { user, image, submitHandler, setImage };
};

export default useAccountForm;
