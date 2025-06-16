export type PURPOSE_AREA = 'SIGN_UP' | 'RE_AUTHENTICATE' | 'CHANGE_AREA';

export interface patchAreaProps {
  emdId: number;
  lat: number;
  lon: number;
  purpose: PURPOSE_AREA;
}

export interface postJoinProps {
  nickname: string;
  email: string;
  password: string;
  emdId: number;
}
