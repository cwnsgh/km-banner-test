"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import BannerForm from "@/components/BannerForm";
import type { Banner, BannerType } from "@/lib/supabase";

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await fetch(`/api/banners/${params.id}`);
      const data = await res.json();
      setBanner(data);
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  const handleSubmit = async (data: {
    name: string;
    type: BannerType;
    items: any[];
    settings: any;
  }) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/banners/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("배너가 수정되었습니다");
        router.push(`/admin/detail/${params.id}`);
      } else {
        alert("배너 수정에 실패했습니다");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("에러가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  if (!banner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">배너 수정</h1>
        <BannerForm
          initialData={banner}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
