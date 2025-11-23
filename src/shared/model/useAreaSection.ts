import { useState } from 'react';

export function useAreaSection(onChange?: (emdId: number) => void) {
  const [sidoId, setSidoId] = useState<number | undefined>(undefined);
  const [siggId, setSiggId] = useState<number | undefined>(undefined);
  const [emdId, setEmdId] = useState<number | undefined>(undefined);

  // 상위 지역이 변경되면 하위 지역은 리셋되어야 함
  function handleSelectSido(value: number) {
    if (sidoId && value !== sidoId) {
      setSiggId(undefined);
      setEmdId(undefined);
    }
    setSidoId(value);
  }

  function handleSelectSigg(value: number) {
    if (siggId && value !== siggId) {
      setEmdId(undefined);
    }
    setSiggId(value);
  }

  function handleSelectEmd(value: number) {
    setEmdId(value);
    onChange?.(value);
  }

  return {
    sidoId,
    siggId,
    emdId,
    setSidoId,
    setSiggId,
    setEmdId,
    handleSelectSido,
    handleSelectSigg,
    handleSelectEmd,
  };
}
