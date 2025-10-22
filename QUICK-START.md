# 🚀 빠른 시작 가이드

## ✅ 현재 상태

- ✅ 코드 완성
- ✅ Vercel 배포 완료
- ✅ Supabase 프로젝트 생성
- ✅ URL/Key 연결 완료
- ✅ npm install 완료
- ⚠️ **SQL 실행 필요!**

---

## 📝 1. Supabase SQL 실행 (5분)

### 단계:

```
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. 왼쪽 메뉴 → SQL Editor 클릭
4. "+ New Query" 버튼
5. supabase-simple.sql 파일 열기 (VS Code)
6. 전체 복사 (Ctrl+A → Ctrl+C)
7. SQL Editor에 붙여넣기 (Ctrl+V)
8. Run 버튼 클릭 (또는 Ctrl+Enter)
9. "Database setup complete!" 확인
```

### 생성되는 것:

- ✅ banner_instances 테이블
- ✅ banner_items 테이블
- ✅ banner-images Storage 버킷
- ✅ 테스트 데이터 1개

---

## 🧪 2. 로컬 테스트 (3분)

### 서버 실행:

```bash
npm run dev
```

### 테스트 페이지들:

#### A. Mock 데이터 테스트 (DB 없이도 동작)

```
http://localhost:3000/test-local.html

→ 슬라이드, 롱배너 즉시 확인 가능
```

#### B. 홈페이지

```
http://localhost:3000

→ 시스템 소개 페이지
```

#### C. 관리자 페이지

```
http://localhost:3000/admin

→ 배너 생성/관리
```

---

## 🎯 3. 첫 배너 만들기 (5분)

### 단계:

```
1. http://localhost:3000/admin 접속
2. "새 배너 만들기" 클릭
3. 배너 이름: "테스트 슬라이드"
4. 배너 타입: 슬라이드 선택
5. "아이템 추가" 클릭
6. 이미지 업로드 (아무 이미지나 2~3개)
   → 자동 압축됨!
7. 설정 확인 (자동재생 ON)
8. "생성하기" 클릭
9. 코드 보기 페이지로 자동 이동
10. HTML 코드 복사
```

---

## 🌐 4. 카페24 스타일 테스트 (2분)

### test-local.html에서 테스트:

#### 1. 파일 열기

```
public/test-local.html
```

#### 2. 맨 아래에 추가

```html
<!-- 방금 생성한 배너 -->
<div data-banner-id="방금생성한배너ID"></div>
```

#### 3. 저장 후 새로고침

```
http://localhost:3000/test-local.html

→ DB에서 가져온 이미지로 배너 표시!
```

---

## 🎉 5. 완성!

### 이제 할 수 있는 것:

✅ **관리자 페이지**

- 배너 생성/수정/삭제
- 이미지 업로드 (자동 압축)
- HTML 코드 복사

✅ **배너 위젯**

- 슬라이드 배너
- 롱배너
- 전체화면 배너
- 자동 슬라이드
- 네비게이션

✅ **카페24 적용**

- HTML 코드 2줄만 붙여넣기
- 이미지 수정 시 자동 반영

---

## 📊 페이지 구조

```
홈 (/)
  ↓
관리자 (/admin)
  ├─ 새 배너 (/admin/create)
  ├─ 수정 (/admin/edit/[id])
  └─ 코드보기 (/admin/detail/[id])

테스트 (/test-local.html)
```

---

## 🆘 문제 해결

### 배너가 안 보여요

```
✅ SQL 실행했나요?
✅ npm run dev 실행 중인가요?
✅ 콘솔 에러 확인 (F12)
```

### 이미지 업로드 안 돼요

```
✅ Supabase Storage bucket 생성되었나요?
✅ Storage 정책 실행되었나요?
✅ 이미지 크기 확인 (5MB 이하 권장)
```

### API 에러

```
✅ lib/supabase.ts에 URL/Key 올바른가요?
✅ 테이블이 생성되었나요? (Table Editor 확인)
```

---

## 🎯 다음 단계

1. ✅ 로컬 테스트 완료
2. ✅ GitHub push
3. ✅ Vercel 자동 재배포
4. ✅ 실제 URL로 테스트
5. 🎊 완성!
