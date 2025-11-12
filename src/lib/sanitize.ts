/**
 * Input Sanitization Utility
 *
 * Sanitizes user inputs to prevent XSS attacks while preserving safe content.
 * Uses simple string manipulation that works in all environments.
 */

/**
 * Escape HTML entities to prevent XSS
 */
function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'\/]/g, (match) => htmlEscapes[match]);
}

/**
 * Remove all HTML tags from a string
 */
function stripHtmlTags(str: string): string {
  // Remove script tags and their content entirely
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove style tags and their content
  str = str.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Remove all other HTML tags but keep content
  str = str.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  str = str.replace(/&nbsp;/g, ' ')
           .replace(/&amp;/g, '&')
           .replace(/&lt;/g, '<')
           .replace(/&gt;/g, '>')
           .replace(/&quot;/g, '"')
           .replace(/&#x27;/g, "'")
           .replace(/&#x2F;/g, '/');

  return str.trim();
}

/**
 * Sanitize a string input to remove potentially dangerous HTML/JS
 *
 * @param input - The string to sanitize
 * @param allowBasicFormatting - Allow basic HTML tags like <b>, <i>, <p> (default: false)
 * @returns Sanitized string
 */
export function sanitizeString(input: string | null | undefined, allowBasicFormatting: boolean = false): string {
  if (!input) return '';

  // Convert to string if needed
  const str = String(input);

  // Strip HTML tags first
  const stripped = stripHtmlTags(str);

  // For plain text, also escape any remaining HTML entities
  if (!allowBasicFormatting) {
    return escapeHtml(stripped);
  }

  return stripped;
}

/**
 * Sanitize an email address
 * Strips HTML and validates basic email format
 */
export function sanitizeEmail(email: string | null | undefined): string {
  if (!email) return '';

  // First sanitize to remove any HTML
  const cleaned = sanitizeString(email).trim().toLowerCase();

  // Basic email validation (not comprehensive, just safety check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleaned)) {
    // If it doesn't look like an email, return empty string
    // This prevents injection attacks via malformed emails
    return '';
  }

  return cleaned;
}

/**
 * Sanitize a phone number
 * Strips everything except digits, +, -, (, ), and spaces
 */
export function sanitizePhone(phone: string | null | undefined): string {
  if (!phone) return '';

  // Remove any HTML first
  const cleaned = sanitizeString(phone);

  // Keep only valid phone number characters
  return cleaned.replace(/[^0-9+\-() ]/g, '').trim();
}

/**
 * Sanitize a URL
 * Ensures URL is safe and uses allowed protocols
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url) return '';

  // Remove any HTML
  const cleaned = sanitizeString(url).trim();

  // Only allow http, https, and mailto protocols
  try {
    const parsed = new URL(cleaned);
    if (['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
      return cleaned;
    }
  } catch {
    // Invalid URL
    return '';
  }

  return '';
}

/**
 * Sanitize an object recursively
 * Applies sanitization to all string values in an object
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  allowBasicFormatting: boolean = false
): T {
  const sanitized = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      sanitized[key as keyof T] = value;
    } else if (typeof value === 'string') {
      // Special handling for known fields
      if (key.toLowerCase().includes('email')) {
        sanitized[key as keyof T] = sanitizeEmail(value) as any;
      } else if (key.toLowerCase().includes('phone')) {
        sanitized[key as keyof T] = sanitizePhone(value) as any;
      } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('website')) {
        sanitized[key as keyof T] = sanitizeUrl(value) as any;
      } else {
        sanitized[key as keyof T] = sanitizeString(value, allowBasicFormatting) as any;
      }
    } else if (Array.isArray(value)) {
      // Sanitize arrays
      sanitized[key as keyof T] = value.map(item =>
        typeof item === 'string' ? sanitizeString(item, allowBasicFormatting) : item
      ) as any;
    } else if (typeof value === 'object') {
      // Recursively sanitize nested objects
      sanitized[key as keyof T] = sanitizeObject(value, allowBasicFormatting) as any;
    } else {
      // Numbers, booleans, etc. - pass through
      sanitized[key as keyof T] = value;
    }
  }

  return sanitized;
}

/**
 * Sanitize form data specifically
 * Applies strict sanitization rules for form submissions
 */
export function sanitizeFormData(formData: Record<string, any>): Record<string, any> {
  return sanitizeObject(formData, false); // No HTML allowed in form data
}