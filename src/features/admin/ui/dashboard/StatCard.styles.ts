import styled, { css, DefaultTheme } from 'styled-components';

type CardVariant = 'blue' | 'green' | 'yellow' | 'red' | 'purple';

const variantStyles = (colors: DefaultTheme['colors']) => ({
  blue: css`
    background-color: ${colors.DASHBOARD.BLUE_100};
    border: 1px solid ${colors.DASHBOARD.BLUE_200};
  `,
  green: css`
    background-color: ${colors.DASHBOARD.GREEN_100};
    border: 1px solid ${colors.DASHBOARD.GREEN_200};
  `,
  yellow: css`
    background-color: ${colors.PRIMARY_100};
    border: 1px solid ${colors.PRIMARY};
  `,
  red: css`
    background-color: ${colors.DANGER_100};
    border: 1px solid ${colors.DASHBOARD.RED_200};
  `,
  purple: css`
    background-color: ${colors.DASHBOARD.PURPLE_100};
    border: 1px solid ${colors.DASHBOARD.PURPLE_200};
  `,
});

const currentValueColor = (colors: DefaultTheme['colors']) => ({
  blue: colors.DASHBOARD.BLUE_300,
  green: colors.DASHBOARD.GREEN_300,
  yellow: colors.PRIMARY,
  red: colors.DANGER,
  purple: colors.DASHBOARD.PURPLE_300,
});

export const Card = styled.div<{ $variant: CardVariant }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 24px;
  border-radius: 12px;
  flex: 1;
  min-width: 0;
  ${({ $variant, theme }) => variantStyles(theme.colors)[$variant]}
`;

export const Label = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

export const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
`;

export const CurrentValue = styled.span<{ $variant: CardVariant }>`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ $variant, theme }) => currentValueColor(theme.colors)[$variant]};
`;

export const TotalValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
`;
