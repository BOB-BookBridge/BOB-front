import { useUploadListing } from '../model/useUploadListing';
import { useListingDetailQuery } from '@/entities/listing';
import { useListingForm } from '../model/useListingForm';
import { useWriteStore } from '../model/useWriteStore';

export function useListingWrite(id?: number) {
  const { data: detailInfo } = useListingDetailQuery(id);
  const {
    resetWrite,
    book: storeBook,
    categoryId: storeCategoryId,
  } = useWriteStore();
  const form = useListingForm(detailInfo);
  const { upload } = useUploadListing({ id, resetWrite });

  function handleUpload() {
    upload({
      ...form,
      categoryId: storeCategoryId,
      book: storeBook,
      detailInfo,
    });
  }

  return {
    ...form,
    handleUpload,
  };
}
