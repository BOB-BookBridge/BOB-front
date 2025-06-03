import { ListingDetailProps } from '@/entities/listing/model/types';

export const data: ListingDetailProps[] = [
  {
    postId: 1,
    sellPrice: 8000,
    bookStatus: 'BEST',
    tradeStatus: 'READY',
    category: 4,
    book: {
      title: '디디의 우산',
      author: '황정은',
      description:
        '이제 행복해지자, 너의 행복과 더불어 세계라는 빗속에서 황정은이 건네는 우산 같은 소설',
      priceStandard: 15000,
      pubDate: '2019-01-11',
    },
    description: '책 상태 양호하고 밑줄 없음',
    images: [
      'https://s3.bucket.com/post1.jpg',
      'https://s3.bucket.com/post2.jpg',
    ],
    writer: {
      memberId: '018e0df5-b7ec-7f36-b67f-80f3e4f49895',
      nickname: 'booklover',
      activityArea: '사하구 하단동',
      profileUrl: 'https://s3.bucket.com/default.jpg',
    },

    scrapCount: 2, // 찜 수
    viewCount: 24, // 조회 수
    isFavorite: true, // 사용자의 찜 여부
    isOwner: false, // 사용자가 작성한 게시글 여부
    createdAt: '2025-05-29T10:22:00',
  },
  {
    postId: 2,
    sellPrice: 8000,
    bookStatus: 'BEST',
    tradeStatus: 'COMPLETED',
    category: 10,
    book: {
      title: '자바 성능 튜닝',
      author: '스캇 오크스',
      description:
        '자바 성능 튜닝을 위한 완벽 가이드 코딩과 테스트는 흔히 별도의 전문 분야로 여겨진다. 저자이자 자바 전문가인 스캇 오크스는 JVM에서 코드가 동작하는 방법뿐만 아니라 튜닝을 통해 성능이 개선되는 방법도 함께, 자바로 작업하는 이라면 누구나 이해할 수 있게끔 이 책에서 설명한다.언어와 API를 포괄한 자바 가상 머신(JVM)과 자바 플랫폼을 이용해서 자바 애플리케이션의 성능에 대한 깊은 지식을 습득하자. 개발자나 성능 엔지니어 모두, 이 완벽 가이드를 통해 자바 7과 8 애플리케이션이 동작하는 방법을 개선하기 위한 다양한 특징과 도구와 절차를 배울 수 있다.',
      priceStandard: 15000,
      pubDate: '2019-01-11',
    },
    description: '책 상태 양호하고 밑줄 없음',
    images: [
      'https://image.aladin.co.kr/product/7924/83/cover500/k542434036_1.jpg',
      'https://s3.bucket.com/post2.jpg',
    ],
    writer: {
      memberId: '018e0df5-b7ec-7f36-b67f-80f3e4f49895',
      nickname: 'booklover',
      activityArea: '사하구 하단동',
      profileUrl: 'https://s3.bucket.com/default.jpg',
    },

    scrapCount: 0, // 찜 수
    viewCount: 5, // 조회 수
    isFavorite: false, // 사용자의 찜 여부
    isOwner: true, // 사용자가 작성한 게시글 여부
    createdAt: '2025-05-27T10:22:00',
  },
];
