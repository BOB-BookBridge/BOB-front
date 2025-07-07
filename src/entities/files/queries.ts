import { useMutation } from '@tanstack/react-query';
import { ImageFile, uploadImagesFlow } from '.';

type UploadImagesPayload = {
  images: File[];
  domain: 'POST' | 'CHAT';
};

export const useUploadImagesMutation = () => {
  return useMutation<ImageFile[], Error, UploadImagesPayload>({
    mutationFn: ({ images, domain }) => uploadImagesFlow(images, domain),
  });
};
