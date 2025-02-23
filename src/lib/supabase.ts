import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test the connection
supabase
  .from("appointments")
  .select("count")
  .single()
  .then(({ data, error }) => {
    if (error) {
      console.error("Supabase connection error:", error);
    } else {
      console.log("Supabase connected successfully");
    }
  });
