'use server';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import S3 from '@lib/S3';

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export const getImageURL = async (key: string) => {
  const getImageParam = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(getImageParam);
  const url = await getSignedUrl(S3, command, { expiresIn: 12 * 60 * 60 });
  return url;
};

export const uploadImage = async (data: FormData) => {
  const file: File | null = data.get('file') as unknown as File;
  const user: File | string | null = data.get('user');
  const date = new Date().toISOString();

  if (file) {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Body: buffer,
        Key: `images/${user}/${date} - ${file.name}`,
        ContentType: file.type,
      };
      const command = new PutObjectCommand(uploadParams);

      await S3.send(command);
      return { key: `images/${user}/${date} - ${file.name}`, type: file.type };
    } catch (error) {
      throw new Error(`An error occured while uploading file: ${error}`);
    }
  }
  return;
};
