import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env ?? {};

const FALLBACK_URL = 'https://gtyxclmtrqojsmvozqhg.supabase.co';
const FALLBACK_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0eXhjbG10cnFvanNtdm96cWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMDg5MDYsImV4cCI6MjA5Njg4NDkwNn0.JK7TnnjtLpk3L4IXEtsu0sOscdLdwWVXUGI39RpQ4PU';

const url = env.VITE_SUPABASE_URL || FALLBACK_URL;
const anonKey = env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

export const supabase = createClient(url, anonKey);
