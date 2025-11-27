import { useState, useEffect } from 'react';
import { BookStatus, ListingDetailRes } from '@/entities/listing/types';
import { useWriteStore } from './useWriteStore';
import { ImageFile } from '@/entities/files';

export function useListingForm(detailInfo?: ListingDetailRes) {
  const [images, setImages] = useState<ImageFile[]>(detailInfo?.images ?? []);
  const storeTitle = useWriteStore((state) => state.book)?.title;
  const title = detailInfo ? detailInfo.book.title : storeTitle;
  const storeCategoryId = useWriteStore((state) => state.categoryId);
  const [categoryId, setCategoryId] = useState(storeCategoryId);
  const [bookStatus, setBookStatus] = useState<BookStatus | null>(
    detailInfo?.bookStatus ?? null,
  );
  const [description, setDescription] = useState(detailInfo?.description ?? '');
  const [wishOnly, setWishOnly] = useState(false);

  useEffect(() => {
    if (!detailInfo) return;

    setImages(detailInfo.images);
    setCategoryId(detailInfo.categoryId);
    setBookStatus(detailInfo.bookStatus);
    setDescription(detailInfo.description);
  }, [detailInfo]);

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setDescription(e.target.value);
  }

  function handleAddImage(image: ImageFile) {
    setImages((prev) => [...prev, image]);
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleBookStatus(status: BookStatus) {
    setBookStatus(status);
  }

  function toggleWishOnly() {
    setWishOnly((prev) => !prev);
  }

  return {
    images,
    title,
    bookStatus,
    categoryId,
    description,
    wishOnly,
    handleDescriptionChange,
    handleBookStatus,
    handleAddImage,
    handleRemoveImage,
    toggleWishOnly,
  };
}
