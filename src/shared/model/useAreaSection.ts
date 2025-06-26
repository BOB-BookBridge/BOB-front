import { useState } from 'react';

export function useAreaSection(onChange?: () => void) {
  const [sidoId, setSidoId] = useState<number | undefined>(undefined);
  const [siggId, setSiggId] = useState<number | undefined>(undefined);
  const [emdId, setEmdId] = useState<number | undefined>(undefined);
  const [isVerify, setIsVerify] = useState(false);

  // 상위 지역이 변경되면 하위 지역은 리셋되어야 함
  function handleSelectSido(value: number) {
    if (sidoId && value !== sidoId) {
      setIsVerify(false);
      setSiggId(undefined);
      setEmdId(undefined);
      if (onChange) onChange();
    }
    setSidoId(value);
  }

  function handleSelectSigg(value: number) {
    if (siggId && value !== siggId) {
      setIsVerify(false);
      setEmdId(undefined);
      if (onChange) onChange();
    }
    setSiggId(value);
  }

  function handleSelectEmd(value: number) {
    setEmdId(value);
  }

  return {
    sidoId,
    siggId,
    emdId,
    isVerify,
    setSidoId,
    setSiggId,
    setEmdId,
    setIsVerify,
    handleSelectSido,
    handleSelectSigg,
    handleSelectEmd,
  };
}
