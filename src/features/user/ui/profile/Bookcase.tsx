import styled from 'styled-components';
import BookShelfSection from './BookShelfSection';

const bookcase = [
  {
    id: 13,
    status: 'BEST',
    title: '파쇄',
    author: '구병모',
    cover:
      'https://image.aladin.co.kr/product/31273/29/cover500/k592832565_1.jpg',
    available: true,
  },
  {
    id: 14,
    status: 'MEDIUM',
    title: '독설의 팡세가나다라마바사아자차',
    author: '에밀 시오랑',
    cover:
      'https://image.aladin.co.kr/product/35536/57/cover500/k072036170_1.jpg',
    available: false,
  },
];
const Bookcase = () => {
  return (
    <Container>
      <BookShelfSection books={bookcase} type='bookcase' />
    </Container>
  );
};

export default Bookcase;

const Container = styled.div`
  width: 100%;
`;
