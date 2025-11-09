import styled from 'styled-components';

interface TabProps {
  tabs: string[];
  selected: number;
  onChange: (v: number) => void;
}

const Tab = ({ tabs, selected = 0, onChange }: TabProps) => {
  return (
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
  );
};

export default Tab;

const ListWrapper = styled.ul`
  width: 100%;
  display: flex;
  height: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 3px solid ${({ theme }) => theme.colors.GRAY_300};
`;

interface ListItemProps {
  $isSelect: boolean;
}

const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  font-size: 16px;
  padding: 8px 0;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  flex: 1;
  font-weight: ${({ $isSelect }) => ($isSelect ? 500 : 400)};
  color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.BLACK : theme.colors.GRAY_500};
  border-bottom: 3px solid
    ${({ $isSelect, theme }) => ($isSelect ? theme.colors.BLACK : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 14px;
  }
`;
