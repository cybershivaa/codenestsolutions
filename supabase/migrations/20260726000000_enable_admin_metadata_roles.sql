-- Add email column to profiles table if not exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Update existing profiles with emails from auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id;

-- Recreate trigger handle_new_user to assign admin role if 'is_admin' metadata is true, or if it is the first user, and map email.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count INT;
BEGIN
  INSERT INTO public.profiles (
    id, 
    display_name, 
    avatar_url,
    phone,
    company_name,
    country,
    email
  )
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'display_name', 
      NEW.raw_user_meta_data->>'name', 
      NEW.raw_user_meta_data->>'fullName', 
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone),
    COALESCE(
      NEW.raw_user_meta_data->>'company_name', 
      NEW.raw_user_meta_data->>'companyName'
    ),
    COALESCE(NEW.raw_user_meta_data->>'country', NEW.raw_user_meta_data->>'country'),
    NEW.email
  );

  SELECT COUNT(*) INTO user_count FROM public.user_roles;
  
  -- Check is_admin flag in raw_user_meta_data, or if this is the first user
  IF COALESCE((NEW.raw_user_meta_data->>'is_admin')::boolean, false) = true OR user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'viewer')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Promote existing admin users who don't have company_name set in their profiles to the 'admin' role
-- (All clients register with a company name, whereas admins do not)
UPDATE public.user_roles
SET role = 'admin'
WHERE user_id IN (
  SELECT id FROM public.profiles 
  WHERE company_name IS NULL OR company_name = ''
);
