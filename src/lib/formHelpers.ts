/**
 * Common helper functions for form submission routes
 */

/**
 * Format phone number to +1 123 456 7890 format for ClickUp
 */
export function formatPhoneForClickUp(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Take last 10 digits (in case country code is included)
  const last10 = cleaned.slice(-10);

  // Format as +1 XXX XXX XXXX
  if (last10.length === 10) {
    return `+1 ${last10.slice(0, 3)} ${last10.slice(3, 6)} ${last10.slice(6)}`;
  }

  // Return original if not 10 digits
  return phone;
}

/**
 * Verify reCAPTCHA v3 token
 *
 * @param token - reCAPTCHA token from client
 * @param minScore - Minimum score required (default: 0.3)
 * @returns Object with success status and optional error message
 */
export async function verifyRecaptcha(
  token: string,
  minScore: number = 0.3
): Promise<{ success: boolean; score?: number; error?: string }> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const result = await response.json();

    console.log('reCAPTCHA result:', {
      success: result.success,
      score: result.score,
      action: result.action,
    });

    if (!result.success) {
      const errorMessage = result['error-codes']?.[0] === 'invalid-input-response'
        ? 'reCAPTCHA token is invalid or expired. Please refresh the page and try again.'
        : `reCAPTCHA verification failed: ${result['error-codes']?.join(', ') || 'Unknown error'}`;

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Check score (if present - v3 only)
    if (result.score !== undefined && result.score < minScore) {
      console.error('❌ reCAPTCHA score too low:', result.score);
      return {
        success: false,
        score: result.score,
        error: 'Security verification failed. Please try again.',
      };
    }

    console.log(`✅ reCAPTCHA passed (score: ${result.score})`);
    return {
      success: true,
      score: result.score,
    };
  } catch (error) {
    console.error('❌ reCAPTCHA error:', error);
    return {
      success: false,
      error: 'Failed to verify reCAPTCHA. Please try again.',
    };
  }
}
