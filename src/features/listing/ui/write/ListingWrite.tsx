import { useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ArrowIConLg, PhotoIcon } from '@/shared/assets/icons';

interface ListingWriteProps {
  id?: number;
}

const ListingWrite = ({ id }: ListingWriteProps) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [title, setTitle] = useState<string>('파과');
  const [price, setPrice] = useState<string>('');
  const [rawPrice, setRawPrice] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');

  function formatNumber(value: string | number) {
    const num =
      typeof value === 'number' ? value : Number(value.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString();
  }

  function unformatNumber(formatted: string) {
    return formatted.replace(/,/g, '');
  }
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const numeric = unformatNumber(input);

    if (!/^\d*$/.test(numeric)) return;

    setRawPrice(numeric === '' ? null : Number(numeric));
    setPrice(formatNumber(numeric));
  }
  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setDescription(e.target.value);
  }
  return (
    <Container>
      <PhotoList>
        <AddPhoto>
          <PhotoIcon fill={theme.colors.GRAY_500} />
          <div style={{ color: theme.colors.GRAY_500 }}>0/5</div>
        </AddPhoto>
      </PhotoList>
      <SearchSection>
        <HeaderText>책 조회</HeaderText>
        <InputWrapper>
          <Input
            value={searchTerm}
            type='text'
            placeholder='책 제목이나 ISBN을 입력해 주세요'
            onChange={handleSearchTermChange}
          />
          <EnterButton>
            <ArrowIConLg fill={theme.colors.GRAY_800} />
          </EnterButton>
        </InputWrapper>
      </SearchSection>
      <TitleSection>
        <HeaderText>제목</HeaderText>
        <InputWrapper>
          <Input type='text' value={title} readOnly />
        </InputWrapper>
      </TitleSection>
      <StatusSection>
        <HeaderText>상태</HeaderText>
      </StatusSection>
      <PriceAndCategory>
        <InputWrapper style={{ flex: 1 }}>
          <span>₩</span>
          <Input
            type='text'
            value={price}
            onChange={handlePriceChange}
            inputMode='numeric'
            placeholder='가격을 입력하세요'
          />
        </InputWrapper>
        <InputWrapper style={{ flex: 0.5 }}></InputWrapper>
      </PriceAndCategory>
      <DescriptionSection>
        <HeaderText>설명</HeaderText>
        <InputWrapper>
          <Textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder='책 상태나 특징을 자유롭게 적어주세요'
            maxLength={500}
          />
        </InputWrapper>
      </DescriptionSection>
    </Container>
  );
};

export default ListingWrite;

const Container = styled.div`
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  // background-color: pink;
`;

const PhotoList = styled.div`
  width: 100%;
`;
const AddPhoto = styled.div`
  border: 1.5px solid ${({ theme }) => theme.colors.GRAY_500};
  border-radius: 20px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_500};
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.BLACK};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE}
      inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

const EnterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const TitleSection = styled.div`
  width: 100%;
`;
const HeaderText = styled.span``;

const StatusSection = styled.div`
  width: 100%;
`;

const PriceAndCategory = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;
const DescriptionSection = styled.div`
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  min-height: 120px;
  line-height: 1.5;
  resize: none;
  overflow: hidden;

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;
