-- Create storage bucket for elf images
INSERT INTO storage.buckets (id, name, public) VALUES ('elf-images', 'elf-images', true);

-- Create policy for public access to elf images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'elf-images');

-- Create policy for authenticated uploads
CREATE POLICY "Anyone can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'elf-images');

-- Create the elf_badges table
CREATE TABLE public.elf_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  quiz_answer TEXT,
  elf_image_url TEXT,
  badge_issued BOOLEAN DEFAULT false NOT NULL,
  badge_issued_at TIMESTAMPTZ,
  obf_response JSONB
);

-- Enable RLS but allow public access for kiosk mode
ALTER TABLE public.elf_badges ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (kiosk mode - no auth required)
CREATE POLICY "Anyone can create elf badges" ON public.elf_badges FOR INSERT WITH CHECK (true);

-- Allow reading own records by email or any record for the kiosk
CREATE POLICY "Anyone can read elf badges" ON public.elf_badges FOR SELECT USING (true);

-- Allow updates for badge issuing
CREATE POLICY "Anyone can update elf badges" ON public.elf_badges FOR UPDATE USING (true);