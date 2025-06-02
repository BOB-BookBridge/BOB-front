import { BookStatus } from '@/entities/listing/model/types';
import { CheckBox, CheckCircle } from '@/shared/ui';
import { bookStatusMap } from '@/shared/lib';
import categories from '@/shared/constants/category.json';
import * as S from './FilterContent.styles';

interface FilterContentProps {
  isAvailableOnly: boolean;
  categoryId: number | null;
  bookStatus: BookStatus | null;
  priceStatus: number | null;
  onClickCategory: (id: number) => void;
  onClickBookStatus: (status: BookStatus) => void;
  onClickTradeStatus: () => void;
  onClickPrice: (price: number) => void;
  onClickReset: () => void;
}
const bookStatusList: BookStatus[] = ['BEST', 'HIGH', 'MEDIUM', 'LOW'];
const priceRangeList = [
  '~5,000원',
  '5,000원~10,000원',
  '10,000원~20,000원',
  '20,000원~',
];

const FilterContentControl = (props: FilterContentProps) => {
  return (
    <S.Container>
      <S.TradeStatusWrapper>
        <CheckBox
          id='isAvailableOnly'
          checked={props.isAvailableOnly}
          onChange={props.onClickTradeStatus}
          label={<S.OptionText>거래 가능만 보기</S.OptionText>}
        />
      </S.TradeStatusWrapper>
      <S.Section>
        <S.TitleText>카테고리</S.TitleText>
        <S.CategoryWrapper>
          {categories
            .filter((category) => category.parent_id === null)
            .map((category) => (
              <CheckCircle
                key={category.id}
                id={category.name}
                checked={props.categoryId === category.id}
                onChange={() => props.onClickCategory(category.id)}
                label={
                  <S.OptionText>{category.name}</S.OptionText>
                }></CheckCircle>
            ))}
        </S.CategoryWrapper>
      </S.Section>
      <S.Section>
        <S.TitleText>책 상태</S.TitleText>
        <S.BookStatusWrapper>
          {bookStatusList.map((status) => (
            <CheckCircle
              key={status}
              id={bookStatusMap[status]}
              checked={props.bookStatus === status}
              onChange={() => props.onClickBookStatus(status)}
              label={
                <S.OptionText>{bookStatusMap[status]}</S.OptionText>
              }></CheckCircle>
          ))}
        </S.BookStatusWrapper>
      </S.Section>
      <S.Section>
        <S.TitleText>가격</S.TitleText>
        <S.PriceWrapper>
          {priceRangeList.map((price, idx) => (
            <S.PriceRange
              key={price}
              onClick={() => props.onClickPrice(idx)}
              $isChecked={props.priceStatus === idx}>
              <S.OptionText>{price}</S.OptionText>
            </S.PriceRange>
          ))}
        </S.PriceWrapper>
      </S.Section>
    </S.Container>
  );
};

export default FilterContentControl;
