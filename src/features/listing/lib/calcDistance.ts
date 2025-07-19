import emd_areas from '@/shared/constants/emd_areas.json';

export function calcDistance(emdId1: number, emdId2: number) {
  const sigg1 = emd_areas.find((area) => area.id === emdId1)?.sigg_area_id;
  const sigg2 = emd_areas.find((area) => area.id === emdId2)?.sigg_area_id;
  return sigg1 !== sigg2 ? true : false;
}
