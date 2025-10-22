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

    /* ============================================ */
    /* 🎨 다양한 배너 스타일들 */
    /* ============================================ */

    /* 1️⃣ 기본 캐러셀 - 3개 나란히 */
    .banner-carousel {
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
    }

    .banner-carousel .banner-slide {
      display: flex;
      width: 300%;
      height: 100%;
      animation: carousel-slide 15s infinite linear;
    }

    .banner-carousel .banner-image {
      width: 33.333%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
    }

    /* 2️⃣ 가로 꽉찬 롤링 배너 */
    .banner-rolling {
      width: 100%;
      height: 200px;
      overflow: hidden;
      position: relative;
      background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
    }

    .banner-rolling .banner-slide {
      display: flex;
      width: 300%;
      height: 100%;
      animation: rolling-slide 20s infinite linear;
    }

    .banner-rolling .banner-image {
      width: 33.333%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
      border-right: 2px solid white;
    }

    /* 3️⃣ 세로 스택 배너 */
    .banner-stack {
      width: 100%;
      height: 400px;
      overflow: hidden;
      position: relative;
    }

    .banner-stack .banner-slide {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 300%;
      animation: stack-slide 18s infinite linear;
    }

    .banner-stack .banner-image {
      width: 100%;
      height: 33.333%;
      object-fit: cover;
      flex-shrink: 0;
    }

    /* 4️⃣ 그리드 배너 (2x2) */
    .banner-grid {
      width: 100%;
      height: 400px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px;
      overflow: hidden;
    }

    .banner-grid .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    .banner-grid .banner-image:hover {
      transform: scale(1.05);
    }

    /* 5️⃣ 원형 회전 배너 */
    .banner-circular {
      width: 400px;
      height: 400px;
      margin: 0 auto;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
    }

    .banner-circular .banner-slide {
      width: 100%;
      height: 100%;
      animation: circular-rotate 20s infinite linear;
    }

    .banner-circular .banner-image {
      position: absolute;
      width: 50%;
      height: 50%;
      object-fit: cover;
      border-radius: 50%;
    }

    .banner-circular .banner-image:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
    .banner-circular .banner-image:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); }
    .banner-circular .banner-image:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); }

    /* 6️⃣ 파노라마 배너 */
    .banner-panorama {
      width: 100%;
      height: 250px;
      overflow: hidden;
      position: relative;
      background: #000;
    }

    .banner-panorama .banner-slide {
      display: flex;
      width: 300%;
      height: 100%;
      animation: panorama-slide 25s infinite linear;
    }

    .banner-panorama .banner-image {
      width: 33.333%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
      filter: brightness(0.8);
      transition: filter 0.3s ease;
    }

    .banner-panorama .banner-image:hover {
      filter: brightness(1.1);
    }

    /* 7️⃣ 카드 스타일 배너 */
    .banner-cards {
      width: 100%;
      height: 300px;
      display: flex;
      gap: 20px;
      padding: 20px;
      overflow-x: auto;
      scroll-behavior: smooth;
    }

    .banner-cards .banner-image {
      min-width: 300px;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease;
    }

    .banner-cards .banner-image:hover {
      transform: translateY(-5px);
    }

    /* 8️⃣ 모자이크 배너 */
    .banner-mosaic {
      width: 100%;
      height: 400px;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 5px;
      overflow: hidden;
    }

    .banner-mosaic .banner-image:nth-child(1) {
      grid-row: 1 / 3;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .banner-mosaic .banner-image:nth-child(2),
    .banner-mosaic .banner-image:nth-child(3) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* 9️⃣ 페이드 배너 */
    .banner-fade {
      width: 100%;
      height: 300px;
      position: relative;
      overflow: hidden;
    }

    .banner-fade .banner-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }

    .banner-fade .banner-image.active {
      opacity: 1;
    }

    /* 🔟 슬라이딩 도어 배너 */
    .banner-doors {
      width: 100%;
      height: 300px;
      overflow: hidden;
      position: relative;
    }

    .banner-doors .banner-slide {
      display: flex;
      width: 300%;
      height: 100%;
      animation: doors-slide 12s infinite ease-in-out;
    }

    .banner-doors .banner-image {
      width: 33.333%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }

    .banner-doors .banner-image:nth-child(2) {
      clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
    }

    .banner-doors .banner-image:nth-child(3) {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    /* ============================================ */
    /* 🎬 애니메이션 키프레임들 */
    /* ============================================ */

    @keyframes carousel-slide {
      0% { transform: translateX(0); }
      25% { transform: translateX(0); }
      33.333% { transform: translateX(-33.333%); }
      58.333% { transform: translateX(-33.333%); }
      66.666% { transform: translateX(-66.666%); }
      91.666% { transform: translateX(-66.666%); }
      100% { transform: translateX(0); }
    }

    @keyframes rolling-slide {
      0% { transform: translateX(0); }
      100% { transform: translateX(-66.666%); }
    }

    @keyframes stack-slide {
      0% { transform: translateY(0); }
      25% { transform: translateY(0); }
      33.333% { transform: translateY(-33.333%); }
      58.333% { transform: translateY(-33.333%); }
      66.666% { transform: translateY(-66.666%); }
      91.666% { transform: translateY(-66.666%); }
      100% { transform: translateY(0); }
    }

    @keyframes circular-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes panorama-slide {
      0% { transform: translateX(0); }
      100% { transform: translateX(-66.666%); }
    }

    @keyframes doors-slide {
      0% { transform: translateX(0); }
      25% { transform: translateX(0); }
      50% { transform: translateX(-33.333%); }
      75% { transform: translateX(-33.333%); }
      100% { transform: translateX(-66.666%); }
    }

    /* ============================================ */
    /* 🎯 공통 컨트롤 스타일 */
    /* ============================================ */

    /* 호버 시 일시정지 */
    .banner-carousel:hover .banner-slide,
    .banner-rolling:hover .banner-slide,
    .banner-stack:hover .banner-slide,
    .banner-panorama:hover .banner-slide,
    .banner-doors:hover .banner-slide {
      animation-play-state: paused;
    }

    /* 인디케이터 */
    .banner-pagination {
      position: absolute;
      bottom: 15px;
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
      background: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .banner-pagination .dot.active {
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
        square: "banner-square",
        vertical: "banner-vertical",
        carousel: "banner-carousel",
        rolling: "banner-rolling",
        stack: "banner-stack",
        grid: "banner-grid",
        circular: "banner-circular",
        panorama: "banner-panorama",
        cards: "banner-cards",
        mosaic: "banner-mosaic",
        fade: "banner-fade",
        doors: "banner-doors",
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
