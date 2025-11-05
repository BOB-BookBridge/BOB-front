import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ImageFile, useEditImageMutation } from '@/entities/files';
import {
  BookState,
  BookStatus,
  ListingDetailProps,
  usePatchListingMutation,
  usePostMutation,
} from '@/entities/listing';

interface UseUploadListingParams {
  id?: number;
  resetWrite: () => void;
}

export interface ListingFormValues {
  images: ImageFile[];
  sellPrice: number | null;
  price: string;
  bookStatus: BookStatus | null;
  description: string;
  wishOnly: boolean;
  categoryId: number | null;
  book: BookState | null;
  detailInfo?: ListingDetailProps;
}

export function useUploadListing({ id, resetWrite }: UseUploadListingParams) {
  const router = useRouter();
  const { mutate: postListing } = usePostMutation();
  const { mutateAsync: patchListing } = usePatchListingMutation();
  const { mutateAsync: editImage } = useEditImageMutation();

  async function upload(form: ListingFormValues) {
    const {
      categoryId,
      sellPrice,
      bookStatus,
      description,
      book,
      images,
      wishOnly,
      detailInfo,
    } = form;

    if (!book) return toast.error('판매할 책을 선택해 주세요');
    if (!bookStatus) return toast.error('책 상태를 선택해 주세요');
    if (!sellPrice) return toast.error('가격을 입력해 주세요');

    // 신규 등록
    if (!id) {
      if (!book.isbn || !book.cover)
        return toast.error('도서 정보가 올바르지 않습니다.');
      if (!categoryId) return toast.error('카테고리를 입력해 주세요.');

      postListing(
        {
          categoryId,
          sellPrice,
          bookStatus,
          postDescription: description,
          book,
          fileNames: images.map((i) => i.fileName),
          wishOnly,
        },
        { onSuccess: () => resetWrite() },
      );
      return;
    }

    const origin = detailInfo?.images.map((i) => i.fileName) ?? [];
    const current = images.map((i) => i.fileName);
    const changedImage = JSON.stringify(origin) !== JSON.stringify(current);

    const patch: Record<string, unknown> = {};
    if (sellPrice !== detailInfo?.sellPrice) patch.sellPrice = sellPrice;
    if (bookStatus !== detailInfo?.bookStatus) patch.bookStatus = bookStatus;
    if (description !== detailInfo?.description)
      patch.description = description;

    const changedPosting = Object.keys(patch).length > 0;

    if (!changedImage && !changedPosting)
      return toast.info('변경된 내용이 없습니다');

    const tasks: Promise<unknown>[] = [];
    if (changedImage)
      tasks.push(
        editImage({
          domain: 'POST',
          fileNames: current,
          referenceId: String(id),
        }),
      );
    if (changedPosting)
      tasks.push(patchListing({ postId: id, listing: patch }));

    const results = await Promise.allSettled(tasks);
    const anySuccess = results.some((r) => r.status === 'fulfilled');
    const allSuccess = results.every((r) => r.status === 'fulfilled');

    if (anySuccess) {
      if (!allSuccess)
        return toast.warn('일부만 반영되었습니다. 새로고침 후 확인해주세요.');
      toast.success('수정이 완료되었습니다.');
      resetWrite();
      router.replace(`/listings/${id}`);
    } else {
      toast.error('수정에 실패했습니다.');
    }
  }

  return { upload };
}
