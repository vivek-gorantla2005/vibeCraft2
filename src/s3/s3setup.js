import { S3Client } from '@aws-sdk/client-s3';

export const client = new S3Client({
  forcePathStyle: true,
  region: 'ap-south-1',
  endpoint: 'https://olhjrzmgqynqjpdyuwxr.storage.supabase.co/storage/v1/s3',
  credentials: {
    accessKeyId:process.env.ACCESSKEYID,
    secretAccessKey:process.env.SECRETACCESSKEY,
  }
})
