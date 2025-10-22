-- ============================================
-- 간단한 배너 시스템 DB (빠른 시작용)
-- ============================================

-- UUID 확장
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 배너 테이블
CREATE TABLE banner_instances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_id TEXT UNIQUE NOT NULL,           -- 외부 노출 ID (company-a-main)
  name TEXT NOT NULL,                       -- 배너 이름
  type TEXT NOT NULL,                       -- slide, long, fullscreen
  settings JSONB DEFAULT '{"autoplay": true, "interval": 3000}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 배너 아이템 테이블 (이미지들)
CREATE TABLE banner_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES banner_instances(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  video_url TEXT,
  link_url TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_instances_banner_id ON banner_instances(banner_id);
CREATE INDEX idx_banner_items_instance_id ON banner_items(instance_id);
CREATE INDEX idx_banner_items_order ON banner_items("order");

-- RLS 활성화 (보안)
ALTER TABLE banner_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE banner_items ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (위젯에서 접근 가능)
CREATE POLICY "Public read access" ON banner_instances FOR SELECT USING (true);
CREATE POLICY "Public read access" ON banner_items FOR SELECT USING (true);

-- 인증된 사용자만 쓰기 (관리자 페이지)
CREATE POLICY "Authenticated insert" ON banner_instances FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update" ON banner_instances FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete" ON banner_instances FOR DELETE USING (true);

CREATE POLICY "Authenticated insert" ON banner_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update" ON banner_items FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete" ON banner_items FOR DELETE USING (true);

-- Storage Bucket (이미지 저장)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('banner-images', 'banner-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage 정책
CREATE POLICY "Public read" ON storage.objects FOR SELECT USING (bucket_id = 'banner-images');
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'banner-images');
CREATE POLICY "Authenticated delete" ON storage.objects FOR DELETE USING (bucket_id = 'banner-images');

-- 테스트 데이터 (선택)
INSERT INTO banner_instances (banner_id, name, type, settings)
VALUES ('test-slide', '테스트 슬라이드', 'slide', '{"autoplay": true, "interval": 3000}');

INSERT INTO banner_items (instance_id, image_url, "order")
VALUES 
  ((SELECT id FROM banner_instances WHERE banner_id = 'test-slide'), 
   'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200', 0),
  ((SELECT id FROM banner_instances WHERE banner_id = 'test-slide'), 
   'https://images.unsplash.com/photo-1526512340740-9217d0159da9?w=1200', 1),
  ((SELECT id FROM banner_instances WHERE banner_id = 'test-slide'), 
   'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200', 2);

-- 완료!
SELECT 'Database setup complete!' as status;

