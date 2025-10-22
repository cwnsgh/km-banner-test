# 🗄️ 데이터베이스 구조 설명

## 📊 테이블 구조 (6개)

### 1. `banner_clients` - 고객사 정보

고객사(쇼핑몰 회사) 기본 정보

| 컬럼                | 타입      | 설명                              |
| ------------------- | --------- | --------------------------------- |
| id                  | UUID      | PK                                |
| client_id           | TEXT      | 고객 식별자 (`company-a`)         |
| client_name         | TEXT      | 회사명                            |
| email               | TEXT      | 연락처 이메일                     |
| phone               | TEXT      | 전화번호                          |
| plan_type           | TEXT      | 요금제 (basic/pro/enterprise)     |
| max_banners         | INTEGER   | 최대 배너 개수                    |
| status              | TEXT      | 상태 (active/suspended/cancelled) |
| contract_start_date | TIMESTAMP | 계약 시작일                       |
| contract_end_date   | TIMESTAMP | 계약 종료일                       |

**예시 데이터:**

```sql
INSERT INTO banner_clients VALUES
(uuid(), 'company-a', 'A쇼핑몰', 'a@shop.com', 'pro', 5, 'active');
```

---

### 2. `banner_users` - 사용자 계정

고객사의 관리자 계정 (로그인용)

| 컬럼          | 타입      | 설명                |
| ------------- | --------- | ------------------- |
| id            | UUID      | PK                  |
| client_id     | UUID      | FK → banner_clients |
| email         | TEXT      | 로그인 이메일       |
| password_hash | TEXT      | 암호화된 비밀번호   |
| name          | TEXT      | 사용자 이름         |
| role          | TEXT      | 권한 (admin/user)   |
| last_login    | TIMESTAMP | 마지막 로그인       |

**예시 데이터:**

```sql
INSERT INTO banner_users VALUES
(uuid(), client_uuid, 'admin@company-a.com', 'hash...', 'John', 'admin');
```

---

### 3. `banner_templates` - 배너 템플릿

에이전시가 제공하는 배너 템플릿 (슬라이드, 롱배너 등)

| 컬럼                    | 타입    | 설명                          |
| ----------------------- | ------- | ----------------------------- |
| id                      | UUID    | PK                            |
| template_key            | TEXT    | 템플릿 키 (`slide`, `long`)   |
| template_name           | TEXT    | 템플릿 이름 ("슬라이드 배너") |
| description             | TEXT    | 설명                          |
| css_class               | TEXT    | CSS 클래스명 (`banner-slide`) |
| default_width           | INTEGER | 권장 너비                     |
| default_height          | INTEGER | 권장 높이                     |
| recommended_image_count | INTEGER | 권장 이미지 개수              |
| thumbnail_url           | TEXT    | 미리보기 이미지               |
| is_active               | BOOLEAN | 사용 가능 여부                |

**예시 데이터:**

```sql
INSERT INTO banner_templates VALUES
(uuid(), 'slide', '슬라이드 배너', '중앙 정렬...', 'banner-slide', 1200, 500, 3, true);
```

---

### 4. `banner_instances` - 배너 인스턴스

고객이 실제로 만든 배너 (실제 사용되는 배너)

| 컬럼           | 타입      | 설명                            |
| -------------- | --------- | ------------------------------- |
| id             | UUID      | PK                              |
| banner_id      | TEXT      | 외부 노출 ID (`company-a-main`) |
| client_id      | UUID      | FK → banner_clients             |
| template_id    | UUID      | FK → banner_templates           |
| name           | TEXT      | 배너 이름 ("메인 슬라이드")     |
| settings       | JSONB     | 설정 (자동재생, 간격 등)        |
| status         | TEXT      | 상태 (active/draft/archived)    |
| view_count     | INTEGER   | 조회수                          |
| last_viewed_at | TIMESTAMP | 마지막 조회 시간                |

**예시 데이터:**

```sql
INSERT INTO banner_instances VALUES
(uuid(), 'company-a-main', client_uuid, template_uuid, '메인 슬라이드',
 '{"autoplay": true, "interval": 3000}', 'active', 0);
```

---

### 5. `banner_items` - 배너 아이템

배너에 들어갈 이미지들

| 컬럼        | 타입    | 설명                  |
| ----------- | ------- | --------------------- |
| id          | UUID    | PK                    |
| instance_id | UUID    | FK → banner_instances |
| image_url   | TEXT    | 이미지 URL            |
| video_url   | TEXT    | 동영상 URL            |
| link_url    | TEXT    | 클릭 시 이동 URL      |
| alt_text    | TEXT    | 이미지 설명           |
| order       | INTEGER | 순서                  |
| is_active   | BOOLEAN | 활성화 여부           |

**예시 데이터:**

```sql
INSERT INTO banner_items VALUES
(uuid(), instance_uuid, 'https://...image1.jpg', NULL, 'https://shop.com', 'Product 1', 0, true),
(uuid(), instance_uuid, 'https://...image2.jpg', NULL, NULL, 'Product 2', 1, true);
```

---

### 6. `banner_analytics` - 통계 (선택사항)

배너 조회/클릭 통계

| 컬럼        | 타입    | 설명                     |
| ----------- | ------- | ------------------------ |
| id          | UUID    | PK                       |
| instance_id | UUID    | FK → banner_instances    |
| event_type  | TEXT    | 이벤트 타입 (view/click) |
| item_index  | INTEGER | 몇 번째 이미지           |
| user_agent  | TEXT    | 브라우저 정보            |
| ip_address  | TEXT    | IP 주소                  |
| referrer    | TEXT    | 유입 경로                |

---

## 🔗 테이블 관계도

```
banner_clients (고객사)
    ├─→ banner_users (사용자 계정들)
    └─→ banner_instances (배너들)
            ├─→ banner_items (이미지들)
            ├─→ banner_analytics (통계)
            └─← banner_templates (템플릿 참조)

banner_templates (템플릿)
    └─→ banner_instances에서 참조됨
```

## 📝 실제 데이터 플로우 예시

### 1. 고객사 등록

```sql
-- 1. 고객사 생성
INSERT INTO banner_clients (client_id, client_name, email, plan_type, max_banners)
VALUES ('company-a', 'A쇼핑몰', 'admin@company-a.com', 'pro', 5);

-- 2. 관리자 계정 생성
INSERT INTO banner_users (client_id, email, password_hash, name)
VALUES (client_uuid, 'admin@company-a.com', 'hash...', 'John Admin');
```

### 2. 배너 생성

```sql
-- 1. 배너 인스턴스 생성
INSERT INTO banner_instances (banner_id, client_id, template_id, name, settings)
VALUES ('company-a-main', client_uuid, template_uuid, '메인 배너',
        '{"autoplay": true, "interval": 3000}');

-- 2. 이미지 추가
INSERT INTO banner_items (instance_id, image_url, "order")
VALUES
  (instance_uuid, 'https://cdn.../img1.jpg', 0),
  (instance_uuid, 'https://cdn.../img2.jpg', 1),
  (instance_uuid, 'https://cdn.../img3.jpg', 2);
```

### 3. 배너 조회 (API)

```sql
-- banner_details 뷰 사용
SELECT * FROM banner_details WHERE banner_id = 'company-a-main';

-- 결과:
{
  "banner_id": "company-a-main",
  "name": "메인 배너",
  "type": "slide",
  "css_class": "banner-slide",
  "settings": {"autoplay": true, "interval": 3000},
  "items": [
    {"image_url": "https://cdn.../img1.jpg", "order": 0},
    {"image_url": "https://cdn.../img2.jpg", "order": 1},
    {"image_url": "https://cdn.../img3.jpg", "order": 2}
  ]
}
```

## 🔐 보안 (Row Level Security)

### 고객사는 자신의 데이터만 볼 수 있음

```sql
-- ✅ 허용: 자신의 배너
SELECT * FROM banner_instances WHERE client_id = 'my-client-id';

-- ❌ 거부: 다른 고객의 배너
SELECT * FROM banner_instances WHERE client_id = 'other-client-id';
```

### 배너 데이터는 공개 (위젯에서 조회)

```sql
-- ✅ 누구나 조회 가능 (banner-script.js에서 사용)
SELECT * FROM banner_details WHERE banner_id = 'company-a-main';
```

## 📊 쿼리 예시

### 고객의 모든 배너 조회

```sql
SELECT
  bi.banner_id,
  bi.name,
  bt.template_name,
  COUNT(item.id) as image_count,
  bi.view_count
FROM banner_instances bi
JOIN banner_templates bt ON bi.template_id = bt.id
LEFT JOIN banner_items item ON item.instance_id = bi.id
WHERE bi.client_id = 'client-uuid'
GROUP BY bi.id, bt.template_name;
```

### 인기 배너 TOP 10

```sql
SELECT
  banner_id,
  name,
  view_count
FROM banner_instances
WHERE status = 'active'
ORDER BY view_count DESC
LIMIT 10;
```

### 고객별 사용 통계

```sql
SELECT
  bc.client_name,
  COUNT(DISTINCT bi.id) as banner_count,
  SUM(bi.view_count) as total_views
FROM banner_clients bc
LEFT JOIN banner_instances bi ON bi.client_id = bc.id
GROUP BY bc.id
ORDER BY total_views DESC;
```

## 🚀 마이그레이션 순서

1. `banner_clients` 생성
2. `banner_users` 생성
3. `banner_templates` 생성 + 초기 데이터 삽입
4. `banner_instances` 생성
5. `banner_items` 생성
6. `banner_analytics` 생성 (선택)
7. RLS 정책 적용
8. Storage 설정
9. 뷰/트리거 생성

## 💡 확장 가능성

### 추가 가능한 테이블

1. **banner_plans** - 요금제 정보
2. **banner_payments** - 결제 내역
3. **banner_notifications** - 알림 (만료 임박 등)
4. **banner_tags** - 태그 시스템
5. **banner_versions** - 버전 관리 (롤백 기능)
