import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env;
const url = env.VITE_SUPABASE_URL as string;
const anonKey = env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey);
