import { useMutation } from '@tanstack/react-query';
import { editFiles, ImageFile, uploadImagesFlow } from '.';

interface UploadImagesPayload {
  images: File[];
  domain: 'POST' | 'CHAT';
  referenceId?: number;
}

export const useUploadImagesMutation = () => {
  return useMutation<ImageFile[], Error, UploadImagesPayload>({
    mutationFn: ({ images, domain, referenceId }) =>
      uploadImagesFlow(images, domain, referenceId),
  });
};

interface EditImagePayload {
  fileNames: string[];
  domain: 'POST' | 'CHAT';
  referenceId: string;
}

export const useEditImageMutation = () => {
  return useMutation<void, Error, EditImagePayload>({
    mutationFn: ({ fileNames, domain, referenceId }) =>
      editFiles({ fileNames, domain, referenceId }),
  });
};
