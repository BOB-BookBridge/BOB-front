import styled from 'styled-components';

interface BadgeProps {
  unReadCount: number;
  type?: 'fab' | 'default';
}
const Badge = ({ unReadCount, type = 'default' }: BadgeProps) => {
  const badgeText = unReadCount > 99 ? '99+' : String(unReadCount);
  return (
    <>
      {type === 'default' ? (
        <StyledBadge>{badgeText}</StyledBadge>
      ) : (
        <FabBadge length={badgeText.length}>{badgeText}</FabBadge>
      )}
    </>
  );
};

export default Badge;

interface FabBadgeProps {
  length: number;
}
export const FabBadge = styled.span<FabBadgeProps>`
  position: absolute;
  top: -4px;
  right: ${({ length }) =>
    length === 1 ? '-4px' : length === 2 ? '-8px' : '-12px'};
  min-width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.BADGE};
  color: white;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  padding: 0 6px;
  justify-content: center;
  align-items: center;
`;

export const StyledBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.BADGE};
  color: white;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 0 6px;
`;
