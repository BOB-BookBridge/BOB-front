export interface postAreaReq {
  emdId: number;
  lat: number;
  lon: number;
}

export interface postSignUpReq {
  nickname: string;
  email: string;
  password: string;
  emdId: number;
}

export interface postLoginReq {
  email: string;
  password: string;
}
