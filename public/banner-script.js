(function () {
  "use strict";

  // ============================================
  // 🎨 CSS는 외부 파일 사용 (banner-style.css)
  // ============================================

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
