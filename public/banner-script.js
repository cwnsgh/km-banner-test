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
      width: 100%;
      max-width: 1200px;
      margin: 20px auto;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }

    [data-banner-id]:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    /* 슬라이드 배너 - 고정 크기 */
    .banner-slide {
      height: 500px !important;
      max-height: 500px !important;
      min-height: 500px !important;
    }

    /* 롱배너 - 고정 크기 */
    .banner-long {
      height: 200px !important;
      max-height: 200px !important;
      min-height: 200px !important;
    }

    /* 풀스크린 배너 */
    .banner-fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
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
    /* 🎯 실제 사용 가능한 배너 스타일들 */
    /* ============================================ */

    /* 1️⃣ 메인 슬라이드 배너 (가로 꽉찬) - 가장 많이 사용 */
    .banner-main-slide {
      width: 100%;
      height: 400px;
      overflow: hidden;
      position: relative;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .banner-main-slide .banner-slide {
      display: flex;
      width: 300%;
      height: 100%;
      animation: main-slide 8s infinite ease-in-out;
    }

    .banner-main-slide .banner-image {
      width: 33.333%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
    }

    /* 2️⃣ 3개 나란히 배너 (상품 소개용) */
    .banner-three-grid {
      width: 100%;
      height: 300px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .banner-three-grid .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }

    .banner-three-grid .banner-image:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    /* 3️⃣ 롤링 배너 (연속 슬라이드) - 할인/이벤트용 */
    .banner-rolling {
      width: 100%;
      height: 200px;
      overflow: hidden;
      position: relative;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
    }

    .banner-rolling .banner-slide {
      display: flex;
      width: 300%;
      height: 100%;
      animation: rolling-slide 15s infinite linear;
    }

    .banner-rolling .banner-image {
      width: 33.333%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
      border-right: 3px solid rgba(255, 255, 255, 0.3);
    }

    /* 4️⃣ 카드 스타일 배너 (상품 갤러리용) */
    .banner-cards {
      width: 100%;
      height: 250px;
      display: flex;
      gap: 20px;
      padding: 20px;
      overflow-x: auto;
      scroll-behavior: smooth;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .banner-cards .banner-image {
      min-width: 200px;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .banner-cards .banner-image:hover {
      transform: scale(1.05);
    }

    /* 5️⃣ 페이드 배너 (브랜드 소개용) */
    .banner-fade {
      width: 100%;
      height: 350px;
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .banner-fade .banner-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 2s ease-in-out;
    }

    .banner-fade .banner-image.active {
      opacity: 1;
    }

    /* 6️⃣ 2x2 그리드 배너 (카테고리 소개용) */
    .banner-grid {
      width: 100%;
      height: 400px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .banner-grid .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .banner-grid .banner-image:hover {
      transform: scale(1.02);
    }

    /* ============================================ */
    /* 🎬 실제 사용 가능한 애니메이션들 */
    /* ============================================ */

    /* 메인 슬라이드 - 부드러운 전환 */
    @keyframes main-slide {
      0% { transform: translateX(0); }
      20% { transform: translateX(0); }
      25% { transform: translateX(-33.333%); }
      45% { transform: translateX(-33.333%); }
      50% { transform: translateX(-66.666%); }
      70% { transform: translateX(-66.666%); }
      75% { transform: translateX(-100%); }
      95% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }

    /* 롤링 슬라이드 - 연속적인 움직임 */
    @keyframes rolling-slide {
      0% { transform: translateX(0); }
      100% { transform: translateX(-66.666%); }
    }

    /* 페이드 전환 - 부드러운 페이드 */
    @keyframes fade-transition {
      0% { opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { opacity: 0; }
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

    /* 이미지 공통 스타일 - 강제 크기 고정 */
    .banner-image {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .banner-image.active {
      opacity: 1 !important;
      z-index: 1;
    }

    /* 네비게이션 버튼 - 심플한 스타일 */
    .banner-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      color: white;
      z-index: 10;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }

    .banner-nav:hover {
      background: rgba(0, 0, 0, 0.7);
    }

    .banner-nav.prev {
      left: 15px;
    }

    .banner-nav.next {
      right: 15px;
    }

    /* 페이지네이션 - 심플한 도트 */
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
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .banner-pagination .dot:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    .banner-pagination .dot.active {
      background: white;
      transform: scale(1.2);
    }

    /* ============================================ */
    /* 📱 모바일 반응형 최적화 */
    /* ============================================ */
    
    @media (max-width: 768px) {
      /* 기본 배너들 - 모바일 고정 크기 */
      .banner-slide {
        height: 300px !important;
        max-height: 300px !important;
        min-height: 300px !important;
        margin: 15px auto;
      }
      
      .banner-long {
        height: 150px !important;
        max-height: 150px !important;
        min-height: 150px !important;
        margin: 15px 0;
      }

      /* 네비게이션 버튼 - 모바일 */
      .banner-nav {
        width: 35px;
        height: 35px;
        font-size: 14px;
      }

      .banner-nav.prev {
        left: 10px;
      }

      .banner-nav.next {
        right: 10px;
      }

      /* 페이지네이션 - 모바일 */
      .banner-pagination {
        bottom: 10px;
      }

      .banner-pagination .dot {
        width: 6px;
        height: 6px;
      }
    }
    
    @media (max-width: 480px) {
      /* 초소형 화면 */
      .banner-main-slide {
        height: 200px;
      }
      
      .banner-rolling {
        height: 120px;
      }
      
      .banner-cards {
        height: 180px;
        padding: 10px;
      }
      
      .banner-cards .banner-image {
        min-width: 120px;
      }
      
      .banner-fade {
        height: 200px;
      }
      
      .banner-grid {
        height: 250px;
        padding: 10px;
        gap: 6px;
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

      // 네비게이션 추가 (CSS 애니메이션 배너들 제외)
      const noNavTypes = [
        "banner-carousel",
        "banner-rolling",
        "banner-stack",
        "banner-panorama",
        "banner-doors",
        "banner-grid",
        "banner-mosaic",
        "banner-cards",
        "banner-circular",
      ];
      if (
        this.data.images.length > 1 &&
        !noNavTypes.includes(this.data.banner_type)
      ) {
        this.createNavigation();
        this.createPagination();
      }

      // 자동재생 (CSS 애니메이션 배너들 제외)
      const noAutoplayTypes = [
        "banner-carousel",
        "banner-rolling",
        "banner-stack",
        "banner-panorama",
        "banner-doors",
        "banner-grid",
        "banner-mosaic",
        "banner-cards",
        "banner-circular",
      ];
      if (
        this.data.settings?.autoplay &&
        !noAutoplayTypes.includes(this.data.banner_type)
      ) {
        this.startAutoplay();
      }

      // 첫 이미지 활성화 (CSS 애니메이션 배너들 제외)
      if (!noNavTypes.includes(this.data.banner_type)) {
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
        // 기본 배너들
        slide: "banner-slide",
        long: "banner-long",
        fullscreen: "banner-fullscreen",

        // 실제 사용 가능한 배너들
        "main-slide": "banner-main-slide", // 메인 슬라이드 (가로 꽉찬)
        "three-grid": "banner-three-grid", // 3개 나란히
        rolling: "banner-rolling", // 롤링 배너
        cards: "banner-cards", // 카드 스타일
        fade: "banner-fade", // 페이드 배너
        grid: "banner-grid", // 2x2 그리드

        // 기존 호환성
        carousel: "banner-main-slide", // 캐러셀 → 메인 슬라이드로 매핑
      };
      return typeMap[type] || "banner-slide";
    }

    createImages() {
      // 특별한 레이아웃이 필요한 배너들 처리
      if (
        this.data.banner_type === "banner-carousel" ||
        this.data.banner_type === "banner-rolling" ||
        this.data.banner_type === "banner-stack" ||
        this.data.banner_type === "banner-panorama" ||
        this.data.banner_type === "banner-doors"
      ) {
        this.createSlideImages();
      } else if (
        this.data.banner_type === "banner-grid" ||
        this.data.banner_type === "banner-mosaic"
      ) {
        this.createGridImages();
      } else if (this.data.banner_type === "banner-cards") {
        this.createCardImages();
      } else if (this.data.banner_type === "banner-circular") {
        this.createCircularImages();
      } else {
        // 기본 배너 (slide, long, fullscreen, fade 등)
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

    createSlideImages() {
      // 슬라이드 컨테이너 생성
      const slideContainer = document.createElement("div");
      slideContainer.className = "banner-slide";

      this.data.images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "banner-image";
        img.alt = `Banner ${index + 1}`;
        slideContainer.appendChild(img);
      });

      this.container.appendChild(slideContainer);
    }

    createGridImages() {
      // 그리드 배너는 직접 컨테이너에 이미지 추가
      this.data.images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "banner-image";
        img.alt = `Banner ${index + 1}`;
        this.container.appendChild(img);
      });
    }

    createCardImages() {
      // 카드 배너는 직접 컨테이너에 이미지 추가
      this.data.images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "banner-image";
        img.alt = `Banner ${index + 1}`;
        this.container.appendChild(img);
      });
    }

    createCircularImages() {
      // 원형 배너는 직접 컨테이너에 이미지 추가
      this.data.images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "banner-image";
        img.alt = `Banner ${index + 1}`;
        this.container.appendChild(img);
      });
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
