import { NextResponse } from 'next/server'
import { uploadFileToS3 } from '@/services/s3'

const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file: File | null = formData.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const result = await uploadFileToS3(file, bucket, 'banners')

    if (!result) {
      return NextResponse.json(
        { error: 'Erro ao enviar imagem' },
        { status: 400 }
      )
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
