import { useState, useEffect } from 'react';
import { BookStatus, ListingDetailProps } from '@/entities/listing/types';
import { useWriteStore } from './useWriteStore';
import { ImageFile } from '@/entities/files';

export function useListingForm(detailInfo?: ListingDetailProps) {
  const [images, setImages] = useState<ImageFile[]>(detailInfo?.images ?? []);
  const [sellPrice, setSellPrice] = useState<number | null>(
    detailInfo?.sellPrice ?? null,
  );
  const [price, setPrice] = useState(
    detailInfo?.sellPrice?.toLocaleString() ?? '',
  );
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
    setSellPrice(detailInfo.sellPrice);
    setPrice(detailInfo.sellPrice.toLocaleString());
    setCategoryId(detailInfo.category);
    setBookStatus(detailInfo.bookStatus);
    setDescription(detailInfo.description);
  }, [detailInfo]);

  const unformat = (v: string) => v.replace(/,/g, '');
  const format = (v: string | number) => {
    const n = typeof v === 'number' ? v : Number(v.replace(/,/g, ''));
    if (isNaN(n)) return '';
    return n.toLocaleString();
  };

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const numeric = unformat(e.target.value);
    if (!/^\d*$/.test(numeric)) return;
    setSellPrice(numeric === '' ? null : Number(numeric));
    setPrice(format(numeric));
  }

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
    sellPrice,
    price,
    title,
    bookStatus,
    categoryId,
    description,
    wishOnly,
    handlePriceChange,
    handleDescriptionChange,
    handleBookStatus,
    handleAddImage,
    handleRemoveImage,
    toggleWishOnly,
  };
}
