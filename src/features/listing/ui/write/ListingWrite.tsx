import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImageFile, useEditImageMutation } from '@/entities/files';
import { bookStatusList } from '../main/filter/FilterContent';
import { useWriteStore } from '../../model/useWriteStore';
import { BookStatus } from '@/entities/listing/types';
import { HELP_MESSAGES } from '@/shared/constants';
import { Button, CheckCircle } from '@/shared/ui';
import PriceAndCategory from './PriceAndCategory';
import { bookStatusMap } from '@/shared/lib';
import SearchSection from './SearchSection';
import * as S from './ListingWrite.styles';
import HelpButton from './HelpButton';
import PhotoList from './PhotoList';
import {
  useListingDetailQuery,
  usePatchListingMutation,
  usePostMutation,
} from '@/entities/listing';

interface ListingWriteProps {
  id?: number;
}

const ListingWrite = ({ id }: ListingWriteProps) => {
  const router = useRouter();
  const { data: detailInfo } = useListingDetailQuery(id);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const storeTitle = useWriteStore((state) => state.book)?.title;
  const title = detailInfo ? detailInfo.book.title : storeTitle;
  const storeBook = useWriteStore((state) => state.book);
  const book = detailInfo ? detailInfo.book : storeBook;
  const storeCategoryId = useWriteStore((state) => state.categoryId);
  const [categoryId, setCategoryId] = useState(storeCategoryId);
  const [sellPrice, setSellPrice] = useState<number | null>(
    detailInfo ? detailInfo?.sellPrice : null,
  );
  const [price, setPrice] = useState<string>(
    sellPrice ? sellPrice.toLocaleString() : '',
  );
  const [bookStatus, setBookStatus] = useState<BookStatus | null>(
    detailInfo ? detailInfo.bookStatus : null,
  );
  const [postDescription, setPostDescription] = useState(
    detailInfo ? detailInfo.description : '',
  );
  const { resetWrite } = useWriteStore();

  useEffect(() => {
    resetWrite();
  }, []);

  useEffect(() => {
    if (!detailInfo) return;
    setSellPrice(detailInfo.sellPrice);
    setPrice(detailInfo.sellPrice.toLocaleString());
    setImages(detailInfo.images);
    setCategoryId(detailInfo.category);
    setBookStatus(detailInfo.bookStatus);
    setPostDescription(detailInfo.description);
  }, [detailInfo]);

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
  const { mutateAsync: editPosting } = usePatchListingMutation();
  const { mutateAsync: editImage } = useEditImageMutation();

  async function handleClickUpload() {
    if (!title || !book)
      return toast.error('판매할 책을 조회 후 선택해 주세요');
    if (!bookStatus) return toast.error('책 상태를 선택해 주세요');
    if (!sellPrice) return toast.error('가격을 입력해 주세요');

    if (!id) {
      if (!storeBook?.isbn || !storeBook?.cover) {
        toast.error('도서 정보가 올바르지 않습니다');
        return;
      }
      if (!storeCategoryId) {
        toast.error('카테고리를 입력해 주세요');
        return;
      }
      posting(
        {
          categoryId: storeCategoryId,
          sellPrice,
          bookStatus,
          postDescription,
          book: storeBook,
          fileNames: images.slice().map((img) => img.fileName),
        },
        { onSuccess: () => resetWrite() },
      );
      return;
    }
    if (!categoryId) {
      toast.error('카테고리 정보가 올바르지 않습니다.');
      return;
    }
    const origin = detailInfo?.images.map((img) => img.fileName) ?? [];
    const current = images.map((img) => img.fileName);

    const changedImage = JSON.stringify(origin) !== JSON.stringify(current);

    const patch: {
      sellPrice?: number;
      bookStatus?: BookStatus;
      description?: string;
    } = {};
    if (sellPrice !== detailInfo?.sellPrice) patch.sellPrice = sellPrice!;
    if (bookStatus !== detailInfo?.bookStatus) patch.bookStatus = bookStatus!;
    if (postDescription !== detailInfo?.description)
      patch.description = postDescription;

    const changedPosting = Object.keys(patch).length > 0;

    if (!changedImage && !changedPosting) {
      toast.info('변경된 내용이 없습니다');
      return;
    }
    const tasks: Promise<unknown>[] = [];
    if (changedImage) {
      tasks.push(
        editImage({
          domain: 'POST',
          fileNames: current,
          referenceId: String(id),
        }),
      );
    }
    if (changedPosting) {
      tasks.push(
        editPosting({
          postId: id,
          listing: patch,
        }),
      );
    }
    const results = await Promise.allSettled(tasks);
    const anySuccess = results.some((r) => r.status === 'fulfilled');
    const allSuccess = results.every((r) => r.status === 'fulfilled');

    if (anySuccess) {
      if (!allSuccess)
        return toast.warn(
          '일부만 반영되었습니다. 새로고침 후 상태를 확인해주세요.',
        );
      toast.success('수정이 완료되었습니다');
      resetWrite();
      router.replace(`/listings/${id}`);
    } else {
      toast.error('수정에 실패했습니다');
    }
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
              onChange={() => setBookStatus(status)}
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
