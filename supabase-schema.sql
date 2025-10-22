-- 배너 테이블
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('fullscreen', 'slide', 'long')),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 배너 아이템 테이블
CREATE TABLE banner_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_id UUID REFERENCES banners(id) ON DELETE CASCADE,
  image_url TEXT,
  video_url TEXT,
  link_url TEXT,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_items_banner_id ON banner_items(banner_id);
CREATE INDEX idx_banner_items_order ON banner_items("order");

-- RLS (Row Level Security) 활성화
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE banner_items ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 설정 (공개)
CREATE POLICY "Allow public read access" ON banners FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON banner_items FOR SELECT USING (true);

-- 인증된 사용자만 작성/수정/삭제 가능
CREATE POLICY "Allow authenticated insert" ON banners FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON banners FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON banners FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON banner_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON banner_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON banner_items FOR DELETE USING (auth.role() = 'authenticated');

-- Storage bucket for banner images
INSERT INTO storage.buckets (id, name, public) VALUES ('banners', 'banners', true);

-- Storage policy
CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING (bucket_id = 'banners');
CREATE POLICY "Allow authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'banners' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON storage.objects FOR DELETE USING (bucket_id = 'banners' AND auth.role() = 'authenticated');


