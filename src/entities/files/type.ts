export interface postUrlsProps {
  domain: 'POST' | 'CHAT';
  contentTypes: string[];
}

export interface postFilesProps {
  domain: 'POST' | 'CHAT';
  fileNames: string[];
}

export type ImageFile = {
  sequence: number;
  file: File;
  fileName: string;
  fileUrl: string;
};
