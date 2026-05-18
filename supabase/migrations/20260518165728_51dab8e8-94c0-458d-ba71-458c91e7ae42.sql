
CREATE TABLE public.order_checklist_progress (
  order_id uuid PRIMARY KEY,
  checked_indices integer[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.order_checklist_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages checklist progress"
ON public.order_checklist_progress
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE TRIGGER trg_order_checklist_progress_updated_at
BEFORE UPDATE ON public.order_checklist_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
