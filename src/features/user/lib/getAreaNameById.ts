import emd_areas from '@/shared/constants/emd_areas.json';
import sigg_areas from '@/shared/constants/sigg_areas.json';

export function getAreaNameById(id: number): string | undefined {
  const siggId = emd_areas.find((e) => e.id === id)?.sigg_area_id;
  const sigg = sigg_areas.find((e) => e.id === siggId)?.name;
  const emd = emd_areas.find((e) => e.id === id)?.name;
  return sigg && emd ? `${sigg} ${emd}` : '알 수 없음';
}
