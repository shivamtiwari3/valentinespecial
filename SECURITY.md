# 🔒 Security Guide for Valentine App

This document outlines the security measures implemented in this app and recommendations for production deployment.

## Security Measures Implemented

### 1. Input Validation & Sanitization
- **Partner Name**: Validated for length (max 30 chars) and allowed characters (alphanumeric, spaces, hyphens, apostrophes, periods)
- **Email Addresses**: Strict RFC-compliant validation with length limits
- **Valentine IDs**: Validated against expected nanoid format
- **Base64 Images**: Validated for format, size (2MB max), and encoding

### 2. XSS (Cross-Site Scripting) Prevention
- All user-provided content is sanitized before:
  - Rendering in HTML
  - Inclusion in emails
  - Storage in database
- HTML special characters are escaped: `& < > " ' /`

### 3. Rate Limiting
| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/create` | 10 requests | 1 minute |
| `/api/notification/subscribe` | 5 requests | 1 minute |
| `/api/notification/send` | 3 requests | 5 minutes |

⚠️ **Note**: Current rate limiting is in-memory. For production with multiple instances, use Redis.

### 4. Security Headers
The following headers are set on all responses:
- `Strict-Transport-Security`: Enforces HTTPS
- `X-Content-Type-Options: nosniff`: Prevents MIME sniffing
- `X-Frame-Options: SAMEORIGIN`: Prevents clickjacking
- `X-XSS-Protection: 1; mode=block`: Legacy XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin`: Controls referrer information
- `Permissions-Policy`: Disables camera, microphone, geolocation
- `Content-Security-Policy`: Restricts resource loading

### 5. API Protection
- Internal email notification API is protected by a secret token
- Content-Type validation on all endpoints
- Request body size limits (3MB max)
- Proper error handling that doesn't leak internal details

## Production Deployment Checklist

### Environment Variables
1. **Create environment variables in Vercel/your hosting provider**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
RESEND_API_KEY=re_your_api_key
INTERNAL_API_SECRET=your_random_32_char_secret
```

2. **Generate a secure INTERNAL_API_SECRET**:
```bash
openssl rand -hex 32
```

### Supabase Security
1. **Enable Row Level Security (RLS)** on the `valentines` table
2. Create appropriate policies:
```sql
-- Allow anyone to read valentines
CREATE POLICY "Anyone can read valentines" ON valentines
FOR SELECT USING (true);

-- Only allow inserts (not updates/deletes from client)
CREATE POLICY "Anyone can create valentines" ON valentines
FOR INSERT WITH CHECK (true);

-- Restrict updates to specific columns if needed
CREATE POLICY "Limited updates" ON valentines
FOR UPDATE USING (true)
WITH CHECK (true);
```

3. **API Key Restrictions**:
   - Use the `anon` key only (never expose `service_role`)
   - Consider using Supabase Edge Functions for sensitive operations

### Resend Email Security
1. **Verify your sending domain** at https://resend.com/domains
2. Set up SPF, DKIM, and DMARC records
3. Configure bounce and complaint webhooks

### Additional Recommendations

#### For High-Traffic Production:
1. **Use Redis for rate limiting**:
```typescript
// Install: npm install ioredis
import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL)
```

2. **Add CAPTCHA for form submission**:
   - Consider hCaptcha or Cloudflare Turnstile
   - Prevents automated abuse

3. **Monitor and Alert**:
   - Set up logging (Vercel Logs, LogRocket, Sentry)
   - Alert on unusual patterns (many 429s, 500s)

4. **Regular Security Audits**:
   - Run `npm audit` regularly
   - Update dependencies promptly
   - Review Supabase access logs

#### Database Considerations:
1. **Image Storage**: Consider using Supabase Storage or Cloudinary instead of storing base64 in database
2. **Data Retention**: Implement automatic cleanup of old valentines
3. **Backups**: Enable Supabase automated backups

## Security Contacts
If you discover a security vulnerability, please report it responsibly to the project maintainers.

## Changelog
- **v1.0.0** (2026-02-10): Initial security implementation
  - Added input validation and sanitization
  - Implemented rate limiting
  - Added security headers
  - Protected internal APIs
  - Created security documentation
