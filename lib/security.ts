// Security utilities for production-ready Valentine app

/**
 * Sanitize text content to prevent XSS attacks
 * Escapes HTML special characters
 */
export function sanitizeText(input: string): string {
    if (!input) return '';
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize partner name
 * Returns sanitized name or null if invalid
 */
export function sanitizePartnerName(name: string): { valid: boolean; sanitized: string; error?: string } {
    if (!name || typeof name !== 'string') {
        return { valid: false, sanitized: '', error: 'Name is required' };
    }

    const trimmed = name.trim();

    if (!trimmed) {
        return { valid: false, sanitized: '', error: 'Name is required' };
    }

    if (trimmed.length > 30) {
        return { valid: false, sanitized: '', error: 'Name must be 30 characters or less' };
    }

    // Only allow alphanumeric, spaces, and common name characters
    const nameRegex = /^[a-zA-Z0-9\s\-'.]+$/;
    if (!nameRegex.test(trimmed)) {
        return { valid: false, sanitized: '', error: 'Name contains invalid characters' };
    }

    return { valid: true, sanitized: sanitizeText(trimmed) };
}

/**
 * Validate email format strictly
 */
export function validateEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;

    const trimmed = email.trim().toLowerCase();

    // More strict email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(trimmed)) return false;
    if (trimmed.length > 254) return false; // RFC 5321 limit

    return true;
}

/**
 * Validate Valentine ID format
 */
export function validateValentineId(id: string): boolean {
    if (!id || typeof id !== 'string') return false;

    // nanoid generates alphanumeric IDs
    const idRegex = /^[a-zA-Z0-9_-]{8}$/;
    return idRegex.test(id);
}

/**
 * Simple in-memory rate limiter
 * In production, use Redis or similar for distributed rate limiting
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetIn: number;
}

export function checkRateLimit(
    identifier: string,
    maxRequests: number = 10,
    windowMs: number = 60000 // 1 minute
): RateLimitResult {
    const now = Date.now();
    const key = identifier;

    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
        // New window
        rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
    }

    if (record.count >= maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: record.resetTime - now
        };
    }

    record.count += 1;
    return {
        allowed: true,
        remaining: maxRequests - record.count,
        resetIn: record.resetTime - now
    };
}

// Clean up old rate limit entries periodically (only in long-running environments)
// In serverless, the cleanup happens naturally when the function cold starts
if (typeof globalThis !== 'undefined' && typeof setInterval !== 'undefined') {
    // Only set up interval if not already set (to prevent duplicates in hot reloads)
    const CLEANUP_INTERVAL_KEY = '__rate_limit_cleanup_interval__';
    if (!(globalThis as Record<string, unknown>)[CLEANUP_INTERVAL_KEY]) {
        (globalThis as Record<string, unknown>)[CLEANUP_INTERVAL_KEY] = setInterval(() => {
            const now = Date.now();
            for (const [key, record] of rateLimitStore.entries()) {
                if (now > record.resetTime) {
                    rateLimitStore.delete(key);
                }
            }
        }, 60000); // Clean every minute
    }
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    return 'unknown';
}

/**
 * Validate base64 image data
 */
export function validateBase64Image(data: string): { valid: boolean; error?: string } {
    if (!data || typeof data !== 'string') {
        return { valid: false, error: 'Image data is required' };
    }

    // Check if it's a valid data URL
    const dataUrlRegex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/i;
    if (!dataUrlRegex.test(data)) {
        return { valid: false, error: 'Invalid image format. Only JPEG, PNG, GIF, WebP allowed.' };
    }

    // Extract base64 content
    const base64Content = data.split(',')[1];
    if (!base64Content) {
        return { valid: false, error: 'Invalid base64 data' };
    }

    // Check size (2MB max in base64 is ~2.7MB string)
    if (base64Content.length > 2.7 * 1024 * 1024) {
        return { valid: false, error: 'Image must be less than 2MB' };
    }

    // Validate base64 format
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    if (!base64Regex.test(base64Content)) {
        return { valid: false, error: 'Invalid base64 encoding' };
    }

    return { valid: true };
}

/**
 * Create secure response headers
 */
export function getSecurityHeaders(): HeadersInit {
    return {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    };
}
