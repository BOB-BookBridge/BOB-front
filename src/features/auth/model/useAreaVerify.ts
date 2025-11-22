import { useState } from 'react';
import { toast } from 'react-toastify';
import { AreaState } from '@/shared/model/SelectAreaSection.type';
import { useAreaMutation } from '@/entities/auth/queries';
import { getCurrentPosition } from '@/shared/lib';

export function useAreaVerify() {
  const [emdId, setEmdId] = useState<number | undefined>();
  const [isVerifiedArea, setIsVerifiedArea] = useState(false);
  const { mutate: areaVerify } = useAreaMutation();

  const handleAreaChange = (selection: AreaState) => {
    setEmdId(selection.emdId);
    setIsVerifiedArea(false);
  };

  const handleAreaVerify = async (value?: number) => {
    if (!emdId) {
      toast.error('활동 지역을 입력해 주세요');
      return;
    }
    const { lat, lon } = await getCurrentPosition();
    areaVerify(
      { emdId: value ? value : emdId, lat, lon },
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
