import showToast from './showToast';

export function getCurrentPosition(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      showToast.error('위치 정보 불러오기를 지원하지 않습니다.');
      reject(new Error('GeolocationUnsupported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        showToast.error('위치 인증에 실패했습니다. 권한을 허용해 주세요.');
        reject(err);
      },
    );
  });
}
