import { useState } from 'react';
import PriceAndCategory from './PriceAndCategory';
import SearchSection from './SearchSection';
import * as S from './ListingWrite.styles';
import PhotoList from './PhotoList';
import HelpButton from './HelpButton';

interface ListingWriteProps {
  id?: number;
}

export type ImageFile = {
  previewUrl: string;
  file: File;
};

const STATE_HELP_MESSAGE =
  '최상: 사용 흔적이 거의 없고, 선물용으로도 무리 없음\n\n상: 표지나 책 등에 미세한 마모 또는 작은 접힘이 있음\n\n중: 필기, 접힘 등 사용 흔적이 있으나 열람에는 지장이 없음\n\n하: 사용감이 많고, 일부 페이지가 찢어지거나 필기가 많음';
const ListingWrite = ({ id }: ListingWriteProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [title, setTitle] = useState<string>('파과');
  const [price, setPrice] = useState<string>('');
  const [rawPrice, setRawPrice] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');

  function formatNumber(value: string | number) {
    const num =
      typeof value === 'number' ? value : Number(value.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString();
  }

  function unformatNumber(formatted: string) {
    return formatted.replace(/,/g, '');
  }
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const numeric = unformatNumber(input);

    if (!/^\d*$/.test(numeric)) return;

    setRawPrice(numeric === '' ? null : Number(numeric));
    setPrice(formatNumber(numeric));
  }
  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setDescription(e.target.value);
  }

  function handleAddImage(value: ImageFile) {
    setImages((prev) => [...prev, value]);
  }
  function handleRemoveImage(indexToRemove: number) {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  return (
    <S.Container>
      <PhotoList
        images={images}
        onAddImage={handleAddImage}
        onDeleteImage={handleRemoveImage}
      />
      <SearchSection value={searchTerm} onChange={handleSearchTermChange} />
      <S.TitleSection>
        <S.HeaderText>제목</S.HeaderText>
        <S.InputWrapper>
          <S.Input type='text' value={title} readOnly />
        </S.InputWrapper>
      </S.TitleSection>
      <S.StatusSection>
        <S.HeaderText>상태</S.HeaderText>
        <HelpButton text={STATE_HELP_MESSAGE} />
      </S.StatusSection>
      <PriceAndCategory price={price} handlePriceChange={handlePriceChange} />
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
    </S.Container>
  );
};

export default ListingWrite;
