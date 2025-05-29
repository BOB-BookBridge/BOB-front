import categories from '@/shared/constants/category.json';

type Category = {
  id: number;
  name: string;
  parent_id: number | null;
};

export function getCategoryNameById(id: number): string | undefined {
  return categories.find((cat: Category) => cat.id === id)?.name;
}
