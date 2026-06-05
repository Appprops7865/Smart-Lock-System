// @ts-ignore
import { createClient } from "https://esm.sh";

const supabaseUrl = "https://aaouijsixutkcwdvlxgz.supabase.co";
const supabaseAnonKey = "sb_publishable_kdAfYkXzoQRjeBw9En9UrQ_P2XzSZjc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
