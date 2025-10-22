# 🎨 웹에이전시 배너 관리 시스템

Next.js + Supabase로 만든 동적 배너 관리 시스템

## ✨ 특징

- 🎯 **초간단 코드**: 고객사는 딱 2줄만 붙여넣기
- 🔄 **자동 업데이트**: DB만 수정하면 즉시 반영
- 📱 **반응형**: 모바일/데스크톱 자동 대응
- 🎨 **다양한 템플릿**: 슬라이드, 롱배너, 풀스크린

## 🚀 빠른 시작

### 1. 패키지 설치

```bash
npm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. SQL Editor에서 `supabase-schema.sql` 실행
3. `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

- **관리자 페이지**: http://localhost:3000/admin
- **테스트 페이지**: http://localhost:3000/test.html

## 📖 사용 방법

### 웹에이전시 (우리)

#### 1. 배너 템플릿 만들기

`public/banner-style.css`에 새 템플릿 추가:

```css
.banner-custom {
  width: 100%;
  height: 400px;
  /* 커스텀 스타일 */
}
```

#### 2. 고객사에 시스템 제공

- 관리자 페이지 계정 생성
- `banner-script.js` URL 제공

### 고객사 (클라이언트)

#### 1. 배너 만들기

1. 관리자 페이지 로그인
2. "새 배너 만들기" 클릭
3. 이미지 업로드 (원하는 만큼)
4. 템플릿 선택 (슬라이드/롱배너/풀스크린)
5. 설정 조정 (자동재생, 간격 등)
6. 저장

#### 2. 카페24에 적용

생성된 HTML 코드 복사:

```html
<div data-banner-id="your-banner-id"></div>
<script src="https://your-domain.com/banner-script.js"></script>
```

카페24 관리자 → 디자인 관리 → HTML 편집 → 붙여넣기 → 저장

#### 3. 수정하기

- 관리자 페이지에서 이미지만 변경
- **카페24 코드 수정 불필요!** 자동 반영됨

## 🏗️ 프로젝트 구조

```
📦 banner_test
├── 📁 app/                 # Next.js 앱
│   ├── admin/             # 관리자 페이지
│   ├── api/               # REST API
│   └── page.tsx           # 홈
├── 📁 components/          # React 컴포넌트
│   ├── BannerForm.tsx     # 배너 폼
│   └── CodeGenerator.tsx  # 코드 생성기
├── 📁 public/             # 정적 파일
│   ├── banner-script.js   ⭐ 배너 위젯 (고객사용)
│   ├── banner-style.css   🎨 배너 스타일
│   └── test.html          🧪 테스트 페이지
├── 📁 lib/
│   └── supabase.ts        # DB 연결
└── supabase-schema.sql    # DB 스키마
```

## 🎯 작동 원리

### 데이터 흐름

```
관리자 페이지
    ↓ (이미지 업로드 + 템플릿 선택)
Supabase DB 저장
    ↓ (banner_id 생성)
HTML 코드 생성
    ↓ (카페24에 붙여넣기)
banner-script.js 실행
    ↓ (API 호출)
DB에서 데이터 가져오기
    ↓ (동적 렌더링)
배너 표시! 🎉
```

### 핵심 기술

1. **동적 렌더링**: JavaScript가 실시간으로 API 호출
2. **CSS 주입**: 스크립트가 스타일도 자동 적용
3. **단일 파일**: banner-script.js 하나로 모든 처리

## 🔧 커스터마이징

### 새 배너 템플릿 추가

#### 1. CSS 추가 (`public/banner-style.css`)

```css
.banner-vertical {
  width: 300px;
  height: 600px;
  /* 세로 배너 스타일 */
}
```

#### 2. 타입 맵 추가 (`lib/supabase.ts`)

```typescript
export type BannerType = "fullscreen" | "slide" | "long" | "vertical";
```

#### 3. 폼에 옵션 추가 (`components/BannerForm.tsx`)

```tsx
<button onClick={() => setType("vertical")}>세로배너</button>
```

## 📊 데이터베이스 구조

### banners 테이블

| 필드     | 타입  | 설명               |
| -------- | ----- | ------------------ |
| id       | UUID  | 배너 ID            |
| name     | TEXT  | 배너 이름          |
| type     | TEXT  | 배너 타입          |
| settings | JSONB | 설정 (자동재생 등) |

### banner_items 테이블

| 필드      | 타입 | 설명         |
| --------- | ---- | ------------ |
| id        | UUID | 아이템 ID    |
| banner_id | UUID | 배너 ID (FK) |
| image_url | TEXT | 이미지 URL   |
| order     | INT  | 순서         |

## 🚢 배포

### Vercel 배포

```bash
# GitHub에 푸시
git push origin main

# Vercel에서 import
# 환경 변수 설정:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### banner-script.js 접근

배포 후 이 URL을 고객사에 제공:

```
https://your-domain.vercel.app/banner-script.js
```

## 🆘 트러블슈팅

### 배너가 안 보여요

1. 브라우저 콘솔 확인
2. API 호출 성공했는지 확인
3. banner_id가 정확한지 확인

### 이미지가 안 나와요

1. Supabase Storage 권한 확인
2. 이미지 URL이 public인지 확인
3. CORS 설정 확인

## 📝 라이센스

MIT

## 👥 기여

이슈와 PR은 언제나 환영합니다!
