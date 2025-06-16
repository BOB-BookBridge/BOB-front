import { useState } from 'react';

export function useAreaVerify() {
  const [emdId, setEmdId] = useState<number | undefined>();
  const [isVerifiedArea, setIsVerifiedArea] = useState(false);

  const handleAreaChange = () => {
    setEmdId(undefined);
    setIsVerifiedArea(false);
  };
  const handleAreaVerified = (id: number) => {
    setEmdId(id);
    setIsVerifiedArea(true);
  };

  return { emdId, isVerifiedArea, handleAreaChange, handleAreaVerified };
}
