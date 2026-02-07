# Valentine App - Setup Guide

## 🚀 Project Status

✅ Next.js app created with TypeScript and Tailwind CSS
✅ Dependencies installed (Supabase, nanoid)
✅ Project structure set up
✅ API route for creating valentines
✅ Landing page with name form
✅ Utility functions created

## 📋 Next Steps

### 1. Set Up Supabase Database

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up for free account
   - Create a new project

2. **Create the `valentines` Table**
   
   Run this SQL in the Supabase SQL Editor:

   ```sql
   CREATE TABLE valentines (
     id text PRIMARY KEY,
     partner_name text NOT NULL CHECK (char_length(partner_name) <= 30),
     created_at timestamptz DEFAULT now() NOT NULL,
     view_count integer DEFAULT 0 NOT NULL
   );

   -- Create index for faster lookups
   CREATE INDEX idx_valentines_created_at ON valentines(created_at DESC);
   ```

3. **Get Your Supabase Credentials**
   - Go to Project Settings → API
   - Copy your `Project URL` and `anon/public key`

4. **Update `.env.local`**
   
   Replace the placeholder values in `/valentine-app/.env.local`:
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 2. Still To Build

#### Priority 1 (Core MVP):
- [ ] Success page (`/success/[id]`)
- [ ] Valentine experience page (`/v/[id]`)
- [ ] Share buttons component
- [ ] GitHub star button component
- [ ] Convert existing Valentine HTML/CSS/JS to React

#### Priority 2 (Polish):
- [ ] Demo page (`/v/demo`)
- [ ] OG meta tags for social sharing
- [ ] Error pages (404, 500)
- [ ] Loading states
- [ ] Toast notifications

#### Priority 3 (Launch):
- [ ] Domain setup
- [ ] Vercel deployment
- [ ] Analytics (optional)
- [ ] README with live link

### 3. Development Commands

```bash
# Start development server
cd /Users/shivamtiwari3/valentine/valentine-app
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 4. File Structure

```
valentine-app/
├── app/
│   ├── page.tsx                    ✅ Landing page
│   ├── api/
│   │   └── create/
│   │       └── route.ts            ✅ Create valentine API
│   ├── success/
│   │   └── [id]/
│   │       └── page.tsx            ❌ TODO
│   └── v/
│       └── [id]/
│           └── page.tsx            ❌ TODO
├── components/
│   ├── NameForm.tsx                ✅ Name input form
│   ├── ShareButtons.tsx            ❌ TODO
│   ├── GitHubStarButton.tsx        ❌ TODO
│   └── ValentineExperience.tsx     ❌ TODO (Port from HTML)
├── lib/
│   ├── supabase.ts                 ✅ Supabase client
│   └── utils.ts                    ✅ Helper functions
├── public/
│   ├── image.jpeg                  ✅ Background image
│   ├── ss1.png                     ✅ Screenshot 1
│   ├── ss2.png                     ✅ Screenshot 2
│   ├── style1.css                  ✅ Flower page styles
│   └── style2.css                  ✅ Main page styles
└── .env.local                      ⚠️  NEEDS SUPABASE CREDENTIALS
```

### 5. Testing Checklist

Once Supabase is set up:

- [ ] Landing page loads
- [ ] Can enter name and submit form
- [ ] API creates valentine in database
- [ ] Redirects to success page
- [ ] Success page shows shareable link
- [ ] Valentine page (`/v/[id]`) loads with partner name
- [ ] All animations work
- [ ] Share buttons work (WhatsApp, copy link)
- [ ] GitHub star button links correctly

### 6. Deployment (After MVP Complete)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy
5. Update `NEXT_PUBLIC_APP_URL` to production URL
6. Enable GitHub Pages for demo

## 🎯 Current Status: 40% Complete

What's done:
- ✅ Project scaffolding
- ✅ Landing page UI
- ✅ Name form with validation
- ✅ API endpoint for creating valentines
- ✅ Database schema designed
- ✅ Utility functions

What's next:
- ⏳ Supabase setup (YOU NEED TO DO THIS)
- ⏳ Success page
- ⏳ Valentine experience page
- ⏳ Share functionality

---

**Ready to continue?** Set up Supabase, then we'll build the Success and Valentine pages!
