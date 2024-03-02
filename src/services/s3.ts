import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createId } from '@paralleldrive/cuid2'

type folder = 'logos' | 'banners' | 'offers'

const region = process.env.NEXT_PUBLIC_AWS_REGION

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadFileToS3(
  file: File,
  bucket: string,
  folder: folder
) {
  const fileBuffer = Buffer.from(await file.arrayBuffer())
  const fileKey = createId()

  const result = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: `${folder}/${fileKey}`,
      Body: fileBuffer,
      ContentType: file.type,
      // ACL: 'public-read',
    })
  )

  if (result) {
    const imageURL = `https://${bucket}.s3.${region}.amazonaws.com/${folder}/${fileKey}`

    return { imageURL, fileKey }
  }
}
