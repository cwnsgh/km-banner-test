import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          웹에이전시 배너 관리 시스템
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          고객사 배너를 쉽게 관리하고 배포하세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold mb-2">관리자 페이지</h2>
            <p className="text-gray-600">배너 생성 및 관리</p>
          </Link>

          <a
            href="/test.html"
            target="_blank"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-4">🧪</div>
            <h2 className="text-2xl font-bold mb-2">테스트 페이지</h2>
            <p className="text-gray-600">배너 동작 확인</p>
          </a>
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">🚀 사용 방법</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-3xl mb-2">1️⃣</div>
              <h4 className="font-bold mb-2">배너 템플릿 선택</h4>
              <p className="text-sm text-gray-600">
                슬라이드, 롱배너, 풀스크린 중 선택
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">2️⃣</div>
              <h4 className="font-bold mb-2">이미지 업로드</h4>
              <p className="text-sm text-gray-600">원하는 만큼 이미지 추가</p>
            </div>
            <div>
              <div className="text-3xl mb-2">3️⃣</div>
              <h4 className="font-bold mb-2">코드 복사</h4>
              <p className="text-sm text-gray-600">
                카페24에 붙여넣기만 하면 끝!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
