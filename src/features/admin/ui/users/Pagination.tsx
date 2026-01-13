import styled from 'styled-components';
import { PAGE_SIZE } from './UserList';

const BLOCK_SIZE = 5;

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  setCurrentPage: (c: number) => void;
}
const Pagination = ({
  totalCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const totalPage = Math.ceil(totalCount / PAGE_SIZE);
  function getCurrentBlock() {
    return Math.floor((currentPage - 1) / BLOCK_SIZE);
  }
  function getTotalBlocks() {
    return Math.ceil(totalPage / BLOCK_SIZE);
  }

  function getPageNumbers() {
    const pages: number[] = [];

    if (totalPage <= BLOCK_SIZE) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      const currentBlock = Math.floor((currentPage - 1) / BLOCK_SIZE);
      const start = currentBlock * BLOCK_SIZE + 1;
      const end = Math.min(totalPage, start + BLOCK_SIZE - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  const handlePrevBlock = () => {
    const currentBlock = getCurrentBlock();
    if (currentBlock > 0) {
      const prevBlockStart = (currentBlock - 1) * BLOCK_SIZE + 1;
      setCurrentPage(prevBlockStart);
    }
  };

  const handleNextBlock = () => {
    const currentBlock = getCurrentBlock();
    const totalBlocks = getTotalBlocks();
    if (currentBlock < totalBlocks - 1) {
      const nextBlockStart = (currentBlock + 1) * BLOCK_SIZE + 1;
      setCurrentPage(nextBlockStart);
    }
  };
  return (
    <Container>
      <NavButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
        {'<<'}
      </NavButton>
      <NavButton onClick={handlePrevBlock} disabled={getCurrentBlock() === 0}>
        {'<'}
      </NavButton>

      {getPageNumbers().map((page) => (
        <PageButton
          key={page}
          $active={currentPage === page}
          onClick={() => setCurrentPage(page)}>
          {page}
        </PageButton>
      ))}

      <NavButton
        onClick={handleNextBlock}
        disabled={getCurrentBlock() === getTotalBlocks() - 1}>
        {'>'}
      </NavButton>
      <NavButton
        onClick={() => setCurrentPage(totalPage)}
        disabled={currentPage === totalPage}>
        {'>>'}
      </NavButton>
    </Container>
  );
};
export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
`;

const PageButton = styled.button<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.BLACK : theme.colors.GRAY_500};
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? 'transparent' : theme.colors.GRAY_300};
  }
`;

const NavButton = styled.button<{ disabled: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.GRAY_300 : theme.colors.GRAY_700};
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? 'transparent' : theme.colors.GRAY_200};
  }
`;
