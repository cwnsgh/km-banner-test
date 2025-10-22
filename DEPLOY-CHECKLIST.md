# 🚀 배포 체크리스트

## ✅ 현재 상태

- ✅ Vercel 배포: https://km-banner-test.vercel.app/
- ✅ Supabase 연결
- ✅ SQL 실행 완료
- ⚠️ Storage bucket 이름 수정 필요 → 재배포

## 📝 재배포 순서

### 1. GitHub Push

```bash
git add .
git commit -m "fix: Storage bucket 이름 수정 및 에러 처리 개선"
git push
```

### 2. Vercel 자동 재배포

- Push하면 자동으로 감지
- 1~2분 내에 배포 완료

### 3. 배포 후 확인

```
✅ https://km-banner-test.vercel.app/
✅ https://km-banner-test.vercel.app/admin
✅ https://km-banner-test.vercel.app/test-local.html
```

## 🧪 테스트 순서

### 1. 관리자 페이지

```
https://km-banner-test.vercel.app/admin

1. "새 배너 만들기"
2. 배너 이름 입력
3. 슬라이드 선택
4. 이미지 업로드
   → 콘솔 확인: "🔄 이미지 압축 중..."
   → "✅ 업로드 완료! https://..."
5. 생성하기
```

### 2. 코드 복사

```
자동으로 코드 보기 페이지로 이동
  ↓
HTML 코드 복사:
<div data-banner-id="banner-xxxxx"></div>
<script src="https://km-banner-test.vercel.app/banner-script.js"></script>
```

### 3. 외부 사이트 테스트

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- 복사한 코드 붙여넣기 -->
    <div data-banner-id="banner-xxxxx"></div>
    <script src="https://km-banner-test.vercel.app/banner-script.js"></script>
  </body>
</html>
```

브라우저 콘솔 확인:

```
🔗 배너 API 베이스 URL: https://km-banner-test.vercel.app
📡 API 호출: https://km-banner-test.vercel.app/api/banners/banner-xxx
✅ API 데이터 로드 완료
✅ 배너 로드 완료
```

## 🔍 문제 해결

### 이미지 업로드 실패 시

```
콘솔 확인:
  "Storage upload error: ..."

해결:
1. Supabase → Storage
2. banner-images 버킷 확인
3. 없으면 SQL 다시 실행
```

### 배너가 안 보일 때

```
콘솔 확인:
  "❌ 배너 데이터를 찾을 수 없습니다"

해결:
1. banner_id 확인
2. DB에 데이터 있는지 확인
3. Supabase Table Editor 확인
```

### API 에러

```
콘솔 확인:
  "⚠️ API 연결 실패: 404"

해결:
1. Vercel 재배포 확인
2. API 라우트 정상인지 확인
```

## 📊 완료 후 확인사항

- [ ] GitHub push 완료
- [ ] Vercel 배포 성공 (초록 체크)
- [ ] https://km-banner-test.vercel.app/ 접속됨
- [ ] /admin 페이지 정상
- [ ] 배너 생성 가능
- [ ] 이미지 업로드 성공 (URL 확인)
- [ ] 코드 복사 가능
- [ ] banner-script.js 동작 확인

## 🎯 최종 체크

### Supabase 확인

```
Table Editor
  ✓ banner_instances (배너 있음)
  ✓ banner_items (이미지 URL 있음)

Storage
  ✓ banner-images (버킷 존재)
  ✓ 업로드된 이미지 파일들
```

### Vercel 확인

```
Deployments
  ✓ 최신 배포 성공
  ✓ 빌드 에러 없음
```

## 🎉 완성!

배포 완료 후 실제 카페24 사이트에 붙여넣기만 하면 끝!
