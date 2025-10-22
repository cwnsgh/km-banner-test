import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const fileBuffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from("banners")
    .upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("banners").getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl });
}

