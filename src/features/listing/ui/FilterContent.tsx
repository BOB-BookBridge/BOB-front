import { BookStatus } from '@/entities/listing/model/types';
import { CheckBox, CheckCircle } from '@/shared/ui';
import categories from '@/shared/constants/category.json';
import { bookStatusMap } from '@/shared/lib';
import * as S from './FilterContent.styles';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FilterStatus } from './ListingFilterButton';

interface FilterContentProps {
  isAvailableOnly: boolean;
  categoryId: number | null;
  bookStatus: BookStatus | null;
  priceStatus: number | null;
}
const bookStatusList: BookStatus[] = ['BEST', 'HIGH', 'MEDIUM', 'LOW'];
const priceRangeList = [
  '~5,000원',
  '5,000원~10,000원',
  '10,000원~20,000원',
  '20,000원~',
];

export interface FilterContentRef {
  getFilter: () => FilterStatus;
  resetFilter: () => void;
}

const FilterContent = forwardRef<FilterContentRef, FilterContentProps>(
  (props, ref) => {
    const [isAvailableOnly, setIsAvailableOnly] = useState(
      props.isAvailableOnly,
    );
    const [categoryId, setCategoryId] = useState(props.categoryId);
    const [bookStatus, setBookStatus] = useState(props.bookStatus);
    const [priceRange, setPriceRange] = useState(props.priceStatus);

    useImperativeHandle(ref, () => ({
      getFilter: () => ({
        isAvailableOnly,
        categoryId,
        bookStatus,
        priceRange,
      }),
      resetFilter: () => {
        setIsAvailableOnly(false);
        setCategoryId(null);
        setBookStatus(null);
        setPriceRange(null);
      },
    }));

    useEffect(() => {
      setIsAvailableOnly(props.isAvailableOnly);
    }, [props.isAvailableOnly]);

    useEffect(() => {
      setCategoryId(props.categoryId);
    }, [props.categoryId]);

    useEffect(() => {
      setBookStatus(props.bookStatus);
    }, [props.bookStatus]);

    useEffect(() => {
      setPriceRange(props.priceStatus);
    }, [props.priceStatus]);

    return (
      <S.Container>
        <S.TradeStatusWrapper>
          <CheckBox
            id='isAvailableOnly'
            checked={isAvailableOnly}
            onChange={() => setIsAvailableOnly((prev) => !prev)}
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
                  checked={categoryId === category.id}
                  onChange={() => setCategoryId(category.id)}
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
                checked={bookStatus === status}
                onChange={() => setBookStatus(status)}
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
                onClick={() => setPriceRange(idx)}
                $isChecked={priceRange === idx}>
                <S.OptionText>{price}</S.OptionText>
              </S.PriceRange>
            ))}
          </S.PriceWrapper>
        </S.Section>
      </S.Container>
    );
  },
);

export default FilterContent;
