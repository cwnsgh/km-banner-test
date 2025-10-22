import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BannerType = "fullscreen" | "slide" | "long";

export interface BannerItem {
  id?: string;
  image_url?: string;
  video_url?: string;
  link_url?: string;
  order: number;
  created_at?: string;
}

export interface Banner {
  id?: string;
  name: string;
  type: BannerType;
  items: BannerItem[];
  settings: {
    autoplay?: boolean;
    interval?: number;
    showNavigation?: boolean;
    showPagination?: boolean;
    height?: string;
  };
  created_at?: string;
  updated_at?: string;
}

