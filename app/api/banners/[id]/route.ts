import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: 특정 배너 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // banner_id 또는 id로 조회 시도
  let { data: banner, error } = await supabase
    .from("banner_instances")
    .select("*, banner_items(*)")
    .eq("id", params.id)
    .single();

  // id로 못 찾으면 banner_id로 조회
  if (error) {
    const result = await supabase
      .from("banner_instances")
      .select("*, banner_items(*)")
      .eq("banner_id", params.id)
      .single();

    banner = result.data;
    error = result.error;
  }

  if (error || !banner) {
    return NextResponse.json(
      { error: error?.message || "배너를 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  // banner_items를 items로 변경하고 order로 정렬
  const formattedBanner = {
    ...banner,
    items:
      banner.banner_items?.sort((a: any, b: any) => a.order - b.order) || [],
    banner_items: undefined,
  };

  return NextResponse.json(formattedBanner);
}

// PUT: 배너 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { name, type, settings, items } = body;

  // 배너 업데이트
  const { error: bannerError } = await supabase
    .from("banner_instances")
    .update({ name, type, settings, updated_at: new Date().toISOString() })
    .eq("id", params.id);

  if (bannerError) {
    return NextResponse.json({ error: bannerError.message }, { status: 500 });
  }

  // 기존 아이템 삭제
  await supabase.from("banner_items").delete().eq("instance_id", params.id);

  // 새 아이템 추가
  if (items && items.length > 0) {
    const bannerItems = items.map((item: any, index: number) => ({
      instance_id: params.id,
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

  return NextResponse.json({ success: true });
}

// DELETE: 배너 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase
    .from("banner_instances")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
