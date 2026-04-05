-- Supabase Schema for CodeInsight AI

-- Create the analyses table
CREATE TABLE analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    explanation TEXT,
    bugs TEXT,
    improvements TEXT,
    complexity TEXT,
    simplified_explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own analyses
CREATE POLICY "Users can insert their own analyses" 
ON analyses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to select their own analyses
CREATE POLICY "Users can view their own analyses" 
ON analyses FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to delete their own analyses (optional but good practice)
CREATE POLICY "Users can delete their own analyses" 
ON analyses FOR DELETE 
USING (auth.uid() = user_id);
