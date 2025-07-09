import { useState } from 'react';
import { toast } from 'react-toastify';
import { bookStatusList } from '../main/filter/FilterContent';
import { useWriteStore } from '../../model/useWriteStore';
import { BookStatus } from '@/entities/listing/types';
import { usePostMutation } from '@/entities/listing';
import { HELP_MESSAGES } from '@/shared/constants';
import { Button, CheckCircle } from '@/shared/ui';
import PriceAndCategory from './PriceAndCategory';
import { ImageFile } from '@/entities/files';
import { bookStatusMap } from '@/shared/lib';
import SearchSection from './SearchSection';
import * as S from './ListingWrite.styles';
import HelpButton from './HelpButton';
import PhotoList from './PhotoList';

interface ListingWriteProps {
  id?: number;
}

const ListingWrite = ({ id }: ListingWriteProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const title = useWriteStore((state) => state.book)?.title;
  const [price, setPrice] = useState<string>('');
  const book = useWriteStore((state) => state.book);
  const categoryId = useWriteStore((state) => state.categoryId);
  const [sellPrice, setSellPrice] = useState<number | null>(null);
  const [bookStatus, setBookStatus] = useState<BookStatus | null>();
  const [postDescription, setPostDescription] = useState('');
  const { resetWrite } = useWriteStore();

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

    setSellPrice(numeric === '' ? null : Number(numeric));
    setPrice(formatNumber(numeric));
  }

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setPostDescription(e.target.value);
  }

  function handleAddImage(value: ImageFile) {
    setImages((prev) => [...prev, value]);
  }
  function handleRemoveImage(indexToRemove: number) {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  const { mutate: posting } = usePostMutation();

  function handleClickUpload() {
    if (!title || !book) toast.error('판매할 책을 조회 후 선택해 주세요');
    else if (!bookStatus) toast.error('책 상태를 선택해 주세요');
    else if (!sellPrice) toast.error('가격을 입력해 주세요');
    else if (!categoryId) toast.error('카테고리를 선택해 주세요');
    else {
      posting(
        {
          categoryId,
          sellPrice,
          bookStatus,
          postDescription,
          book,
          fileNames: images
            .slice()
            .sort((a, b) => a.sequence - b.sequence)
            .map((img) => img.fileName),
        },
        { onSuccess: () => resetWrite() },
      );
    }
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
              onChange={() => setBookStatus(status)}
              label={
                <S.OptionText>{bookStatusMap[status]}</S.OptionText>
              }></CheckCircle>
          ))}
        </div>
      </S.StatusSection>
      <PriceAndCategory price={price} handlePriceChange={handlePriceChange} />
      <S.DescriptionSection>
        <S.HeaderText>설명</S.HeaderText>
        <S.InputWrapper>
          <S.Textarea
            value={postDescription}
            onChange={handleDescriptionChange}
            placeholder='책 상태나 특징을 자유롭게 적어주세요'
            maxLength={500}
          />
        </S.InputWrapper>
      </S.DescriptionSection>
      <Button
        text='업로드'
        onClick={handleClickUpload}
        variant='primary'
        size='lg'
      />
    </S.Container>
  );
};

export default ListingWrite;
