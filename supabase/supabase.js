import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uzonwothdieldjqcmbwi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6b253b3RoZGllbGRqcWNtYndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMTk3NTgsImV4cCI6MjA3Njc5NTc1OH0.A8EEajW_rzPYKBGZlT3szmXd4FdVmuisN-IK7FkHvMo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
