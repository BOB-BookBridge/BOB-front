import { AladinItemType } from './type';

export const searchBook = async (query: string): Promise<AladinItemType[]> => {
  const res = await fetch(`/api/aladin?query=${query}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch search results');
  }
  const data = res.json();
  return data;
};
