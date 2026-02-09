# Email Notification Testing Guide 📬

Complete step-by-step guide to test the email notification feature.

---

## ✅ Prerequisites Checklist

Before testing, make sure you've completed these steps:

- [ ] Added database columns to Supabase (notification_email, email_notified)
- [ ] Signed up for Resend account
- [ ] Added RESEND_API_KEY to .env.local
- [ ] Restarted your dev server (npm run dev)

---

## 🚀 Quick Start: Complete Testing Flow

### Step 1: Set Up Resend (First Time Only)

#### 1.1 Create Resend Account
1. Go to https://resend.com
2. Click "Sign Up" (free tier includes 100 emails/day)
3. Verify your email address

#### 1.2 Get Your API Key
1. After login, go to https://resend.com/api-keys
2. Click "Create API Key"
3. Give it a name like "Valentine App Dev"
4. Copy the API key (starts with `re_...`)

#### 1.3 Add to Environment Variables
1. Open `.env.local` in your project
2. Replace the placeholder:
   ```bash
   RESEND_API_KEY=re_your_actual_key_here
   ```
3. Save the file

#### 1.4 Restart Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

### Step 2: Test Email Subscription

#### 2.1 Create a New Valentine
1. Navigate to http://localhost:3000
2. Enter a partner name (e.g., "Priya")
3. Upload a couple photo
4. Click "Create Valentine 💕"

#### 2.2 Subscribe to Notifications
You should now be on the success page. You'll see:
- Your shareable link
- Share buttons
- **📬 Email notification section**

1. Enter your email address
2. Click "Notify Me 🔔"
3. You should see: **"✅ You're all set!"**

#### 2.3 Verify in Database
1. Go to Supabase Dashboard → Table Editor → valentines
2. Find your valentine (search by partner_name)
3. Check these columns:
   - `notification_email`: Should have your email
   - `email_notified`: Should be `false`
   - `view_count`: Should be `0`

**If you see an error instead:**
- Check that database columns were added
- Check browser console (F12) for error details
- Verify dev server is running

---

### Step 3: Test Email Notification Sending

#### 3.1 Open the Valentine Link
1. Copy the valentine link from the success page
2. **Open it in a new incognito/private window** (important!)
   - Chrome: Cmd+Shift+N (Mac) or Ctrl+Shift+N (Windows)
   - This ensures it's a "first view"
3. Paste the link and press Enter

#### 3.2 Check Your Email
Within 30 seconds, you should receive an email:
- **Subject:** "💖 [Partner Name] just opened your Valentine!"
- **From:** Valentine Special
- **Content:** Beautiful HTML email with hearts and notification

**Email Preview:**
```
💕 Great News!

[Partner Name] just opened your Valentine surprise! 🎉

Your romantic gesture has been delivered successfully.
```

#### 3.3 Verify in Database
Go back to Supabase → Table Editor → valentines:
- `view_count`: Should now be `1`
- `email_notified`: Should now be `true`

#### 3.4 Test No Duplicate Emails
1. Refresh the valentine link a few times
2. You should **NOT** receive additional emails
3. `view_count` should increase, but no new emails

This is correct behavior! Email is only sent on the FIRST view.

---

## 🧪 Advanced Testing Scenarios

### Test 1: Multiple Valentines
Create multiple valentines with different emails to test:
- Different recipients
- Different email addresses
- Verify each gets notified correctly

### Test 2: Without Email Subscription
1. Create a valentine
2. **Skip** the email notification (don't enter email)
3. Share the link and open it
4. **No email should be sent** (correct behavior)

### Test 3: Invalid Email
1. Try entering invalid emails:
   - `notanemail` (should reject)
   - `test@` (should reject)
   - `@example.com` (should reject)
2. Valid email format required: `user@domain.com`

---

## 🐛 Troubleshooting

### Problem: "Failed to save notification preference"

**Causes:**
- Database columns not added
- Supabase connection issue
- Invalid valentine ID

**Solution:**
1. Check Supabase table has `notification_email` and `email_notified` columns
2. Check browser console for detailed error
3. Verify `.env.local` has correct Supabase credentials
4. Restart dev server

---

### Problem: Email not received

**Causes:**
- Invalid Resend API key
- Email in spam folder
- API key not loaded
- Server not restarted after adding key

**Solution:**
1. **Check Spam/Junk folder**
2. Verify API key in `.env.local`:
   ```bash
   RESEND_API_KEY=re_...
   ```
3. Restart dev server:
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```
4. Check Resend dashboard for delivery logs:
   - Go to https://resend.com/emails
   - See if email was sent
5. Check terminal for errors:
   ```
   Failed to send notification email: ...
   ```

---

### Problem: Email sent multiple times

**Causes:**
- Database not updating `email_notified` flag
- Race condition with multiple opens

**Solution:**
1. Check database: `email_notified` should be `true` after first send
2. If false, check server logs for database update errors
3. This is usually a database permission issue

---

### Problem: Email shows "from noreply@resend.dev"

**Cause:**
- Using Resend's default domain (normal for development)

**Solution for Production:**
1. Go to https://resend.com/domains
2. Add your custom domain
3. Add DNS records as instructed
4. Update the `from` field in:
   `/app/api/notification/send/route.ts`
   ```typescript
   from: 'Valentine Special <notifications@yourdomain.com>'
   ```

---

## 📊 Monitoring & Logs

### Check Email Delivery Status
1. Go to https://resend.com/emails
2. See all sent emails with:
   - Delivery status
   - Open rates
   - Click rates

### Check Server Logs
In your terminal where `npm run dev` is running:
- Look for: `Failed to send notification email:` (if errors)
- Successful sends are silent (no logs)

### Check Database State
Supabase Dashboard → Table Editor → valentines:
```
| id     | partner_name | notification_email | email_notified | view_count |
|--------|--------------|-------------------|----------------|------------|
| abc123 | Priya        | test@email.com    | true           | 5          |
```

---

## 🎯 Expected Behavior Summary

| Scenario | Email Sent? | Database State |
|----------|-------------|----------------|
| First view with email subscription | ✅ Yes | email_notified: true, view_count: 1 |
| Second view | ❌ No | email_notified: true, view_count: 2 |
| First view without email subscription | ❌ No | notification_email: null, view_count: 1 |
| Invalid email on subscription | ❌ No | Error shown to user |

---

## 🚀 Production Deployment Checklist

Before deploying to production:

- [ ] Verify custom domain in Resend (optional but recommended)
- [ ] Update `RESEND_API_KEY` in production environment
- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Test email delivery in production environment
- [ ] Monitor Resend dashboard for delivery rates
- [ ] Add privacy policy link for email collection
- [ ] Set up email rate limiting (if needed)
- [ ] Test from multiple email providers (Gmail, Outlook, Yahoo)

---

## 📝 Quick Test Script

Run this complete flow in 2 minutes:

1. ✅ Create valentine with name "TestUser"
2. ✅ Enter your email on success page
3. ✅ See "You're all set!" message
4. ✅ Copy valentine link
5. ✅ Open in incognito window
6. ✅ Check email inbox (within 30 seconds)
7. ✅ Verify email received with correct content
8. ✅ Refresh valentine link
9. ✅ Verify NO second email received

**All steps passed?** 🎉 Email notifications are working perfectly!

---

## 💡 Tips

- **Development:** Resend allows sending to any email with the dev domain
- **Production:** Verify your domain for better deliverability
- **Spam Prevention:** Most emails arrive instantly, but check spam folder
- **Testing:** Use incognito for "first view" simulation
- **Debugging:** Check Resend dashboard for email delivery logs
- **Free Tier:** 100 emails/day is plenty for testing and initial launch

---

## 🆘 Need Help?

If emails still aren't working:
1. Check all environment variables are loaded
2. Restart dev server completely
3. Check Resend API key is valid
4. Check database columns exist
5. Look at browser console and server logs for errors
6. Try with a different email address

**Still stuck?** Check the detailed error in:
- Browser console (F12 → Console tab)
- Terminal where dev server is running
- Supabase logs (if database errors)
- Resend dashboard (if API errors)
