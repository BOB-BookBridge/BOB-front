export interface postUrlsProps {
  domain: 'POST' | 'CHAT';
  contentTypes: string[];
}

export interface postFilesProps {
  domain: 'POST' | 'CHAT';
  fileNames: string[];
}

export interface editFilesProps {
  domain: 'POST' | 'CHAT';
  fileNames: string[];
  referenceId: string;
}

export type ImageFile = {
  file?: File;
  fileName: string;
  fileUrl?: string;
};
