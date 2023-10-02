import { S3Client } from '@aws-sdk/client-s3';

const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION ?? '';
const AWS_BUCKET_ACCESS_KEY = process.env.AWS_BUCKET_ACCESS_KEY ?? '';
const AWS_BUCKET_SECRET_KEY = process.env.AWS_BUCKET_SECRET_KEY ?? '';

const S3 = new S3Client({
  credentials: {
    accessKeyId: AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: AWS_BUCKET_SECRET_KEY,
  },
  region: AWS_BUCKET_REGION,
});

export default S3;
