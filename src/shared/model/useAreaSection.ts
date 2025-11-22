import { useState } from 'react';
import { AreaState } from './SelectAreaSection.type';

export function useAreaSection(onChange?: (selection: AreaState) => void) {
  const [sidoId, setSidoId] = useState<number | undefined>(undefined);
  const [siggId, setSiggId] = useState<number | undefined>(undefined);
  const [emdId, setEmdId] = useState<number | undefined>(undefined);

  // 상위 지역이 변경되면 하위 지역은 리셋되어야 함
  function handleSelectSido(value: number) {
    if (sidoId && value !== sidoId) {
      const next = { sidoId: value, siggId: undefined, emdId: undefined };
      setSiggId(undefined);
      setEmdId(undefined);
      onChange?.(next);
    }
    setSidoId(value);
  }

  function handleSelectSigg(value: number) {
    if (siggId && value !== siggId) {
      const next = { sidoId, siggId: value, emdId: undefined };
      setEmdId(undefined);
      onChange?.(next);
    }
    setSiggId(value);
  }

  function handleSelectEmd(value: number) {
    const next = { sidoId, siggId, emdId: value };
    setEmdId(value);
    onChange?.(next);
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
