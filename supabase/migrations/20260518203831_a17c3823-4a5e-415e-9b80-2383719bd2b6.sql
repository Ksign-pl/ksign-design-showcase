
-- Admin-only write/update/delete for order-pdfs and brief-assets buckets.
-- Service role bypasses RLS, so server functions using supabaseAdmin continue to work.

CREATE POLICY "Admins can insert order-pdfs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'order-pdfs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update order-pdfs"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'order-pdfs' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'order-pdfs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete order-pdfs"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'order-pdfs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert brief-assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'brief-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update brief-assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'brief-assets' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'brief-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete brief-assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'brief-assets' AND public.has_role(auth.uid(), 'admin'));
