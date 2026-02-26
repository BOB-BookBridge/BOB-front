import { Dayjs } from 'dayjs';
import * as S from './DashboardTradeSection.styles';
import { DateRange, useDashboardTrade } from '@/entities/admin/dashboard';

const TRADE_BARS = [
  { key: 'requested', label: '요청' },
  { key: 'accepted', label: '수락' },
  { key: 'reserved', label: '예약' },
  { key: 'completed', label: '완료' },
] as const;

interface DashboardTradeSectionProps {
  dateRange: DateRange;
}

const toQueryParam = (date: Dayjs | null) =>
  date?.format('YYYY-MM-DD') ?? undefined;

const DashboardTradeSection = ({ dateRange }: DashboardTradeSectionProps) => {
  const params = {
    from: toQueryParam(dateRange.from),
    to: toQueryParam(dateRange.to),
  };
  const { data, isPending, isError } = useDashboardTrade(params);

  if (isPending) return <S.Wrapper>로딩 중...</S.Wrapper>;
  if (isError || !data)
    return <S.Wrapper>데이터를 불러올 수 없습니다.</S.Wrapper>;

  const { totals } = data;
  const successCount = totals.completed + totals.reserved;
  const successRate =
    totals.total > 0 ? ((successCount / totals.total) * 100).toFixed(1) : '0.0';

  return (
    <S.Wrapper>
      <S.Card>
        <S.Header>
          <S.CardTitle>거래 단계별 현황</S.CardTitle>
          <S.SuccessRate>
            거래성사율 <S.RateValue>{successRate}%</S.RateValue>
          </S.SuccessRate>
        </S.Header>

        <S.BarList>
          {TRADE_BARS.map(({ key, label }) => {
            const count = totals[key];
            const percent = totals.total > 0 ? (count / totals.total) * 100 : 0;
            return (
              <S.BarItem key={key}>
                <S.BarMeta>
                  <S.BarLabel>{label}</S.BarLabel>
                  <S.BarCount>
                    {count.toLocaleString('ko-KR')}건 ({percent.toFixed(1)}%)
                  </S.BarCount>
                </S.BarMeta>
                <S.ProgressBarTrack>
                  <S.ProgressBarFill $percent={percent} $key={key} />
                </S.ProgressBarTrack>
              </S.BarItem>
            );
          })}
        </S.BarList>
      </S.Card>
    </S.Wrapper>
  );
};

export default DashboardTradeSection;
