import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// CORS 헤더 설정
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET: 모든 배너 조회
export async function GET() {
  const { data: banners, error } = await supabase
    .from("banner_instances")
    .select("*, banner_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }

  // banner_items를 items로 변경하고 order로 정렬
  const formattedBanners = banners?.map((banner) => ({
    ...banner,
    items:
      banner.banner_items?.sort((a: any, b: any) => a.order - b.order) || [],
    banner_items: undefined,
  }));

  return NextResponse.json(formattedBanners || [], { headers: corsHeaders });
}

// POST: 새 배너 생성
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, type, settings, items } = body;

  // banner_id 생성 (고유 식별자)
  const bannerId = `banner-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // 배너 생성
  const { data: banner, error: bannerError } = await supabase
    .from("banner_instances")
    .insert({ banner_id: bannerId, name, type, settings })
    .select()
    .single();

  if (bannerError) {
    return NextResponse.json(
      { error: bannerError.message },
      { status: 500, headers: corsHeaders }
    );
  }

  // 배너 아이템 생성
  if (items && items.length > 0) {
    const bannerItems = items.map((item: any, index: number) => ({
      instance_id: banner.id,
      image_url: item.image_url,
      video_url: item.video_url,
      link_url: item.link_url,
      order: item.order ?? index,
    }));

    const { error: itemsError } = await supabase
      .from("banner_items")
      .insert(bannerItems);

    if (itemsError) {
      return NextResponse.json(
        { error: itemsError.message },
        { status: 500, headers: corsHeaders }
      );
    }
  }

  return NextResponse.json(banner, { status: 201, headers: corsHeaders });
}
