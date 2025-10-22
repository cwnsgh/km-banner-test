import { createClient } from "@supabase/supabase-js";

// 환경 변수가 없으면 더미 값 사용 (빌드 시 에러 방지)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://csydyeysdwtalafonswz.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeWR5ZXlzZHd0YWxhZm9uc3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwOTM1OTEsImV4cCI6MjA3NjY2OTU5MX0.FXl1GFv_OfOdNscrJZg4Y6WHOafD-z8G8wyZTzPHZy0";

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
