(function () {
  "use strict";

  // ============================================
  // 🎨 CSS 스타일 자동 주입
  // ============================================
  const CSS = `
    /* 배너 컨테이너 공통 스타일 */
    [data-banner-id] {
      position: relative;
      overflow: hidden;
    }

    /* 슬라이드 배너 */
    .banner-slide {
      width: 100%;
      max-width: 1200px;
      height: 500px;
      margin: 0 auto;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* 롱배너 */
    .banner-long {
      width: 100%;
      height: 300px;
    }

    /* 풀스크린 배너 */
    .banner-fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      background: #000;
    }

    /* 커스텀 배너 예시: 정사각형 배너 */
    .banner-square {
      width: 400px;
      height: 400px;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* 커스텀 배너 예시: 세로 배너 */
    .banner-vertical {
      width: 300px;
      height: 600px;
      margin: 0 auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* 🎠 캐러셀 배너 - 3개 이미지 무한 슬라이드 */
    .banner-carousel {
      width: 100%;
      max-width: 1200px;
      height: 300px;
      margin: 0 auto;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      position: relative;
    }

    .banner-carousel .banner-slide {
      display: flex;
      width: 300%; /* 3개 이미지 = 300% */
      height: 100%;
      animation: carousel-slide 15s infinite linear;
    }

    .banner-carousel .banner-image {
      width: 33.333%; /* 100% / 3개 */
      height: 100%;
      object-fit: contain; /* 잘림 방지 - contain으로 변경 */
      flex-shrink: 0;
      position: relative;
      opacity: 1;
      background: #f8f9fa; /* 배경색 추가 */
    }

    /* 무한 슬라이드 애니메이션 */
    @keyframes carousel-slide {
      0% { transform: translateX(0); }
      25% { transform: translateX(0); }
      33.333% { transform: translateX(-33.333%); }
      58.333% { transform: translateX(-33.333%); }
      66.666% { transform: translateX(-66.666%); }
      91.666% { transform: translateX(-66.666%); }
      100% { transform: translateX(0); }
    }

    /* 호버 시 일시정지 */
    .banner-carousel:hover .banner-slide {
      animation-play-state: paused;
    }

    /* 캐러셀 인디케이터 */
    .banner-carousel .banner-pagination {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 10;
    }

    .banner-carousel .banner-pagination .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .banner-carousel .banner-pagination .dot.active {
      background: white;
      transform: scale(1.2);
    }

    /* 이미지 공통 스타일 */
    .banner-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .banner-image.active {
      opacity: 1;
      z-index: 1;
    }

    /* 네비게이션 버튼 */
    .banner-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.8);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      z-index: 10;
      transition: background 0.3s;
    }

    .banner-nav:hover {
      background: rgba(255, 255, 255, 1);
    }

    .banner-nav.prev {
      left: 20px;
    }

    .banner-nav.next {
      right: 20px;
    }

    /* 페이지네이션 */
    .banner-pagination {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 10;
    }

    .banner-pagination .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.3s;
    }

    .banner-pagination .dot.active {
      width: 24px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 1);
    }

    /* 모바일 반응형 */
    @media (max-width: 768px) {
      .banner-slide {
        height: 300px;
      }
      .banner-long {
        height: 200px;
      }
    }
  `;

  // CSS 주입
  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  // ============================================
  // 🌐 스크립트 도메인 자동 감지
  // ============================================
  function getScriptBaseUrl() {
    // 현재 실행 중인 스크립트의 URL 찾기
    const scripts = document.querySelectorAll(
      'script[src*="banner-script.js"]'
    );
    if (scripts.length > 0) {
      const scriptUrl = scripts[scripts.length - 1].src;
      const url = new URL(scriptUrl);
      return `${url.protocol}//${url.host}`;
    }
    // 기본값
    return window.location.origin;
  }

  const BASE_URL = getScriptBaseUrl();
  console.log("🔗 배너 API 베이스 URL:", BASE_URL);

  // ============================================
  // 🎯 배너 클래스
  // ============================================
  class Banner {
    constructor(container) {
      this.container = container;
      this.bannerId = container.dataset.bannerId;
      this.currentIndex = 0;
      this.intervalId = null;
      this.data = null;

      this.init();
    }

    async init() {
      // API에서 배너 데이터 가져오기
      await this.fetchData();

      if (!this.data || !this.data.images || this.data.images.length === 0) {
        console.error(
          `❌ 배너 데이터가 없거나 이미지가 없습니다: ${this.bannerId}`
        );
        this.container.innerHTML =
          '<div style="padding: 20px; background: #fee; border: 2px dashed red; text-align: center;">배너를 찾을 수 없습니다.<br>banner_id: ' +
          this.bannerId +
          "</div>";
        return;
      }

      // 배너 타입에 따라 클래스 적용
      this.container.className = this.data.banner_type || "banner-slide";

      // 이미지 생성
      this.createImages();

      // 네비게이션 추가 (캐러셀 제외)
      if (
        this.data.images.length > 1 &&
        this.data.banner_type !== "banner-carousel"
      ) {
        this.createNavigation();
        this.createPagination();
      }

      // 자동재생 (캐러셀은 CSS 애니메이션으로 자동)
      if (
        this.data.settings?.autoplay &&
        this.data.banner_type !== "banner-carousel"
      ) {
        this.startAutoplay();
      }

      // 첫 이미지 활성화 (캐러셀 제외)
      if (this.data.banner_type !== "banner-carousel") {
        this.updateActive();
      }

      console.log(`✅ 배너 로드 완료: ${this.bannerId}`);
    }

    async fetchData() {
      try {
        // API 호출 (스크립트 도메인 사용)
        const apiUrl = `${BASE_URL}/api/banners/${this.bannerId}`;
        console.log("📡 API 호출:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 데이터 변환
        this.data = {
          banner_type: this.getBannerTypeClass(data.type),
          images: data.items
            .map((item) => item.image_url || item.video_url)
            .filter(Boolean),
          settings: data.settings || {},
        };

        console.log("✅ API 데이터 로드 완료:", this.data);
      } catch (error) {
        console.warn("⚠️ API 연결 실패:", error.message);
        console.log("🔄 Mock 데이터 시도...");

        // API 실패 시 로컬 mock 데이터 사용
        await this.loadMockData();
      }
    }

    async loadMockData() {
      try {
        const mockUrl = `${BASE_URL}/mock-data.json`;
        console.log("📡 Mock 데이터 호출:", mockUrl);

        const response = await fetch(mockUrl);

        if (!response.ok) {
          throw new Error(`Mock 데이터 로드 실패: ${response.status}`);
        }

        const mockData = await response.json();
        const data = mockData[this.bannerId];

        if (!data) {
          throw new Error(`Mock 데이터를 찾을 수 없습니다: ${this.bannerId}`);
        }

        this.data = {
          banner_type: this.getBannerTypeClass(data.type),
          images: data.items.map((item) => item.image_url).filter(Boolean),
          settings: data.settings || {},
        };

        console.log("✅ Mock 데이터 로드 완료:", this.data);
      } catch (error) {
        console.error("❌ Mock 데이터 로드 실패:", error.message);
        console.error(
          "💡 배너 데이터를 찾을 수 없습니다. banner_id를 확인하세요:",
          this.bannerId
        );
      }
    }

    getBannerTypeClass(type) {
      const typeMap = {
        slide: "banner-slide",
        long: "banner-long",
        fullscreen: "banner-fullscreen",
        square: "banner-square", // 정사각형 배너
        vertical: "banner-vertical", // 세로 배너
        carousel: "banner-carousel", // 캐러셀 배너 (3개 무한 슬라이드)
      };
      return typeMap[type] || "banner-slide";
    }

    createImages() {
      // 캐러셀 배너인 경우 특별 처리
      if (this.data.banner_type === "banner-carousel") {
        this.createCarouselImages();
      } else {
        this.data.images.forEach((imageUrl, index) => {
          const img = document.createElement("img");
          img.src = imageUrl;
          img.className = "banner-image";
          img.alt = `Banner ${index + 1}`;
          this.container.appendChild(img);
        });
      }

      this.images = this.container.querySelectorAll(".banner-image");
    }

    createCarouselImages() {
      // 캐러셀용 슬라이드 컨테이너 생성
      const slideContainer = document.createElement("div");
      slideContainer.className = "banner-slide";

      // 3개 이미지만 사용 (캐러셀은 정확히 3개)
      const imagesToUse = this.data.images.slice(0, 3);

      imagesToUse.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "banner-image";
        img.alt = `Carousel ${index + 1}`;
        slideContainer.appendChild(img);
      });

      this.container.appendChild(slideContainer);
    }

    createNavigation() {
      const prevBtn = document.createElement("button");
      prevBtn.className = "banner-nav prev";
      prevBtn.innerHTML = "‹";
      prevBtn.onclick = () => this.prev();

      const nextBtn = document.createElement("button");
      nextBtn.className = "banner-nav next";
      nextBtn.innerHTML = "›";
      nextBtn.onclick = () => this.next();

      this.container.appendChild(prevBtn);
      this.container.appendChild(nextBtn);
    }

    createPagination() {
      const pagination = document.createElement("div");
      pagination.className = "banner-pagination";

      this.data.images.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.onclick = () => this.goTo(index);
        pagination.appendChild(dot);
      });

      this.container.appendChild(pagination);
      this.dots = pagination.querySelectorAll(".dot");
    }

    updateActive() {
      this.images.forEach((img, index) => {
        if (index === this.currentIndex) {
          img.classList.add("active");
        } else {
          img.classList.remove("active");
        }
      });

      if (this.dots) {
        this.dots.forEach((dot, index) => {
          if (index === this.currentIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }
    }

    goTo(index) {
      this.currentIndex = index;
      this.updateActive();
      this.resetAutoplay();
    }

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.data.images.length;
      this.updateActive();
      this.resetAutoplay();
    }

    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.data.images.length) %
        this.data.images.length;
      this.updateActive();
      this.resetAutoplay();
    }

    startAutoplay() {
      this.intervalId = setInterval(() => {
        this.next();
      }, this.data.settings.interval || 3000);
    }

    stopAutoplay() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

    resetAutoplay() {
      if (this.data.settings?.autoplay) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    }
  }

  // ============================================
  // 🚀 초기화
  // ============================================
  async function initBanners() {
    const bannerContainers = document.querySelectorAll(
      "[data-banner-id]:not([data-initialized])"
    );

    for (const container of bannerContainers) {
      await new Banner(container);
      container.dataset.initialized = "true";
    }

    console.log(`✅ ${bannerContainers.length}개의 배너가 초기화되었습니다!`);
  }

  // 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBanners);
  } else {
    initBanners();
  }
})();
