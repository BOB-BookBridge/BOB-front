import styled from 'styled-components';

interface MyTabProps {
  selected: number;
  onClick: (v: number) => void;
}
const MyTab = ({ selected, onClick }: MyTabProps) => {
  const tabs = ['내 프로필', '내가 찜한 책', '내 판매글'];
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
  width: 250px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ListWrapper = styled.ul`
  width: 100%;
  height: 100vh;
  padding: 20px;
  list-style: inside;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: auto;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 5px solid ${({ theme }) => theme.colors.GRAY_300};
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
    $isSelect ? theme.colors.BLACK : theme.colors.GRAY_500};

  &::marker {
    color: ${({ $isSelect, theme }) =>
      $isSelect ? theme.colors.PRIMARY : theme.colors.BLACK};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
    text-align: center;
    padding: 10px;
    border-bottom: ${({ $isSelect, theme }) =>
      $isSelect ? `4px solid ${theme.colors.PRIMARY}` : 'none'};
  }
`;
