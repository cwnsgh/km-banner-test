# 🧪 배너 테스트 가이드

## 📁 핵심 파일 3개

1. **test.html** - 테스트 페이지 (빈 div들만 있음)
2. **banner-style.css** - 배너 스타일 (크기, 애니메이션)
3. **banner-script.js** - 동적으로 이미지 삽입하는 스크립트

## 🚀 테스트 방법

### 1. 개발 서버 실행

```bash
npm run dev
```

### 2. 테스트 페이지 접속

```
http://localhost:3000/test.html
```

## 🎯 동작 원리

### HTML (빈 컨테이너만)

```html
<div class="banner-slide" data-banner-id="slide-banner"></div>
```

### 스크립트가 실행되면

1. `data-banner-id="slide-banner"` 찾기
2. 배너 데이터에서 이미지 URL 가져오기
3. 동적으로 `<img>` 태그 생성해서 삽입
4. 네비게이션, 페이지네이션 추가
5. 자동재생 시작

### 결과

```html
<div class="banner-slide" data-banner-id="slide-banner">
  <img src="image1.jpg" class="banner-image active" />
  <img src="image2.jpg" class="banner-image" />
  <img src="image3.jpg" class="banner-image" />
  <button class="banner-nav prev">‹</button>
  <button class="banner-nav next">›</button>
  <div class="banner-pagination">
    <div class="dot active"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>
```

## 🔧 커스터마이징

### 이미지 개수 변경

`banner-script.js`의 `BANNER_DATA` 수정:

```javascript
"slide-banner": {
  images: [
    "url1.jpg",
    "url2.jpg",
    "url3.jpg",
    "url4.jpg", // 추가!
  ],
  autoplay: true,
  interval: 3000,
}
```

### 새 배너 추가

1. HTML에 빈 div 추가

```html
<div class="banner-slide" data-banner-id="my-banner"></div>
```

2. 스크립트에 데이터 추가

```javascript
"my-banner": {
  images: ["img1.jpg", "img2.jpg"],
  autoplay: true,
  interval: 2000,
}
```

## ✅ 테스트 체크리스트

- [ ] 슬라이드 배너 3개 이미지 표시
- [ ] 자동 슬라이드 동작
- [ ] 좌우 네비게이션 버튼 클릭
- [ ] 페이지네이션 클릭
- [ ] 롱배너 2개 이미지 표시
- [ ] 풀스크린 배너 버튼 클릭 시 표시

## 🎉 다음 단계

이제 `BANNER_DATA`를 하드코딩이 아니라 **API에서 가져오도록** 변경하면 완성!
