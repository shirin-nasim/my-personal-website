import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Initialize the Supabase client with minimal configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Enhanced request wrapper with timeout and retries
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 10000,
  retries: number = 3,
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < retries; i++) {
    try {
      const timeoutPromise = new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), timeoutMs);
      });

      return await Promise.race([promise, timeoutPromise]);
    } catch (error) {
      lastError = error as Error;
      if (i === retries - 1) break;

      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 5000)),
      );
    }
  }

  throw lastError;
}

// Simple connection test with retries
export async function testConnection(retries = 3): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Testing connection (attempt ${i + 1}/${retries})...`);

      const { data, error } = await withTimeout(
        supabase
          .from("appointments")
          .select("*", { count: "exact", head: true })
          .limit(1),
        3000, // 3 second timeout
      );

      if (error) {
        console.error(`Connection error (attempt ${i + 1}/${retries}):`, error);
        if (i === retries - 1) return false;
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, i)),
        ); // Exponential backoff
        continue;
      }

      console.log("Supabase connected successfully");
      return true;
    } catch (error) {
      console.error(`Connection attempt ${i + 1}/${retries} failed:`, error);
      if (i === retries - 1) return false;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, i)),
      );
    }
  }
  return false;
}
