import { patchArea, PURPOSE_AREA } from '@/entities/auth';

interface areaVerifyProps {
  emdId: number;
  purpose: PURPOSE_AREA;
  onSuccess: () => void;
}
export function areaVerify({ emdId, purpose, onSuccess }: areaVerifyProps) {
  if (!navigator.geolocation) {
    console.log('위치 정보 지원 X');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        await patchArea({
          emdId,
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          purpose,
        });
        onSuccess();
      } catch (error) {
        alert('위치 인증에 실패했습니다.');
        console.log(error);
      }
    },
    (err) => {
      alert('위치 인증에 실패했습니다. 권한을 허용해 주세요.');
    },
  );
}
