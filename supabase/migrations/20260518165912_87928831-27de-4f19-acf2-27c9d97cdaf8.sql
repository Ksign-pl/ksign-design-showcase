ALTER TABLE public.order_checklist_progress
ADD COLUMN notes jsonb NOT NULL DEFAULT '{}'::jsonb;