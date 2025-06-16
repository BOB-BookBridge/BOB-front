import { useState } from 'react';

export function useAgreement() {
  const [agreements, setAgreements] = useState({ use: false, info: false });
  const isCheckedAll = agreements.use && agreements.info;

  const handleToggle = (key: 'use' | 'info') =>
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleToggleAll = () => {
    const checked = !isCheckedAll;
    setAgreements({ use: checked, info: checked });
  };

  return { agreements, isCheckedAll, handleToggle, handleToggleAll };
}
