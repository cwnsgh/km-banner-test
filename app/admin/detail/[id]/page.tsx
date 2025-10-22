"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import CodeGenerator from "@/components/CodeGenerator";
import type { Banner } from "@/lib/supabase";

export default function BannerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩중...</div>
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">배너를 찾을 수 없습니다</div>
      </div>
    );
  }

  const getBannerTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      fullscreen: "전체화면",
      slide: "슬라이드",
      long: "롱배너",
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* 배너 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{banner.name}</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {getBannerTypeLabel(banner.type)}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/edit/${banner.id}`}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                수정
              </Link>
              <Link
                href={`/widget/${banner.id}`}
                target="_blank"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                미리보기 열기
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">아이템 수:</span>{" "}
              <span className="font-semibold">
                {banner.items?.length || 0}개
              </span>
            </div>
            <div>
              <span className="text-gray-600">자동재생:</span>{" "}
              <span className="font-semibold">
                {banner.settings?.autoplay ? "ON" : "OFF"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">전환 간격:</span>{" "}
              <span className="font-semibold">
                {banner.settings?.interval || 3000}ms
              </span>
            </div>
            <div>
              <span className="text-gray-600">생성일:</span>{" "}
              <span className="font-semibold">
                {banner.created_at
                  ? new Date(banner.created_at).toLocaleDateString("ko-KR")
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* 아이템 미리보기 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">배너 아이템</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {banner.items?.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={`Item ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                )}
                {item.video_url && (
                  <div className="w-full h-32 bg-gray-900 flex items-center justify-center text-white">
                    <span>🎥 동영상</span>
                  </div>
                )}
                <div className="p-2 text-xs text-gray-600">
                  {item.link_url && (
                    <div className="truncate">🔗 {item.link_url}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 코드 생성기 */}
        <CodeGenerator banner={banner} />
      </div>
    </div>
  );
}
