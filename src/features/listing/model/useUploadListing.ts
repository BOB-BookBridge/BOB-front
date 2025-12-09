import { useRouter } from 'next/navigation';
import { ImageFile, useEditImageMutation } from '@/entities/files';
import { showToast } from '@/shared/lib';
import {
  BookModel,
  BookStatus,
  ListingDetailRes,
  usePatchListingMutation,
  usePostMutation,
} from '@/entities/listing';

interface UseUploadListingParams {
  id?: number;
  resetWrite: () => void;
}

export interface ListingFormValues {
  images: ImageFile[];
  bookStatus: BookStatus | null;
  description: string;
  wishOnly: boolean;
  categoryId: number | null;
  book: BookModel | null;
  detailInfo?: ListingDetailRes;
}

export function useUploadListing({ id, resetWrite }: UseUploadListingParams) {
  const router = useRouter();
  const { mutate: postListing } = usePostMutation();
  const { mutateAsync: patchListing } = usePatchListingMutation();
  const { mutateAsync: editImage } = useEditImageMutation();

  async function upload(form: ListingFormValues) {
    const {
      categoryId,
      bookStatus,
      description,
      book,
      images,
      wishOnly,
      detailInfo,
    } = form;

    if (!book) return showToast.error('판매할 책을 선택해 주세요.');
    if (!bookStatus) return showToast.error('책 상태를 선택해 주세요.');

    // 신규 등록
    if (!id) {
      if (!book.isbn || !book.cover)
        return showToast.error('도서 정보가 올바르지 않습니다.');
      if (!categoryId) return showToast.error('카테고리를 입력해 주세요.');

      postListing(
        {
          categoryId,
          bookStatus,
          description,
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
    if (bookStatus !== detailInfo?.bookStatus) patch.bookStatus = bookStatus;
    if (description !== detailInfo?.description)
      patch.description = description;

    const changedPosting = Object.keys(patch).length > 0;

    if (!changedImage && !changedPosting)
      return showToast.info('변경된 내용이 없습니다.');

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
        return showToast.warn(
          '일부만 반영되었습니다. 새로고침 후 확인해주세요.',
        );
      showToast.success('수정이 완료되었습니다.');
      resetWrite();
      router.replace(`/listings/${id}`);
    } else {
      showToast.error('수정에 실패했습니다.');
    }
  }

  return { upload };
}
