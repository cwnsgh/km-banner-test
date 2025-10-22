"use client";

import { useState, useEffect } from "react";
import type { Banner, BannerType, BannerItem } from "@/lib/supabase";

interface BannerFormProps {
  initialData?: Banner;
  onSubmit: (data: {
    name: string;
    type: BannerType;
    items: BannerItem[];
    settings: any;
  }) => void;
  loading: boolean;
}

export default function BannerForm({
  initialData,
  onSubmit,
  loading,
}: BannerFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState<BannerType>(initialData?.type || "slide");
  const [items, setItems] = useState<BannerItem[]>(initialData?.items || []);
  const [settings, setSettings] = useState({
    autoplay: initialData?.settings?.autoplay ?? true,
    interval: initialData?.settings?.interval ?? 3000,
    showNavigation: initialData?.settings?.showNavigation ?? true,
    showPagination: initialData?.settings?.showPagination ?? true,
    height: initialData?.settings?.height ?? "auto",
  });

  const addItem = () => {
    setItems([
      ...items,
      {
        image_url: "",
        video_url: "",
        link_url: "",
        order: items.length,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof BannerItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const uploadFile = async (index: number, file: File) => {
    try {
      // 1. 이미지 압축 (동적 import)
      const { compressForBannerType } = await import("@/lib/imageCompression");

      console.log("🔄 이미지 압축 중...");
      const compressedFile = await compressForBannerType(file, type);

      // 2. 압축된 이미지 업로드
      const formData = new FormData();
      formData.append("file", compressedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        updateItem(index, "image_url", data.url);
        console.log("✅ 업로드 완료!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("파일 업로드 실패");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("배너 이름을 입력하세요");
      return;
    }

    if (items.length === 0) {
      alert("최소 1개의 아이템을 추가하세요");
      return;
    }

    onSubmit({ name, type, items, settings });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 space-y-6"
    >
      {/* 기본 정보 */}
      <div>
        <label className="block text-sm font-medium mb-2">배너 이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="예: 메인 슬라이드 배너"
        />
      </div>

      {/* 배너 타입 */}
      <div>
        <label className="block text-sm font-medium mb-2">배너 타입</label>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setType("fullscreen")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "fullscreen"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold">전체화면</div>
            <div className="text-xs text-gray-500 mt-1">화면 전체</div>
          </button>
          <button
            type="button"
            onClick={() => setType("slide")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "slide"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold">슬라이드</div>
            <div className="text-xs text-gray-500 mt-1">영역 내 슬라이드</div>
          </button>
          <button
            type="button"
            onClick={() => setType("long")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "long"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold">롱배너</div>
            <div className="text-xs text-gray-500 mt-1">가로 꽉차게</div>
          </button>
        </div>
      </div>

      {/* 설정 */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">설정</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoplay}
              onChange={(e) =>
                setSettings({ ...settings, autoplay: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>자동재생</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showNavigation}
              onChange={(e) =>
                setSettings({ ...settings, showNavigation: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>네비게이션 표시</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showPagination}
              onChange={(e) =>
                setSettings({ ...settings, showPagination: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>페이지네이션 표시</span>
          </label>
          <div>
            <label className="block text-sm mb-1">전환 간격 (ms)</label>
            <input
              type="number"
              value={settings.interval}
              onChange={(e) =>
                setSettings({ ...settings, interval: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded"
              min="1000"
              step="500"
            />
          </div>
        </div>
      </div>

      {/* 아이템 목록 */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">배너 아이템</h3>
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + 아이템 추가
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">아이템 {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  삭제
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">이미지 업로드</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadFile(index, file);
                    }}
                    className="w-full"
                  />
                  {item.image_url && (
                    <div className="mt-2">
                      <img
                        src={item.image_url}
                        alt=""
                        className="h-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    또는 동영상 URL (YouTube, Vimeo 등)
                  </label>
                  <input
                    type="text"
                    value={item.video_url || ""}
                    onChange={(e) =>
                      updateItem(index, "video_url", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">링크 URL (선택)</label>
                  <input
                    type="text"
                    value={item.link_url || ""}
                    onChange={(e) =>
                      updateItem(index, "link_url", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "처리중..." : initialData ? "수정하기" : "생성하기"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}
