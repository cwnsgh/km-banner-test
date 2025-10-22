# 🖼️ 이미지 URL 소스 추천

## 🎨 무료 이미지 사이트

### 1. Unsplash (추천!)

```
https://unsplash.com

사용법:
1. 원하는 이미지 검색
2. 이미지 클릭
3. 우클릭 → "이미지 주소 복사"
4. 배너 폼에 붙여넣기

예시:
https://images.unsplash.com/photo-1557821552-17105176677c?w=1200
```

### 2. Pexels

```
https://pexels.com

고화질 무료 이미지
상업적 사용 가능
```

### 3. Pixabay

```
https://pixabay.com

다양한 이미지
무료, 저작권 걱정 없음
```

## 🎥 동영상 URL

### YouTube

```
1. 동영상 페이지 열기
2. 주소창 URL 복사

예시:
https://youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

### Vimeo

```
https://vimeo.com

예시:
https://vimeo.com/123456789
```

## 💾 자체 호스팅

### GitHub Pages

```
1. GitHub 레포지토리에 이미지 업로드
2. Raw URL 복사

예시:
https://raw.githubusercontent.com/user/repo/main/images/banner.jpg
```

### Imgur

```
1. https://imgur.com 접속
2. 이미지 업로드
3. "Copy Link" 클릭

예시:
https://i.imgur.com/AbCd123.jpg
```

### Cloudinary (무료 25GB)

```
1. https://cloudinary.com 가입
2. Media Library → Upload
3. URL 복사

예시:
https://res.cloudinary.com/demo/image/upload/sample.jpg
```

## 🎯 배너 타입별 권장 크기

### 슬라이드 배너

```
크기: 1200 x 500~600px
URL 예시:
https://images.unsplash.com/photo-xxx?w=1200&h=600&fit=crop
```

### 롱배너

```
크기: 1600 x 300~400px
URL 예시:
https://images.unsplash.com/photo-xxx?w=1600&h=400&fit=crop
```

### 전체화면

```
크기: 1920 x 1080px
URL 예시:
https://images.unsplash.com/photo-xxx?w=1920&h=1080&fit=crop
```

### 정사각형

```
크기: 600 x 600px
URL 예시:
https://images.unsplash.com/photo-xxx?w=600&h=600&fit=crop
```

## 💡 Unsplash 사용 팁

### URL 파라미터로 크기 조정

```
원본:
https://images.unsplash.com/photo-1234567890

크기 조정:
https://images.unsplash.com/photo-1234567890?w=1200
https://images.unsplash.com/photo-1234567890?w=1200&h=600
https://images.unsplash.com/photo-1234567890?w=1200&h=600&fit=crop
```

### 파라미터 설명

```
w=1200        # 너비
h=600         # 높이
fit=crop      # 크롭
q=80          # 품질 (1-100)
auto=format   # 자동 포맷 (WebP 등)
```

## 🔒 저작권 주의사항

### ✅ 안전한 소스

- Unsplash, Pexels, Pixabay (무료, 상업적 사용 가능)
- 자체 제작 이미지
- 구매한 스톡 이미지

### ❌ 위험한 소스

- Google 이미지 검색 (저작권 확인 필요)
- 다른 사이트 이미지 무단 사용
- 워터마크 있는 이미지

## 🚀 빠른 테스트용 이미지

### 슬라이드 배너용 (3개)

```
https://images.unsplash.com/photo-1557821552-17105176677c?w=1200
https://images.unsplash.com/photo-1526512340740-9217d0159da9?w=1200
https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200
```

### 롱배너용 (2개)

```
https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=400&fit=crop
https://images.unsplash.com/photo-1526512340740-9217d0159da9?w=1600&h=400&fit=crop
```

### 전체화면용 (3개)

```
https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop
https://images.unsplash.com/photo-1526512340740-9217d0159da9?w=1920&h=1080&fit=crop
https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=1080&fit=crop
```

## 💰 비용 절감

### Before (이미지 업로드)

```
Supabase Storage: 1GB 제한
이미지당 300KB → 3,000개 제한
```

### After (URL 사용)

```
Supabase Storage: 0 사용! 💰
이미지 개수: 무제한! ∞
외부 CDN 활용
```

## 🎉 장점

1. ✅ **무제한 이미지** - Storage 용량 안 씀
2. ✅ **빠른 로딩** - CDN 활용
3. ✅ **간단함** - 복붙만 하면 됨
4. ✅ **비용 0** - 무료!
