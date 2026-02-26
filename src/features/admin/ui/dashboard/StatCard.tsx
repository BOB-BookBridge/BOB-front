import * as S from './StatCard.styles';

type CardVariant = 'blue' | 'green' | 'purple';

interface DashboardStatCardProps {
  label: string;
  currentValue: number;
  totalValue: number;
  variant: CardVariant;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};

const DashboardStatCard = ({
  label,
  currentValue,
  totalValue,
  variant,
}: DashboardStatCardProps) => {
  return (
    <S.Card $variant={variant}>
      <S.Label>{label}</S.Label>
      <S.ValueRow>
        <S.CurrentValue $variant={variant}>
          {formatNumber(currentValue)}
        </S.CurrentValue>
        <S.TotalValue>&nbsp;/&nbsp;{formatNumber(totalValue)}</S.TotalValue>
      </S.ValueRow>
    </S.Card>
  );
};

export default DashboardStatCard;
