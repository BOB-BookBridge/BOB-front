import Image from 'next/image';
import { Book, ImageWrapper, BookInfo, BookTitle } from './styles';
import { TradeMainModel } from '@/entities/trade';

const TradeBook = ({ item }: { item: TradeMainModel }) => {
  return (
    <Book>
      <ImageWrapper>
        <Image
          src={item.cover}
          alt={item.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageWrapper>
      <BookInfo>
        <BookTitle>{item.title}</BookTitle>
        {item.size > 1 && <BookTitle>외 {item.size - 1}</BookTitle>}
      </BookInfo>
    </Book>
  );
};

export default TradeBook;
