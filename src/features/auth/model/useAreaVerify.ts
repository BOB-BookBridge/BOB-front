import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAreaMutation } from '@/entities/auth/queries';
import { getCurrentPosition } from '@/shared/lib';

export function useAreaVerify() {
  const [emdId, setEmdId] = useState<number>();
  const [isVerifiedArea, setIsVerifiedArea] = useState(false);
  const { mutate: areaVerify } = useAreaMutation();

  const handleAreaChange = (value: number) => {
    setEmdId(value);
    setIsVerifiedArea(false);
  };

  const handleAreaVerify = async (value?: number) => {
    const targetEmdId = value ?? emdId;
    if (!targetEmdId) {
      toast.error('활동 지역을 입력해 주세요');
      return;
    }
    const { lat, lon } = await getCurrentPosition();
    areaVerify(
      { emdId: targetEmdId, lat, lon },
      { onSuccess: () => setIsVerifiedArea(true) },
    );
  };

  return {
    emdId,
    isVerifiedArea,
    handleAreaChange,
    handleAreaVerify,
  };
}
