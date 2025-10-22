"use client";

import { useState } from "react";
import type { Banner } from "@/lib/supabase";

interface CodeGeneratorProps {
  banner: Banner;
}

export default function CodeGenerator({ banner }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const generateHTML = () => {
    return `<!-- 배너 위젯 -->
<div data-banner-id="${banner.id}"></div>

<!-- 스크립트 (페이지당 한번만 포함) -->
<script src="${window.location.origin}/banner-script.js"></script>`;
  };

  const copyToClipboard = () => {
    const code = generateHTML();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">카페24에 삽입할 코드</h3>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {copied ? "✓ 복사됨!" : "코드 복사"}
        </button>
      </div>

      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{generateHTML()}</code>
      </pre>

      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <h4 className="font-semibold text-yellow-800 mb-2">📌 설치 방법</h4>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
          <li>위 코드를 복사하세요 (딱 2줄!)</li>
          <li>카페24 관리자 &gt; 디자인 관리 &gt; HTML 편집</li>
          <li>배너를 표시할 위치에 붙여넣기</li>
          <li>저장하면 자동으로 배너 표시됩니다!</li>
        </ol>
        <div className="mt-3 p-3 bg-green-50 rounded">
          <p className="text-sm text-green-700">
            ✨ <strong>이미지를 수정하면?</strong> 관리자 페이지에서만 수정하면
            자동으로 반영됩니다. 카페24 코드는 절대 수정할 필요 없어요!
          </p>
        </div>
      </div>
    </div>
  );
}
