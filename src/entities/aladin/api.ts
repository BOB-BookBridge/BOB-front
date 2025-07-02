import { AladinResponse } from './type';

export const searchBook = async (query: string): Promise<AladinResponse> => {
  const res = await fetch(`/api/aladin?query=${query}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch search results');
  }
  const data = res.json();
  console.log(data);
  return data;
};
