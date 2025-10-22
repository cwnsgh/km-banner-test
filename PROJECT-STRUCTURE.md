# 🏗️ 프로젝트 구조

## 📁 핵심 파일

### 🎨 프론트엔드 (고객사에 배포되는 파일)

```
public/
├── banner-script.js    ⭐ 배너 위젯 스크립트 (API 연결, 동적 렌더링)
├── banner-style.css    ⭐ 배너 스타일 (템플릿)
└── test.html          🧪 테스트 페이지
```

### ⚙️ 백엔드 (관리자 시스템)

```
app/
├── admin/
│   ├── page.tsx           # 배너 목록
│   ├── create/page.tsx    # 배너 생성
│   ├── edit/[id]/page.tsx # 배너 수정
│   └── detail/[id]/page.tsx # 코드 보기
├── api/
│   ├── banners/route.ts   # 배너 CRUD API
│   └── upload/route.ts    # 이미지 업로드 API
└── page.tsx              # 홈페이지

components/
├── BannerForm.tsx        # 배너 생성/수정 폼
└── CodeGenerator.tsx     # HTML 코드 생성기

lib/
└── supabase.ts          # DB 연결
```

## 🔄 데이터 흐름

```
1. 관리자 페이지
   └─> 이미지 업로드 + 템플릿 선택
   └─> Supabase DB 저장
   └─> banner_id 생성

2. HTML 코드 생성
   └─> <div data-banner-id="xxx"></div>
   └─> <script src="/banner-script.js"></script>

3. 카페24에 붙여넣기
   └─> 고객사 쇼핑몰에 코드 삽입

4. banner-script.js 실행
   └─> data-banner-id 읽기
   └─> API 호출: /api/banners/xxx
   └─> DB에서 이미지 + 설정 가져오기
   └─> 동적으로 HTML 생성
   └─> 화면에 배너 표시
```

## 🎯 사용자 관점

### 웹에이전시 (우리)

1. 배너 템플릿 디자인 (CSS)
2. banner-script.js 배포
3. 고객사에 시스템 제공

### 고객사 (클라이언트)

1. 로그인 → 관리자 페이지
2. 이미지 업로드 + 템플릿 선택
3. HTML 코드 복사
4. 카페24에 붙여넣기
5. 완료! 🎉

### 수정 시

1. 관리자 페이지에서 이미지만 변경
2. 자동 반영 (카페24 코드 수정 불필요)

## 🔑 핵심 개념

- **banner_id**: 각 고객사의 고유 배너 식별자
- **템플릿**: CSS로 미리 만든 배너 스타일 (.banner-slide, .banner-long 등)
- **동적 렌더링**: 스크립트가 실시간으로 API에서 데이터 가져와서 표시
- **단일 스크립트**: CSS + JS 모두 banner-script.js 하나로 처리

## ✨ 장점

1. ✅ **간단한 코드**: 고객사는 딱 2줄만 붙여넣기
2. ✅ **수정 용이**: DB만 업데이트하면 자동 반영
3. ✅ **확장 가능**: 새 템플릿 추가 쉬움
4. ✅ **유지보수**: 스크립트 한 곳에서만 관리
