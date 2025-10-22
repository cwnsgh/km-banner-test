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

  // 이미지 업로드 기능 제거 - URL 직접 입력 방식 사용

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

    // 이미지 URL이 없는 아이템 체크
    const hasEmptyImages = items.some(
      (item) => !item.image_url && !item.video_url
    );
    if (hasEmptyImages) {
      alert("모든 아이템에 이미지나 동영상을 추가해주세요");
      return;
    }

    console.log("📤 제출 데이터:", { name, type, items, settings });
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
          {/* 🎯 실제 사용 가능한 배너들 */}
          <button
            type="button"
            onClick={() => setType("main-slide")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "main-slide"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold text-sm">🎬 메인 슬라이드</div>
            <div className="text-xs text-gray-500 mt-1">
              가로 꽉찬 메인 배너
            </div>
            <div className="text-xs text-gray-400 mt-1">권장: 1200x400px</div>
          </button>

          <button
            type="button"
            onClick={() => setType("three-grid")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "three-grid"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold text-sm">📱 3개 나란히</div>
            <div className="text-xs text-gray-500 mt-1">상품 소개용</div>
            <div className="text-xs text-gray-400 mt-1">권장: 300x300px</div>
          </button>

          <button
            type="button"
            onClick={() => setType("rolling")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "rolling"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold text-sm">🔄 롤링 배너</div>
            <div className="text-xs text-gray-500 mt-1">할인/이벤트용</div>
            <div className="text-xs text-gray-400 mt-1">권장: 1200x200px</div>
          </button>

          <button
            type="button"
            onClick={() => setType("cards")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "cards"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold text-sm">🃏 카드 갤러리</div>
            <div className="text-xs text-gray-500 mt-1">상품 갤러리용</div>
            <div className="text-xs text-gray-400 mt-1">권장: 200x250px</div>
          </button>

          <button
            type="button"
            onClick={() => setType("fade")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "fade"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold text-sm">✨ 페이드 배너</div>
            <div className="text-xs text-gray-500 mt-1">브랜드 소개용</div>
            <div className="text-xs text-gray-400 mt-1">권장: 1200x350px</div>
          </button>

          <button
            type="button"
            onClick={() => setType("grid")}
            className={`p-4 border-2 rounded-lg transition-colors ${
              type === "grid"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-semibold text-sm">⚏ 2x2 그리드</div>
            <div className="text-xs text-gray-500 mt-1">카테고리 소개용</div>
            <div className="text-xs text-gray-400 mt-1">권장: 400x400px</div>
          </button>
        </div>

        {/* 배너 타입별 안내 */}
        {type === "main-slide" && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 text-lg">🎬</div>
              <div>
                <h4 className="font-semibold text-blue-800">
                  메인 슬라이드 배너
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  • 3개 이미지가 자동으로 슬라이드됩니다
                  <br />
                  • 가로 꽉찬 메인 배너로 사용하기 적합합니다
                  <br />• 권장 이미지 크기: 1200x400px (3:1 비율)
                </p>
              </div>
            </div>
          </div>
        )}

        {type === "three-grid" && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="text-green-600 text-lg">📱</div>
              <div>
                <h4 className="font-semibold text-green-800">
                  3개 나란히 배너
                </h4>
                <p className="text-sm text-green-700 mt-1">
                  • 3개 이미지가 나란히 고정 표시됩니다
                  <br />
                  • 상품 소개나 카테고리 소개에 적합합니다
                  <br />• 권장 이미지 크기: 300x300px (정사각형)
                </p>
              </div>
            </div>
          </div>
        )}

        {type === "rolling" && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="text-purple-600 text-lg">🔄</div>
              <div>
                <h4 className="font-semibold text-purple-800">롤링 배너</h4>
                <p className="text-sm text-purple-700 mt-1">
                  • 3개 이미지가 연속적으로 롤링됩니다
                  <br />
                  • 할인 정보나 이벤트 공지에 적합합니다
                  <br />• 권장 이미지 크기: 1200x200px (6:1 비율)
                </p>
              </div>
            </div>
          </div>
        )}
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
                  <label className="block text-sm mb-1 font-medium">
                    이미지 URL
                  </label>
                  <input
                    type="text"
                    value={item.image_url || ""}
                    onChange={(e) =>
                      updateItem(index, "image_url", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://images.unsplash.com/photo-xxx?w=1200"
                  />
                  {item.image_url && (
                    <div className="mt-2">
                      <img
                        src={item.image_url}
                        alt=""
                        className="h-32 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.alt = "이미지 로드 실패";
                          e.currentTarget.className =
                            "h-32 flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded border";
                        }}
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Unsplash, Imgur 등에서 이미지 URL을 복사하세요
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium">
                    동영상 URL (선택)
                  </label>
                  <input
                    type="text"
                    value={item.video_url || ""}
                    onChange={(e) =>
                      updateItem(index, "video_url", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    YouTube, Vimeo 등
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium">
                    클릭 링크 URL (선택)
                  </label>
                  <input
                    type="text"
                    value={item.link_url || ""}
                    onChange={(e) =>
                      updateItem(index, "link_url", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://your-shop.com/products/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    배너 클릭 시 이동할 페이지
                  </p>
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
