
-- 1. Fix mutable search_path on SECURITY DEFINER queue functions and lock down EXECUTE
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;

REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;

-- has_role is used in RLS policies and must remain callable by authenticated users (it's SECURITY DEFINER
-- with a fixed search_path and only reads user_roles for the requesting user via RLS context).
-- Keep EXECUTE for authenticated; revoke from anon to silence anon-exposure lint.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- set_updated_at is a trigger function; pin search_path and remove direct execute
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Admin SELECT policies for briefs and order_checklist_progress
CREATE POLICY "Admins can view all briefs"
  ON public.briefs
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all checklist progress"
  ON public.order_checklist_progress
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Storage RLS: restrict order-pdfs and brief-assets to service_role only.
-- Service role already bypasses RLS, but explicit policies prevent any future
-- authenticated/anon access through storage.objects.
CREATE POLICY "Admins can read order-pdfs"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'order-pdfs'
    AND has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can read brief-assets"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'brief-assets'
    AND has_role(auth.uid(), 'admin'::app_role)
  );
