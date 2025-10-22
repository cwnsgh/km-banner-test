import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: 모든 배너 조회
export async function GET() {
  const { data: banners, error } = await supabase
    .from("banners")
    .select("*, banner_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // banner_items를 items로 변경하고 order로 정렬
  const formattedBanners = banners?.map((banner) => ({
    ...banner,
    items:
      banner.banner_items?.sort((a: any, b: any) => a.order - b.order) || [],
    banner_items: undefined,
  }));

  return NextResponse.json(formattedBanners);
}

// POST: 새 배너 생성
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, type, settings, items } = body;

  // 배너 생성
  const { data: banner, error: bannerError } = await supabase
    .from("banners")
    .insert({ name, type, settings })
    .select()
    .single();

  if (bannerError) {
    return NextResponse.json({ error: bannerError.message }, { status: 500 });
  }

  // 배너 아이템 생성
  if (items && items.length > 0) {
    const bannerItems = items.map((item: any, index: number) => ({
      banner_id: banner.id,
      image_url: item.image_url,
      video_url: item.video_url,
      link_url: item.link_url,
      order: item.order ?? index,
    }));

    const { error: itemsError } = await supabase
      .from("banner_items")
      .insert(bannerItems);

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }
  }

  return NextResponse.json(banner, { status: 201 });
}

