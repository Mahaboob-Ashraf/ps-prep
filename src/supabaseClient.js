import { createClient } from "@supabase/supabase-js";

// 1. Get the URL and Key from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Create the connection and export it so other files can use it
export const supabase = createClient(supabaseUrl, supabaseKey);
