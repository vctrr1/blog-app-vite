import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://kmjfdojljhwhukyumebt.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseAnonKey);
