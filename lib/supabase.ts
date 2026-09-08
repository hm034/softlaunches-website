import { createClient } from "@supabase/supabase-js";

// One connection to Supabase, shared by the whole site.
// The URL and key come from .env.local so they stay out of the code.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
