import styled from 'styled-components';

interface SubTabsProps {
  tabs: string[];
  selected: number;
  onChange: (v: number) => void;
}

const SubTab = ({ tabs, selected = 0, onChange }: SubTabsProps) => {
  return (
    <Container>
      <ListWrapper>
        {tabs.map((label, i) => (
          <ListItem
            $isSelect={selected === i}
            key={i}
            className={i === selected ? 'active' : ''}
            onClick={() => onChange(i)}>
            {label}
          </ListItem>
        ))}
      </ListWrapper>
    </Container>
  );
};

export default SubTab;

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListWrapper = styled.ul`
  display: inline-flex;
  flex-wrap: nowrap;
  width: fit-content;
  height: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 3px solid ${({ theme }) => theme.colors.GRAY_300};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-bottom: none;
  }
`;

interface ListItemProps {
  $isSelect: boolean;
}

const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  font-size: 16px;
  padding: 8px 20px;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  font-weight: ${({ $isSelect }) => ($isSelect ? 500 : 400)};
  color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.BLACK : theme.colors.GRAY_500};
  border-bottom: 3px solid
    ${({ $isSelect, theme }) => ($isSelect ? theme.colors.PRIMARY : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 14px;
    border-bottom: none;
  }
`;
