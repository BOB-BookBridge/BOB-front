import axiosInstance from '@/shared/config/axios';
import {
  editFilesReq,
  ImageFile,
  postFilesReq,
  postUrlsReq,
  postUrlsRes,
} from '.';

const postUrls = async (files: postUrlsReq): Promise<postUrlsRes[]> => {
  const { data } = await axiosInstance.post('/files/urls', files);
  return data;
};

const uploadFilesToS3 = async ({
  file,
  uploadUrl,
  contentType,
}: {
  file: File;
  uploadUrl: string;
  contentType: string;
}) => {
  try {
    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: file,
    });
    if (!res.ok) {
      throw new Error(`S3 업로드 실패: ${res.statusText}`);
    }
  } catch (err) {
    throw err;
  }
};

const postFiles = async (files: postFilesReq) => {
  const { data } = await axiosInstance.post('/files', files);
  return data;
};

export const editFiles = async (files: editFilesReq) => {
  const { data } = await axiosInstance.put('/files', files);
  return data;
};

export const uploadImagesFlow = async (
  images: File[],
  domain: 'POST' | 'CHAT',
  referenceId?: number,
): Promise<ImageFile[]> => {
  const urlRes = await postUrls({
    domain: domain,
    contentTypes: images.map((file) => file.type),
  });

  const uploadedImages: ImageFile[] = [];
  const urls = urlRes.sort((a, b) => a.sequence - b.sequence);

  for (const urlInfo of urls) {
    const { sequence, uploadUrl, fileName } = urlInfo;
    const file = images[sequence];

    await uploadFilesToS3({
      file,
      uploadUrl,
      contentType: file.type,
    });

    const fileUrl = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${fileName}`;

    uploadedImages.push({
      file,
      fileName,
      fileUrl,
    });
  }
  if (!referenceId) {
    await postFiles({
      domain,
      fileNames: uploadedImages.map((img) => img.fileName!),
    });
  }

  return uploadedImages;
};
