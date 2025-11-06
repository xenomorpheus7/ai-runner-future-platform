import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create client with fallback empty strings if env vars are missing
// This prevents the app from crashing if Supabase is not configured
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
