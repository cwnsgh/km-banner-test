"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            🎨 배너 관리
          </Link>

          {/* 메뉴 */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === "/"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              홈
            </Link>
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname.startsWith("/admin")
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              관리자
            </Link>
            <a
              href="/test-local.html"
              target="_blank"
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              테스트
            </a>

            {/* 뒤로가기 */}
            {pathname !== "/" && (
              <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                ← 뒤로
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
