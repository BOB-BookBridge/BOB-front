import { Dayjs } from 'dayjs';
import { DateRange, useDashboardPost } from '@/entities/admin/dashboard';
import { LoadingContainer, LoadingIndicator } from '@/shared/ui';
import { getCategoryNameById } from '@/features/listing/lib';
import sigg_areas from '@/shared/constants/sigg_areas.json';
import sido_areas from '@/shared/constants/sido_areas.json';
import emd_areas from '@/shared/constants/emd_areas.json';
import * as S from './DashboardPostSections.styles';

interface DashboardPostSectionProps {
  dateRange: DateRange;
}

const toQueryParam = (date: Dayjs | null) =>
  date?.format('YYYY-MM-DD') ?? undefined;
const TOP_N = 5;

const getSidoNameByEmdId = (emdId: number): string => {
  const emd = emd_areas.find((e) => e.id === emdId);
  if (!emd) return '기타';
  const sigg = sigg_areas.find((s) => s.id === emd.sigg_area_id);
  if (!sigg) return '기타';
  const sido = sido_areas.find((s) => s.id === sigg.sido_area_id);
  return sido?.name ?? '기타';
};

const groupBySido = (areaDistribution: { emdId: number; count: number }[]) => {
  const map = new Map<string, number>();
  for (const area of areaDistribution) {
    const sidoName = getSidoNameByEmdId(area.emdId);
    map.set(sidoName, (map.get(sidoName) ?? 0) + area.count);
  }
  const sorted = Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  if (sorted.length <= TOP_N) return sorted;

  const top = sorted.slice(0, TOP_N);
  const etcCount = sorted
    .slice(TOP_N)
    .reduce((sum, item) => sum + item.count, 0);
  return [...top, { name: '기타', count: etcCount }];
};

const groupCategories = (
  categoryDistribution: { categoryId: number; count: number }[],
) => {
  const sorted = [...categoryDistribution].sort((a, b) => b.count - a.count);

  if (sorted.length <= TOP_N) {
    return sorted.map((cat) => ({
      name: getCategoryNameById(cat.categoryId) ?? `카테고리 ${cat.categoryId}`,
      count: cat.count,
    }));
  }

  const top = sorted.slice(0, TOP_N).map((cat) => ({
    name: getCategoryNameById(cat.categoryId) ?? `카테고리 ${cat.categoryId}`,
    count: cat.count,
  }));
  const etcCount = sorted.slice(TOP_N).reduce((sum, cat) => sum + cat.count, 0);
  return [...top, { name: '기타', count: etcCount }];
};

const DashboardPostSection = ({ dateRange }: DashboardPostSectionProps) => {
  const params = {
    from: toQueryParam(dateRange.from),
    to: toQueryParam(dateRange.to),
  };

  const { data, isPending } = useDashboardPost(params);

  if (isPending || !data)
    return (
      <LoadingContainer>
        <LoadingIndicator />
      </LoadingContainer>
    );
  const totalPosts = data.totals.registered;
  const categories = groupCategories(data.categoryDistribution);
  const areas = groupBySido(data.areaDistribution);

  return (
    <S.Wrapper>
      <S.Card>
        <S.CardTitle>게시글 통계</S.CardTitle>

        <S.TotalsRow>
          <S.TotalItem>
            <S.TotalLabel>등록</S.TotalLabel>
            <S.TotalValue $color='blue'>
              {data.totals.registered.toLocaleString('ko-KR')}건
            </S.TotalValue>
          </S.TotalItem>
          <S.TotalItem>
            <S.TotalLabel>삭제</S.TotalLabel>
            <S.TotalValue $color='red'>
              {data.totals.deleted.toLocaleString('ko-KR')}건
            </S.TotalValue>
          </S.TotalItem>
        </S.TotalsRow>

        <S.CategorySection>
          <S.CategoryLabel>카테고리별</S.CategoryLabel>
          <S.CategoryList>
            {data.categoryDistribution.length === 0 ? (
              <S.EmptyMessage>데이터가 없습니다</S.EmptyMessage>
            ) : (
              categories.map((cat) => {
                const percent = ((cat.count / totalPosts) * 100).toFixed(1);
                return (
                  <S.CategoryRow key={cat.name}>
                    <S.CategoryName>{cat.name}</S.CategoryName>
                    <S.CategoryCount>
                      {cat.count.toLocaleString('ko-KR')}건({percent}%)
                    </S.CategoryCount>
                  </S.CategoryRow>
                );
              })
            )}
          </S.CategoryList>
        </S.CategorySection>
      </S.Card>

      <S.Card>
        <S.CardTitle>게시글 지역별 분포</S.CardTitle>
        <S.AreaList>
          {data.areaDistribution.length === 0 ? (
            <S.EmptyMessage>데이터가 없습니다</S.EmptyMessage>
          ) : (
            areas.map((area) => {
              const percent = ((area.count / totalPosts) * 100).toFixed(1);
              return (
                <S.AreaItem key={area.name}>
                  <S.AreaHeader>
                    <S.AreaName>{area.name}</S.AreaName>
                    <S.AreaCount>
                      {area.count.toLocaleString('ko-KR')}건 ({percent}%)
                    </S.AreaCount>
                  </S.AreaHeader>
                  <S.ProgressBarTrack>
                    <S.ProgressBarFill $percent={Number(percent)} />
                  </S.ProgressBarTrack>
                </S.AreaItem>
              );
            })
          )}
        </S.AreaList>
      </S.Card>
    </S.Wrapper>
  );
};

export default DashboardPostSection;
