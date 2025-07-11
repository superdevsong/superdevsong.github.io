# SuperDevSong Blog

개발자 SuperDevSong의 개인 블로그입니다.

## 기술 스택

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 배포

이 블로그는 GitHub Pages를 통해 자동 배포됩니다. `main` 브랜치에 푸시하면 자동으로 배포됩니다.

---

# 📚 블로그 사용법

## 1. 블로그 글(포스트) 추가 방법

1. `src/content/blog/` 폴더에 새 `.mdx` 또는 `.md` 파일을 만듭니다.
2. 파일명은 `YYYY-MM-DD-title.mdx` 형식 권장 (예: `2024-07-11-hello-world.mdx`)
3. 파일 상단에 아래와 같이 **Frontmatter**를 작성합니다:

```mdx
---
title: "글 제목"
pubDate: "2024-07-11"
tags: ["태그1", "태그2"]
category: "카테고리명"
image: "https://example.com/og-image.png" # (선택)
description: "간단한 설명"
---

여기에 본문을 작성하세요!
```

- **tags**: 여러 개 가능, 대괄호로 구분
- **category**: 한 개만 입력
- **image**: 썸네일/미리보기 이미지 (선택)
- **description**: 목록에 보일 요약



---

## 2. 링크 카드(LinkCard) 사용법

- 외부 사이트를 예쁘게 카드로 보여주고 싶을 때 사용합니다.
- MDX 파일에서 아래처럼 사용하세요:

```mdx
<LinkCard url="https://readdy.ai">Readdy</LinkCard>
```

- **이름(텍스트)**을 태그 안에 넣으면 그 이름이 카드에 표시됩니다.
- **url**만 넣으면 주소가 그대로 표시됩니다.

### 썸네일/설명/제목 등 커스텀 카드 예시
```mdx
<LinkCard
  url="https://readdy.ai"
  image="https://readdy.ai/og-image.png"
  title="Readdy - AI 디자인 도구"
  description="AI로 디자인을 빠르게 만드는 서비스"
  site="readdy.ai"
>
  Readdy
</LinkCard>
```

- `image`, `title`, `description`, `site`는 선택적으로 넣을 수 있습니다.
- 자동 미리보기 기능은 추후 지원 예정입니다.

---

## 3. 이미지/코드/기타 삽입

- **이미지**: `![설명](이미지주소)` 또는 `<img src="..." alt="..." />`
- **코드블록**: <pre>```js
console.log('hello');
```</pre>
- **표/리스트/인용구 등**: 일반 마크다운 문법 지원

---

## 4. 태그/카테고리/검색/페이징

- **태그/카테고리**: Frontmatter에 입력하면 자동으로 필터링/검색/사이드바에 반영됩니다.
- **검색**: 상단 검색창에서 실시간으로 제목/내용/태그/카테고리 검색 가능
- **페이지네이션**: 6개 단위로 자동 분할, `/`, `/page/2`, `/page/3` ... 경로로 이동

---

## 5. 커스텀 컴포넌트 활용

- `src/components/` 폴더에 Astro/React 등 컴포넌트 추가 가능
- MDX에서 `<MyComponent prop="값">내용</MyComponent>`처럼 사용 가능
- 새로운 카드/버튼/경고 등 자유롭게 확장 가능

