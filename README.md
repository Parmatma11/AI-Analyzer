# CodeInsight AI

A futuristic, premium AI-powered code analysis platform built with Next.js, OpenAI, and Supabase.

## ✨ Features
- **Code Analysis**: get explanations, bug detection, optimizations, and complexity analysis from OpenAI.
- **ELI5 Mode**: "Explain Like I'm 5" simplified breakdown for beginners.
- **Save History**: Uses Supabase to save and retrieve past code analyses.
- **Futuristic UI**: A premium, minimalist UI inspired by modern tooling (Stripe, Apple) mixed with dark glowing aesthetic.

## 🚀 Setup Instructions

### 1. Install Dependencies
Run the following command to install all packages:
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Supabase Setup
1. Create a Supabase project at [database.new](https://database.new)
2. Go to SQL Editor and create the `analyses` table:
```sql
create table analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  code text not null,
  language text not null,
  explanation text not null,
  bugs text not null,
  improvements text not null,
  complexity text not null,
  simplified_explanation text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table analyses enable row level security;

-- Create Policies
create policy "Users can view their own analyses."
  on analyses for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own analyses."
  on analyses for insert
  with check ( auth.uid() = user_id );
```
3. Enable Email Auth in Supabase Settings (you can disable Email Confirmations for easier local testing).

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
