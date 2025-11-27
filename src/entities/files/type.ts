export interface postUrlsReq {
  domain: 'POST' | 'CHAT';
  contentTypes: string[];
}

export interface postUrlsRes {
  sequence: number;
  fileName: string;
  uploadUrl: string;
}

export interface postFilesReq {
  domain: 'POST' | 'CHAT';
  fileNames: string[];
}

export interface editFilesReq {
  domain: 'POST' | 'CHAT';
  fileNames: string[];
  referenceId: string;
}

export type ImageFile = {
  file?: File;
  fileName: string;
  fileUrl?: string;
};
