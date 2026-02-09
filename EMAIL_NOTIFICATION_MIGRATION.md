# Database Migration: Email Notifications

## Overview
This migration adds optional email notification support to the valentines table.

## Required Database Changes

You need to add two new columns to the `valentines` table in Supabase:

### 1. Via Supabase Dashboard (SQL Editor)

Go to your Supabase project → SQL Editor → New Query, and run:

```sql
-- Add notification_email column
ALTER TABLE valentines
ADD COLUMN notification_email TEXT;

-- Add email_notified column (tracks if notification was sent)
ALTER TABLE valentines
ADD COLUMN email_notified BOOLEAN DEFAULT false;

-- Add index for performance
CREATE INDEX idx_valentines_notification_email 
ON valentines(notification_email) 
WHERE notification_email IS NOT NULL;
```

### 2. Via Supabase Dashboard (Table Editor)

Alternatively, you can add columns manually:

1. Go to Table Editor → `valentines` table
2. Click "Add Column"
3. Add these columns:
   - **Column 1:**
     - Name: `notification_email`
     - Type: `text`
     - Default Value: (leave empty)
     - Is Nullable: ✅ Yes
   
   - **Column 2:**
     - Name: `email_notified`
     - Type: `boolean`
     - Default Value: `false`
     - Is Nullable: ✅ Yes

## Email Service Setup (Resend)

### 1. Sign up for Resend
- Go to https://resend.com
- Sign up for a free account (100 emails/day free)

### 2. Get API Key
- Go to https://resend.com/api-keys
- Click "Create API Key"
- Copy the API key

### 3. Add to Environment Variables
Update your `.env.local` file:
```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

### 4. Verify Domain (Optional, for production)
For production, you'll want to verify your own domain:
1. Go to https://resend.com/domains
2. Add your domain
3. Add DNS records as instructed
4. Update the `from` field in `/app/api/notification/send/route.ts`:
   ```typescript
   from: 'Valentine Special <notifications@yourdomain.com>'
   ```

## Testing

### Test the Email Notification Flow:

1. Create a new valentine
2. On the success page, enter your email
3. Click "Notify Me"
4. Open the valentine link in an incognito/private window
5. Check your email for the notification

### Development Testing:
During development, Resend allows sending to any email using their dev domain.

## Rollback (if needed)

If you need to remove these features:

```sql
-- Remove columns
ALTER TABLE valentines
DROP COLUMN notification_email,
DROP COLUMN email_notified;

-- Remove index
DROP INDEX IF EXISTS idx_valentines_notification_email;
```

## Production Checklist

- [ ] Database columns added
- [ ] Resend account created
- [ ] API key added to production environment variables
- [ ] Domain verified in Resend (optional but recommended)
- [ ] Test email notification flow
- [ ] Update `from` email address to your verified domain
- [ ] Set correct `NEXT_PUBLIC_APP_URL` in production env

## Privacy & GDPR Compliance

The email addresses are:
- Only used for one-time notifications
- Not shared with third parties
- Can be deleted by removing the valentine
- Users must explicitly opt-in

Consider adding a privacy policy link if deploying to production.
