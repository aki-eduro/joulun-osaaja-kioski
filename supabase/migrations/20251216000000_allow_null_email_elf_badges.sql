-- Allow optional email for elf badges
ALTER TABLE public.elf_badges
  ALTER COLUMN email DROP NOT NULL;

-- Light validation: allow NULL/empty or basic email shape
ALTER TABLE public.elf_badges
  ADD CONSTRAINT elf_badges_email_check
  CHECK (email IS NULL OR email = '' OR position('@' in email) > 1);
