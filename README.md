# BookBridge

<img src="./docs/images/logo-text.svg" width="200"/>

> **이웃 간 중고 책 교환을 위한 플랫폼**

**개발 기간 및 정보**

> 2025.04 ~ 2026.02,
> 2인 개발(프론트엔드 전담)

<br /><br />

### 🛠️ 기술 스택

| 분류       | 기술                 |
| ---------- | -------------------- |
| 프레임워크 | Next.js              |
| 언어       | TypeScript           |
| 상태 관리  | Zustand, React Query |
| 스타일     | Styled Components    |
| 외부 API   | OpenAI, 알라딘       |

<br /><br />

### 💡 주요 기능

**1. 회원 관리**

- 회원가입/로그인, 소셜 로그인, 프로필 수정
- 관심 게시글, 내 게시글, 교환 희망 도서, 교환 신청 내역, 관심 키워드 관리

**2. 도서 등록 및 검색**

- 도서 정보·이미지·상태를 입력해 교환글 등록
- 제목, 저자, 카테고리, 상태 기반 도서 검색

**3. 교환 기능**

- 거래 성사 이후 채팅 기능 제공
- 거래 상태 변경(예약 중/교환 완료)
- 거래에 사용될 도서 변경

**4. AI 북메이트**

- 사용자 요청 기반 도서 추천 및 책 줄거리 요약 제공

**5. 알림**

- 메시지 수신, 거래 상태 변경 시 실시간 알림
- 알림 목록 확인

**6. 관리자 페이지**

- DAU/WAU/MAU 통계 시각화
- 회원·게시글·신고·문의·공지 관리

<br /><br />

### 📺 화면 미리보기

> **메인페이지**

|                               desktop                               |                               tablet                               |                               mobile                               |
| :-----------------------------------------------------------------: | :----------------------------------------------------------------: | :----------------------------------------------------------------: |
| <img src="./docs/images/responsive-main_desktop.png" width="500" /> | <img src="./docs/images/responsive-main_tablet.png" width="300" /> | <img src="./docs/images/responsive-main_mobile.png" width="200" /> |

<br /><br />

> 교환글 상세 페이지

|                                desktop                                |                                mobile                                |
| :-------------------------------------------------------------------: | :------------------------------------------------------------------: |
| <img src="./docs/images/responsive-detail_desktop.png" width="500" /> | <img src="./docs/images/responsive-detail_mobile.png" width="200" /> |

<br /><br />

> AI 북메이트

<img src="./docs/images/ai.gif" width="700"/>

<br /><br/>

> 관리자 대시보드

![화면 기록 2026-02-26 오후 7 30 30 (1)](https://github.com/user-attachments/assets/9ed85551-35bd-4b3f-9742-d196c98115e1)

<br /><br/>

### 📝 구현 상세

**에러 핸들링 구조 개선**

> 일부 API 실패 시 전체 페이지가 에러 화면으로 대체되는 문제를 해결하기 위해 UI를 쿼리 단위로 분리했습니다. 각 컴포넌트에 Fallback UI를 적용하고 `QueryErrorResetBoundary`로 실패한 쿼리를 초기화·재요청할 수 있도록 구현해 전체 화면 중단 없이 부분적으로 복원되는 구조를 만들었습니다.

<br />

**Axios 인터셉터 기반 자동 재인증**

> 인증 만료 시 사용자 흐름이 끊기는 문제를 해결하기 위해 응답 body의 에러 타입을 기준으로 토큰 만료 여부를 판단하고, 토큰 재발급 → 원래 요청 재전송 구조를 구현했습니다. \_retry 플래그로 무한 루프를 방지하고, 재발급 요청이 중복으로 발생하지 않도록 진행 중인 Promise를 공유하는 방식으로 처리했습니다.

```typescript
if (!refreshInFlight) {
  refreshInFlight = axiosInstance.post('/auth/token/refresh').then(() => {});
  refreshInFlight.finally(() => (refreshInFlight = null));
}
await refreshInFlight;
return axiosInstance(cfg);
```

<br />

**반응형 UI**

> `@media` 쿼리와 `useIsMobile` 커스텀 훅을 활용해 모바일·웹 레이아웃을 분리했습니다. 채팅·알림 등 일부 기능의 레이아웃을 모바일에서는 전용 페이지로, 웹에서는 플로팅 패널로 제공합니다.

<br />

**FSD 기반 폴더 구조**

> Feature-Sliced Design을 참고해 폴더 구조를 설계했습니다. 기능별로 관심사를 분리해 코드의 응집도를 높이고 의존성을 명확하게 관리하고자 했습니다.

```
src/
├── app/         # 라우팅, 루트 레이아웃 등
├── entities/    # 도메인 엔티티 (타입, API, 모델)
├── features/    # 기능 단위 모듈
└── shared/      # 공통 컴포넌트, 훅, 유틸 등
```

<br />

**외부 API 연동**

> Next.js Route Handler로 직접 API 엔드포인트를 구성해 OpenAI, 알라딘 API를 연동했습니다.
