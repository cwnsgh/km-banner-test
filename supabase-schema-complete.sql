-- ============================================
-- 웹에이전시 배너 관리 시스템 DB 스키마
-- ============================================

-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 고객사 테이블
-- ============================================
CREATE TABLE banner_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id TEXT UNIQUE NOT NULL,           -- 고객 식별자 (예: "company-a")
  client_name TEXT NOT NULL,                -- 회사명
  email TEXT NOT NULL,
  phone TEXT,
  plan_type TEXT DEFAULT 'basic',           -- basic, pro, enterprise
  max_banners INTEGER DEFAULT 2,            -- 최대 배너 개수
  status TEXT DEFAULT 'active',             -- active, suspended, cancelled
  contract_start_date TIMESTAMP WITH TIME ZONE,
  contract_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_clients_client_id ON banner_clients(client_id);
CREATE INDEX idx_banner_clients_status ON banner_clients(status);

-- ============================================
-- 2. 사용자 계정 테이블 (고객사 관리자)
-- ============================================
CREATE TABLE banner_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES banner_clients(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,              -- bcrypt 해시
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',                -- admin, user
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_users_client_id ON banner_users(client_id);
CREATE INDEX idx_banner_users_email ON banner_users(email);

-- ============================================
-- 3. 배너 템플릿 테이블 (에이전시가 제공하는 템플릿)
-- ============================================
CREATE TABLE banner_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_key TEXT UNIQUE NOT NULL,        -- slide, long, square, vertical
  template_name TEXT NOT NULL,              -- "슬라이드 배너", "롱배너"
  description TEXT,
  css_class TEXT NOT NULL,                  -- banner-slide, banner-long
  default_width INTEGER,                    -- 1200
  default_height INTEGER,                   -- 500
  recommended_image_count INTEGER,          -- 권장 이미지 개수
  thumbnail_url TEXT,                       -- 템플릿 미리보기 이미지
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_templates_template_key ON banner_templates(template_key);
CREATE INDEX idx_banner_templates_is_active ON banner_templates(is_active);

-- ============================================
-- 4. 배너 인스턴스 테이블 (고객이 만든 실제 배너)
-- ============================================
CREATE TABLE banner_instances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_id TEXT UNIQUE NOT NULL,           -- 외부 노출 ID (company-a-main)
  client_id UUID REFERENCES banner_clients(id) ON DELETE CASCADE,
  template_id UUID REFERENCES banner_templates(id),
  name TEXT NOT NULL,                       -- "메인 슬라이드", "프로모션 배너"
  settings JSONB DEFAULT '{}',              -- 자동재생, 간격 등
  status TEXT DEFAULT 'active',             -- active, draft, archived
  view_count INTEGER DEFAULT 0,             -- 조회수 (선택)
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_instances_banner_id ON banner_instances(banner_id);
CREATE INDEX idx_banner_instances_client_id ON banner_instances(client_id);
CREATE INDEX idx_banner_instances_status ON banner_instances(status);

-- ============================================
-- 5. 배너 아이템 테이블 (배너의 이미지들)
-- ============================================
CREATE TABLE banner_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES banner_instances(id) ON DELETE CASCADE,
  image_url TEXT,
  video_url TEXT,
  link_url TEXT,
  alt_text TEXT,                            -- 이미지 설명
  "order" INTEGER NOT NULL DEFAULT 0,       -- 순서
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_items_instance_id ON banner_items(instance_id);
CREATE INDEX idx_banner_items_order ON banner_items("order");

-- ============================================
-- 6. 배너 통계 테이블 (선택사항)
-- ============================================
CREATE TABLE banner_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES banner_instances(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,                 -- view, click
  item_index INTEGER,                       -- 몇 번째 이미지
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_banner_analytics_instance_id ON banner_analytics(instance_id);
CREATE INDEX idx_banner_analytics_event_type ON banner_analytics(event_type);
CREATE INDEX idx_banner_analytics_created_at ON banner_analytics(created_at);

-- ============================================
-- RLS (Row Level Security) 설정
-- ============================================

-- 고객사 테이블
ALTER TABLE banner_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view own data" ON banner_clients
  FOR SELECT USING (auth.uid() IN (
    SELECT id FROM banner_users WHERE client_id = banner_clients.id
  ));

-- 사용자 테이블
ALTER TABLE banner_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own data" ON banner_users
  FOR SELECT USING (auth.uid() = id);

-- 템플릿 테이블 (모두 읽기 가능)
ALTER TABLE banner_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Templates are viewable by all authenticated users" ON banner_templates
  FOR SELECT USING (is_active = true);

-- 배너 인스턴스
ALTER TABLE banner_instances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own client banners" ON banner_instances
  FOR SELECT USING (client_id IN (
    SELECT client_id FROM banner_users WHERE id = auth.uid()
  ));
CREATE POLICY "Users can insert own client banners" ON banner_instances
  FOR INSERT WITH CHECK (client_id IN (
    SELECT client_id FROM banner_users WHERE id = auth.uid()
  ));
CREATE POLICY "Users can update own client banners" ON banner_instances
  FOR UPDATE USING (client_id IN (
    SELECT client_id FROM banner_users WHERE id = auth.uid()
  ));

-- 배너 아이템 (공개 읽기)
ALTER TABLE banner_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Banner items are publicly viewable" ON banner_items
  FOR SELECT USING (true);
CREATE POLICY "Users can manage own banner items" ON banner_items
  FOR ALL USING (instance_id IN (
    SELECT id FROM banner_instances WHERE client_id IN (
      SELECT client_id FROM banner_users WHERE id = auth.uid()
    )
  ));

-- 통계 (공개 쓰기, 제한된 읽기)
ALTER TABLE banner_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Analytics are publicly writable" ON banner_analytics
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own analytics" ON banner_analytics
  FOR SELECT USING (instance_id IN (
    SELECT id FROM banner_instances WHERE client_id IN (
      SELECT client_id FROM banner_users WHERE id = auth.uid()
    )
  ));

-- ============================================
-- Storage Bucket (이미지 저장소)
-- ============================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('banner-images', 'banner-images', true)
ON CONFLICT DO NOTHING;

-- Storage Policy
CREATE POLICY "Banner images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'banner-images');

CREATE POLICY "Authenticated users can upload banner images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'banner-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete own banner images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'banner-images' 
    AND auth.role() = 'authenticated'
  );

-- ============================================
-- 초기 데이터 삽입
-- ============================================

-- 기본 템플릿 데이터
INSERT INTO banner_templates (template_key, template_name, description, css_class, default_width, default_height, recommended_image_count, sort_order) VALUES
('slide', '슬라이드 배너', '중앙 정렬된 이미지 슬라이드', 'banner-slide', 1200, 500, 3, 1),
('long', '롱배너', '가로 전체를 사용하는 배너', 'banner-long', NULL, 300, 2, 2),
('fullscreen', '전체화면 배너', '화면 전체를 덮는 배너', 'banner-fullscreen', NULL, NULL, 3, 3),
('square', '정사각형 배너', '정사각형 형태의 배너', 'banner-square', 400, 400, 2, 4),
('vertical', '세로 배너', '세로로 긴 배너', 'banner-vertical', 300, 600, 2, 5);

-- 테스트 고객사 (개발용)
INSERT INTO banner_clients (client_id, client_name, email, plan_type, max_banners, status)
VALUES ('test-company', '테스트 회사', 'test@example.com', 'pro', 10, 'active');

-- ============================================
-- 트리거: updated_at 자동 업데이트
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_banner_clients_updated_at BEFORE UPDATE ON banner_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_users_updated_at BEFORE UPDATE ON banner_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_templates_updated_at BEFORE UPDATE ON banner_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_instances_updated_at BEFORE UPDATE ON banner_instances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_items_updated_at BEFORE UPDATE ON banner_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 뷰: 배너 상세 정보 (JOIN 간편화)
-- ============================================
CREATE OR REPLACE VIEW banner_details AS
SELECT 
  bi.id,
  bi.banner_id,
  bi.name,
  bi.settings,
  bi.status,
  bi.view_count,
  bi.created_at,
  bi.updated_at,
  bt.template_key AS type,
  bt.template_name,
  bt.css_class,
  bc.client_id AS client_code,
  bc.client_name,
  (
    SELECT json_agg(
      json_build_object(
        'id', item.id,
        'image_url', item.image_url,
        'video_url', item.video_url,
        'link_url', item.link_url,
        'order', item."order"
      ) ORDER BY item."order"
    )
    FROM banner_items item
    WHERE item.instance_id = bi.id AND item.is_active = true
  ) AS items
FROM banner_instances bi
JOIN banner_templates bt ON bi.template_id = bt.id
JOIN banner_clients bc ON bi.client_id = bc.id
WHERE bi.status = 'active';

-- ============================================
-- 완료!
-- ============================================

