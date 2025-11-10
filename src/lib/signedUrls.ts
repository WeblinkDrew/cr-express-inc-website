import crypto from 'crypto';

/**
 * Generate a signed URL with expiration for secure file downloads
 * @param submissionId - The submission ID
 * @param fileType - Type of file (onboarding, w9, etc.)
 * @param expiresInSeconds - How long the URL should be valid (default: 24 hours)
 * @returns Signed URL path with signature and expiration
 */
export function generateSignedUrl(
  submissionId: string,
  fileType: string,
  expiresInSeconds: number = 24 * 60 * 60 // 24 hours default
): string {
  const secret = process.env.DOWNLOAD_URL_SECRET;
  if (!secret) {
    throw new Error('DOWNLOAD_URL_SECRET environment variable is not set');
  }

  const expiresAt = Date.now() + (expiresInSeconds * 1000);
  const data = `${submissionId}:${fileType}:${expiresAt}`;
  const signature = crypto.createHmac('sha256', secret).update(data).digest('hex');

  return `/api/download/${submissionId}/${fileType}?expires=${expiresAt}&signature=${signature}`;
}

/**
 * Verify a signed URL is valid and not expired
 * @param submissionId - The submission ID
 * @param fileType - Type of file
 * @param expires - Expiration timestamp
 * @param signature - URL signature to verify
 * @returns true if valid and not expired, false otherwise
 */
export function verifySignedUrl(
  submissionId: string,
  fileType: string,
  expires: string,
  signature: string
): boolean {
  const secret = process.env.DOWNLOAD_URL_SECRET;
  if (!secret) {
    throw new Error('DOWNLOAD_URL_SECRET environment variable is not set');
  }

  // Check if expired
  const expiresAt = parseInt(expires);
  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  // Verify signature
  const data = `${submissionId}:${fileType}:${expires}`;
  const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
