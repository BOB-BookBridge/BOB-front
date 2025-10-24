import styled from 'styled-components';

interface MyTabProps {
  selected: number;
  onClick: (v: number) => void;
}
const MyTab = ({ selected, onClick }: MyTabProps) => {
  const tabs = ['프로필', '거래', '찜한 책', '게시글'];
  return (
    <Container>
      <ListWrapper>
        {tabs.map((label, i) => (
          <ListItem
            $isSelect={selected === i}
            key={i}
            className={i === selected ? 'active' : ''}
            onClick={() => onClick(i)}>
            {label}
          </ListItem>
        ))}
      </ListWrapper>
    </Container>
  );
};
export default MyTab;

const Container = styled.div`
  width: 350px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const ListWrapper = styled.ul`
  width: 100%;
  height: 100vh;
  padding: 20px;
  list-style: inside;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    height: auto;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 3px solid ${({ theme }) => theme.colors.GRAY_300};
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface ListItemProps {
  $isSelect: boolean;
}

const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0;
  color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.PRIMARY : theme.colors.GRAY_500};

  &::marker {
    color: ${({ $isSelect, theme }) =>
      $isSelect ? theme.colors.PRIMARY : theme.colors.GRAY_500};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
    text-align: center;
    padding: 8px 28px;
    white-space: nowrap;
    border-bottom: ${({ $isSelect, theme }) =>
      $isSelect ? `4px solid ${theme.colors.PRIMARY}` : 'none'};
    flex-shrink: 0;
  }
`;
