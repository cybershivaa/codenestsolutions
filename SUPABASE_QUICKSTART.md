# 🚀 Supabase Integration - Quick Start

## ✅ What's Already Set Up

1. **Supabase Credentials** - `.env` file configured
   - Project ID: `ubrtcwmospympdgtxjoz`
   - Publishable Key: `sb_publishable_5FDgX3-60-r_7u1NexWtw_m9a3M1tq`

2. **Auth Page** - `src/routes/auth.tsx`
   - Sign in form ✅
   - Sign up form ✅
   - Auto-redirect to admin on login ✅

3. **Supabase Client** - `src/integrations/supabase/client.ts`
   - Ready to use ✅

4. **Auth Utilities** - `src/integrations/supabase/auth.ts`
   - `signUpWithEmail()` - Create new account
   - `signInWithEmail()` - Login with email/password
   - `signInWithMagicLink()` - Passwordless login
   - `signInWithProvider()` - OAuth (Google, GitHub, Discord)
   - `resetPassword()` - Forgot password
   - `updatePassword()` - Change password
   - `signOut()` - Logout

5. **useAuth Hook** - `src/hooks/useAuth.ts`
   - Manage auth state in components
   - Get current user info
   - Trigger auth actions

6. **Database Functions** - `src/integrations/supabase/database.ts`
   - Complete CRUD operations for all tables
   - Type-safe queries

---

## 🎯 NEXT STEPS (Do This Now)

### Step 1: Create Database Tables (5 minutes)

1. Open [Supabase Dashboard](https://app.supabase.com/projects/ubrtcwmospympdgtxjoz)
2. Click **SQL Editor** → **New Query**
3. Copy entire contents of: `supabase/migrations/001_initial_schema.sql`
4. Click **Run**
5. ✅ Done! All tables created with Row Level Security policies

### Step 2: Test Authentication

1. Go to http://localhost:5173/auth
2. Click "Create account"
3. Sign up with a test email
4. Should redirect to `/admin` after sign up
5. Check Supabase Dashboard → **Authentication** → **Users** to verify

### Step 3: Start Using in Components

#### Example 1: Check if User is Logged In

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return <div>Welcome, {user.email}!</div>;
}
```

#### Example 2: Display Data from Database

```typescript
import { useEffect, useState } from 'react';
import { getProjects } from '@/integrations/supabase/database';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(10).then(({ projects }) => setProjects(projects));
  }, []);

  return (
    <ul>
      {projects.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
```

#### Example 3: Submit Form Data

```typescript
import { submitLead } from "@/integrations/supabase/database";

async function handleContactForm(data) {
  try {
    const result = await submitLead({
      name: data.name,
      email: data.email,
      message: data.message,
      company: data.company,
    });
    console.log("Lead submitted:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
```

#### Example 4: Protect Routes

```typescript
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/auth' });
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <div>Admin Panel</div>;
}
```

---

## 📚 Available Functions Reference

### Auth Functions (`auth.ts`)

- `signUpWithEmail(email, password, displayName)` → Promise
- `signInWithEmail(email, password)` → Promise
- `signInWithMagicLink(email)` → Promise
- `signInWithProvider('google' | 'github' | 'discord')` → Promise
- `resetPassword(email)` → Promise
- `updatePassword(newPassword)` → Promise
- `signOut()` → Promise
- `getSession()` → Promise

### Database Functions (`database.ts`)

**Projects:**

```typescript
getProjects(limit, offset) → {projects, count}
getFeaturedProjects(limit) → projects[]
getUserProjects(userId) → projects[]
getProject(projectId) → project
createProject(userId, project) → project
updateProject(projectId, updates) → project
deleteProject(projectId) → void
```

**Blog Posts:**

```typescript
getBlogPosts(limit, offset) → {posts, count}
getBlogPost(slug) → post (increments views)
getUserBlogPosts(userId) → posts[]
createBlogPost(authorId, post) → post
updateBlogPost(postId, updates) → post
deleteBlogPost(postId) → void
```

**Testimonials:**

```typescript
getTestimonials(limit) → testimonials[]
getFeaturedTestimonials(limit) → testimonials[]
createTestimonial(data) → testimonial
updateTestimonial(id, updates) → testimonial
deleteTestimonial(id) → void
```

**Team Members:**

```typescript
getTeamMembers(limit) → members[]
createTeamMember(data) → member
updateTeamMember(id, updates) → member
deleteTeamMember(id) → void
```

**Leads:**

```typescript
submitLead(lead) → lead
getLeads(status?, limit, offset) → {leads, count}
updateLead(id, updates) → lead
deleteLead(id) → void
```

**Services:**

```typescript
getServices() → services[]
createService(data) → service
updateService(id, updates) → service
deleteService(id) → void
```

**Profiles:**

```typescript
getUserProfile(userId) → profile
updateUserProfile(userId, updates) → profile
```

---

## 🔒 Security Features Included

✅ Row Level Security (RLS) policies configured
✅ Users can only edit their own data
✅ Admins can manage public content
✅ Automatic `updated_at` timestamps
✅ Foreign key constraints

---

## 🌐 Environment Variables

Already set in `.env`:

```
VITE_SUPABASE_URL=https://ubrtcwmospympdgtxjoz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_5FDgX3-60-r_7u1NexWtw_m9a3M1tq
```

For production, update these in your `.env.production`

---

## ❓ FAQ

**Q: How do I check if a user is logged in?**
A: Use the `useAuth()` hook: `const { user } = useAuth()`

**Q: How do I get all data from a table?**
A: Use the database functions like `getProjects()`, `getBlogPosts()`, etc.

**Q: How do I make an authenticated query?**
A: The Supabase client automatically includes the session token

**Q: Can I query from the frontend?**
A: Yes! The RLS policies control what data users can see

**Q: How do I add a new table?**
A: Create a migration SQL file in `supabase/migrations/` and run it in SQL Editor

**Q: How do I use OAuth (Google login)?**
A: See `SUPABASE_SETUP.md` for OAuth setup instructions

---

## 🧪 Quick Test Checklist

- [ ] Database migration ran successfully
- [ ] Can sign up at http://localhost:5173/auth
- [ ] User appears in Supabase Authentication dashboard
- [ ] Can sign in with the test account
- [ ] useAuth() hook shows logged-in user in console
- [ ] Can query database with getProjects() etc.

---

## 📖 Learn More

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
- [Supabase React Integration](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

---

**Ready to build?** Your database and auth system is ready to use! 🎉
