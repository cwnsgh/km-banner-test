"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BannerForm from "@/components/BannerForm";
import type { BannerType } from "@/lib/supabase";

export default function CreateBannerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: {
    name: string;
    type: BannerType;
    items: any[];
    settings: any;
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const banner = await res.json();
        alert("배너가 생성되었습니다");
        router.push(`/admin/detail/${banner.id}`);
      } else {
        alert("배너 생성에 실패했습니다");
      }
    } catch (error) {
      console.error("Error creating banner:", error);
      alert("에러가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">새 배너 만들기</h1>
        <BannerForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
