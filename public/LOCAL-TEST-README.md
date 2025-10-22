# 🧪 로컬 테스트 가이드 (DB 없이)

## ✨ DB 연결 없이 테스트하기

### 방법 1: Mock 데이터 사용 (추천)

#### 1. 테스트 페이지 열기

```
http://localhost:3000/test-local.html
```

#### 2. 자동으로 동작!

- API 호출 실패 시 자동으로 `mock-data.json` 사용
- 아무 설정 없이 바로 테스트 가능

### 방법 2: Mock 데이터 커스터마이징

#### 1. mock-data.json 수정

```json
{
  "my-banner": {
    "type": "slide",
    "items": [
      { "image_url": "https://your-image-1.jpg" },
      { "image_url": "https://your-image-2.jpg" }
    ],
    "settings": {
      "autoplay": true,
      "interval": 3000
    }
  }
}
```

#### 2. HTML에 추가

```html
<div data-banner-id="my-banner"></div>
<script src="/banner-script.js"></script>
```

## 🎯 테스트 시나리오

### 1. 기본 테스트

```bash
npm run dev
# 브라우저에서 http://localhost:3000/test-local.html
```

### 2. 이미지 변경 테스트

1. `mock-data.json` 에서 이미지 URL 변경
2. 브라우저 새로고침
3. 즉시 반영!

### 3. 설정 변경 테스트

```json
{
  "slide-banner": {
    "settings": {
      "autoplay": false, // 자동재생 끄기
      "interval": 5000 // 5초로 변경
    }
  }
}
```

## 🔄 API와 Mock 데이터 전환

### banner-script.js 동작 방식

```javascript
// 1. API 호출 시도
fetch("/api/banners/xxx")
  .then((data) => {
    /* API 데이터 사용 */
  })
  .catch((error) => {
    // 2. 실패 시 자동으로 mock 데이터 사용
    fetch("/mock-data.json");
  });
```

### 강제로 Mock 데이터 사용하기

API가 있어도 Mock 데이터를 테스트하고 싶다면:

1. 브라우저 개발자 도구 열기 (F12)
2. Network 탭 → Offline 체크
3. 페이지 새로고침

## 📝 Mock 데이터 형식

```json
{
  "배너ID": {
    "type": "slide | long | fullscreen",
    "items": [
      { "image_url": "이미지 URL" }
    ],
    "settings": {
      "autoplay": true | false,
      "interval": 3000
    }
  }
}
```

### 예시: 다양한 배너 타입

```json
{
  "product-banner": {
    "type": "slide",
    "items": [
      { "image_url": "https://example.com/product1.jpg" },
      { "image_url": "https://example.com/product2.jpg" },
      { "image_url": "https://example.com/product3.jpg" }
    ],
    "settings": {
      "autoplay": true,
      "interval": 4000
    }
  },
  "promotion-banner": {
    "type": "long",
    "items": [
      { "image_url": "https://example.com/promo1.jpg" },
      { "image_url": "https://example.com/promo2.jpg" }
    ],
    "settings": {
      "autoplay": true,
      "interval": 2500
    }
  },
  "hero-banner": {
    "type": "fullscreen",
    "items": [{ "image_url": "https://example.com/hero.jpg" }],
    "settings": {
      "autoplay": false
    }
  }
}
```

## 🎨 로컬 이미지 사용하기

### 방법: public 폴더에 이미지 저장

1. 이미지를 `public/images/` 폴더에 저장

```
public/
└── images/
    ├── banner1.jpg
    ├── banner2.jpg
    └── banner3.jpg
```

2. mock-data.json에서 참조

```json
{
  "local-banner": {
    "type": "slide",
    "items": [
      { "image_url": "/images/banner1.jpg" },
      { "image_url": "/images/banner2.jpg" },
      { "image_url": "/images/banner3.jpg" }
    ]
  }
}
```

## ✅ 체크리스트

- [ ] npm run dev 실행
- [ ] http://localhost:3000/test-local.html 접속
- [ ] 콘솔에서 "로컬 테스트 데이터 로드 완료" 확인
- [ ] 슬라이드 배너 동작 확인
- [ ] 롱배너 동작 확인
- [ ] 풀스크린 배너 버튼 클릭 확인
- [ ] mock-data.json 수정 후 새로고침 → 반영 확인

## 🚀 실제 API 연결하기

로컬 테스트 완료 후:

1. Supabase 설정 완료
2. `.env.local` 파일 생성
3. `npm run dev` 재시작
4. `/admin` 페이지에서 실제 배너 생성
5. API 자동으로 연결됨!

## 💡 팁

- **빠른 테스트**: mock-data.json 수정이 가장 빠름
- **디버깅**: 브라우저 콘솔에서 로그 확인
- **이미지**: Unsplash 같은 무료 이미지 서비스 활용
- **캐시**: Ctrl+Shift+R로 강력 새로고침

## 🆘 문제 해결

### 배너가 안 보여요

```
✅ 콘솔 확인: "로컬 테스트 데이터 로드 완료" 메시지 있나요?
✅ mock-data.json 파일 있나요?
✅ banner-id가 mock-data.json의 키와 일치하나요?
```

### 이미지가 안 나와요

```
✅ 이미지 URL이 올바른가요?
✅ 외부 이미지라면 HTTPS인가요?
✅ 로컬 이미지라면 public/ 폴더에 있나요?
```

### 수정이 반영 안 돼요

```
✅ Ctrl+Shift+R로 강력 새로고침
✅ JSON 형식이 올바른가요? (쉼표, 중괄호 확인)
```
