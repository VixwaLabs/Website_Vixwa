-- ============================================================
-- VIXWA LABS — SUPABASE DATABASE SCHEMA
-- ============================================================
-- Execute this SQL script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- 1. ENQUIRIES TABLE (Contact Form)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    organization TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new' | 'read' | 'archived'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for enquiries
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated visitors to submit contact enquiries
CREATE POLICY "Allow public insert to enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow service_role (backend API) to read and manage all enquiries
CREATE POLICY "Allow service_role full access to enquiries"
    ON public.enquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- 2. SUBSCRIBERS TABLE (Newsletter)
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active', -- 'active' | 'unsubscribed'
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for subscribers
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated visitors to subscribe or update subscription
CREATE POLICY "Allow public insert to subscribers"
    ON public.subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public update to subscribers"
    ON public.subscribers
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service_role (backend API) full access to subscribers
CREATE POLICY "Allow service_role full access to subscribers"
    ON public.subscribers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- 3. USERS TABLE (Optional Auth / Administration)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service_role full access to users"
    ON public.users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- 4. POSTS TABLE (Research / Insights)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published posts"
    ON public.posts
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

CREATE POLICY "Allow service_role full access to posts"
    ON public.posts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

