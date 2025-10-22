import imageCompression from "browser-image-compression";

/**
 * 이미지를 압축합니다
 * @param file 원본 이미지 파일
 * @param maxSizeMB 최대 크기 (MB)
 * @param maxWidthOrHeight 최대 너비/높이 (px)
 * @returns 압축된 이미지 파일
 */
export async function compressImage(
  file: File,
  maxSizeMB: number = 0.5, // 500KB
  maxWidthOrHeight: number = 1920
): Promise<File> {
  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
    fileType: "image/jpeg", // 또는 원본 유지
  };

  try {
    console.log(`원본 크기: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

    const compressedFile = await imageCompression(file, options);

    console.log(`압축 후: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(
      `절감률: ${(
        ((file.size - compressedFile.size) / file.size) *
        100
      ).toFixed(1)}%`
    );

    return compressedFile;
  } catch (error) {
    console.error("이미지 압축 실패:", error);
    return file; // 실패 시 원본 반환
  }
}

/**
 * 배너 타입에 따른 최적 크기
 */
export const BANNER_IMAGE_SIZES = {
  slide: {
    maxWidth: 1200,
    maxHeight: 600,
    maxSizeMB: 0.3, // 300KB
  },
  long: {
    maxWidth: 1600,
    maxHeight: 400,
    maxSizeMB: 0.25, // 250KB
  },
  fullscreen: {
    maxWidth: 1920,
    maxHeight: 1080,
    maxSizeMB: 0.5, // 500KB
  },
  square: {
    maxWidth: 600,
    maxHeight: 600,
    maxSizeMB: 0.2, // 200KB
  },
  vertical: {
    maxWidth: 400,
    maxHeight: 800,
    maxSizeMB: 0.3, // 300KB
  },
};

/**
 * 배너 타입에 맞게 이미지 압축
 */
export async function compressForBannerType(
  file: File,
  bannerType: keyof typeof BANNER_IMAGE_SIZES
): Promise<File> {
  const settings = BANNER_IMAGE_SIZES[bannerType] || BANNER_IMAGE_SIZES.slide;

  return compressImage(
    file,
    settings.maxSizeMB,
    Math.max(settings.maxWidth, settings.maxHeight)
  );
}
