export interface patchAreaProps {
  emdId: number;
  lat: number;
  lon: number;
}

export interface postSignUpProps {
  nickname: string;
  email: string;
  password: string;
  emdId: number;
}

export interface postLoginProps {
  email: string;
  password: string;
}
