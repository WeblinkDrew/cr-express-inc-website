import { put } from '@vercel/blob';

export interface UploadedFile {
  url: string;
  pathname: string;
  contentType: string;
  size: number;
  uploadedAt: Date;
}

/**
 * Upload a file to Vercel Blob storage
 *
 * @param file - File buffer or base64 string
 * @param filename - Original filename
 * @param folder - Storage folder (e.g., 'submissions/w9', 'submissions/onboarding')
 * @returns Upload metadata
 */
export async function uploadFile(
  file: Buffer | string,
  filename: string,
  folder: string
): Promise<UploadedFile> {
  // Convert base64 to buffer if needed
  const buffer = typeof file === 'string'
    ? Buffer.from(file, 'base64')
    : file;

  // Generate unique filename to prevent collisions
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  const pathname = `${folder}/${timestamp}_${sanitizedFilename}`;

  // Upload to Vercel Blob
  const blob = await put(pathname, buffer, {
    access: 'public',
    contentType: 'application/pdf',
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: blob.contentType || 'application/pdf',
    size: buffer.length,
    uploadedAt: new Date(),
  };
}

/**
 * Upload multiple files
 */
export async function uploadFiles(
  files: Array<{ buffer: Buffer | string; filename: string; folder: string }>
): Promise<UploadedFile[]> {
  return Promise.all(
    files.map(({ buffer, filename, folder }) =>
      uploadFile(buffer, filename, folder)
    )
  );
}

/**
 * Validate file size and type
 */
export function validateFile(
  buffer: Buffer | string,
  maxSizeBytes: number = 10 * 1024 * 1024 // 10MB default
): { valid: boolean; error?: string } {
  const fileBuffer = typeof buffer === 'string'
    ? Buffer.from(buffer, 'base64')
    : buffer;

  // Check size
  if (fileBuffer.length > maxSizeBytes) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${maxSizeBytes / 1024 / 1024}MB`,
    };
  }

  // Validate PDF magic bytes (%PDF-)
  const pdfHeader = fileBuffer.slice(0, 5).toString();
  if (pdfHeader !== '%PDF-') {
    return {
      valid: false,
      error: 'Invalid PDF file',
    };
  }

  return { valid: true };
}
