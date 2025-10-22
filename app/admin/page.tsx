"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Banner {
  id: string;
  name: string;
  type: string;
  created_at: string;
  items: any[];
}

export default function AdminPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banners");
      const data = await res.json();
      setBanners(data || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBanner = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await fetch(`/api/banners/${id}`, { method: "DELETE" });
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const getBannerTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      fullscreen: "전체화면",
      slide: "슬라이드",
      long: "롱배너",
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">배너 관리</h1>
            <p className="text-gray-600">
              배너를 생성하고 카페24에 적용할 코드를 받아보세요
            </p>
          </div>
          <Link
            href="/admin/create"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            + 새 배너 만들기
          </Link>
        </div>

        {banners.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-500 text-lg mb-4">생성된 배너가 없습니다</p>
            <Link
              href="/admin/create"
              className="text-blue-600 hover:underline"
            >
              첫 배너 만들기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">{banner.name}</h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {getBannerTypeLabel(banner.type)}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    아이템 {banner.items?.length || 0}개
                  </p>

                  <div className="text-xs text-gray-400 mb-4">
                    생성일:{" "}
                    {new Date(banner.created_at).toLocaleDateString("ko-KR")}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/detail/${banner.id}`}
                      className="flex-1 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-center transition-colors"
                    >
                      코드 보기
                    </Link>
                    <Link
                      href={`/admin/edit/${banner.id}`}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-center transition-colors"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
