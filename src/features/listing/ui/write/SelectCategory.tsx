import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import categories from '@/shared/constants/category.json';
import { useWriteStore } from '../../model/useWriteStore';
import { DropdownIcon } from '@/shared/assets/icons';
import * as S from './ListingWrite.styles';

interface SelectCategoryProps {
  categoryId?: number | null;
}

type Category = {
  id: number;
  name: string;
  parent_id: number | null;
};
const SelectCategory = ({ categoryId }: SelectCategoryProps) => {
  const theme = useTheme();
  const { setCategoryId } = useWriteStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
  useEffect(() => {
    if (categoryId) {
      const found = categories.find((c) => c.id === categoryId) ?? null;
      setSelectedCategory(found);
    }
  }, [categoryId]);
  const [dropdownState, setDropdownState] = useState<{
    isOpen: boolean;
    options: Category[];
    currentParentId: number | null;
  }>({
    isOpen: false,
    options: categories.filter((cat) => cat.parent_id === null),
    currentParentId: null,
  });

  function handleClickDropdown() {
    setDropdownState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      currentParentId: !prevState.isOpen ? null : prevState.currentParentId,
      options: !prevState.isOpen
        ? categories.filter((cat) => cat.parent_id === null)
        : prevState.options,
    }));
  }

  function handleClickItem(category: Category) {
    const children = categories.filter((cat) => cat.parent_id === category.id);

    if (children.length > 0) {
      setDropdownState((prevState) => ({
        ...prevState,
        options: children,
        currentParentId: category.id,
      }));
    } else {
      setSelectedCategory(category);
      setCategoryId(category.id);
      setDropdownState((prevState) => ({
        ...prevState,
        isOpen: false,
        currentParentId: null,
      }));
    }
  }
  return (
    <Container>
      <div style={{ width: 150 }}>
        <S.DropdownBox
          onClick={handleClickDropdown}
          disabled={categoryId ? true : false}>
          <p
            style={{
              fontSize: 14,
              color: !!selectedCategory?.id
                ? theme.colors.BLACK
                : theme.colors.GRAY_500,
            }}>
            {!!selectedCategory?.name ? selectedCategory.name : '선택안함'}
          </p>
          <DropdownIcon fill={theme.colors.GRAY_500} />
        </S.DropdownBox>
        {dropdownState.isOpen && (
          <S.OptionsWrapper>
            {dropdownState.options.length > 0 ? (
              dropdownState.options.map((option) => (
                <S.OptionBox
                  key={option.id}
                  onClick={() => handleClickItem(option)}>
                  {option.name}
                </S.OptionBox>
              ))
            ) : (
              <S.OptionBox $disabled={true}>
                카테고리를 찾을 수 없습니다
              </S.OptionBox>
            )}
          </S.OptionsWrapper>
        )}
      </div>
    </Container>
  );
};

export default SelectCategory;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;
