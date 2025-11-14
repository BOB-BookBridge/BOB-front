'use client';

import { useState } from 'react';
import { useListingWrite } from '../../hooks/useListingWrite';
import { bookStatusList } from '../main/filter/FilterContent';
import { Button, CheckBox, CheckCircle } from '@/shared/ui';
import { HELP_MESSAGES } from '@/shared/constants';
import PriceAndCategory from './PriceAndCategory';
import { bookStatusMap } from '@/shared/lib';
import SearchSection from './SearchSection';
import * as S from './ListingWrite.styles';
import HelpButton from './HelpButton';
import PhotoList from './PhotoList';

interface ListingWriteProps {
  id?: number;
}

const ListingWrite = ({ id }: ListingWriteProps) => {
  const {
    images,
    price,
    bookStatus,
    description,
    categoryId,
    title,
    wishOnly,
    handlePriceChange,
    handleDescriptionChange,
    handleAddImage,
    handleRemoveImage,
    handleBookStatus,
    toggleWishOnly,
    handleUpload,
  } = useListingWrite(id);
  const [searchTerm, setSearchTerm] = useState<string>('');

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <S.Container>
      <PhotoList
        images={images}
        onAddImage={handleAddImage}
        onDeleteImage={handleRemoveImage}
      />
      {!id && (
        <SearchSection value={searchTerm} onChange={handleSearchTermChange} />
      )}
      <S.TitleSection>
        <S.HeaderText>제목</S.HeaderText>
        <S.InputWrapper>
          <S.Input type='text' value={title ?? ''} readOnly />
        </S.InputWrapper>
      </S.TitleSection>
      <S.StatusSection>
        <S.HeaderWrapper>
          <S.HeaderText>상태</S.HeaderText>
          <HelpButton text={HELP_MESSAGES.state} />
        </S.HeaderWrapper>
        <div style={{ display: 'flex' }}>
          {bookStatusList.map((status) => (
            <CheckCircle
              key={status}
              id={bookStatusMap[status]}
              checked={bookStatus === status}
              onChange={() => handleBookStatus(status)}
              label={
                <S.OptionText>{bookStatusMap[status]}</S.OptionText>
              }></CheckCircle>
          ))}
        </div>
      </S.StatusSection>
      <PriceAndCategory
        price={price}
        handlePriceChange={handlePriceChange}
        categoryId={categoryId}
      />
      <S.DescriptionSection>
        <S.HeaderText>설명</S.HeaderText>
        <S.InputWrapper>
          <S.Textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder='책 상태나 특징을 자유롭게 적어주세요'
            maxLength={500}
          />
        </S.InputWrapper>
      </S.DescriptionSection>
      <S.WishOnlySection>
        <CheckBox
          id='wishOnly'
          checked={wishOnly}
          onChange={toggleWishOnly}
          label={<S.OptionText>희망 도서만 제안 받기</S.OptionText>}
        />
      </S.WishOnlySection>
      <Button
        text='업로드'
        onClick={handleUpload}
        variant='primary'
        size='lg'
      />
    </S.Container>
  );
};

export default ListingWrite;
