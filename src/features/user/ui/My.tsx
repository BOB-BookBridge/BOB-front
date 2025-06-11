import { useState } from 'react';
import MyTab from './MyTab';

const My = () => {
  const [selected, setSelected] = useState(0);
  function handleClickTab(value: number) {
    setSelected(value);
  }
  return (
    <div>
      <MyTab selected={selected} onClick={handleClickTab} />
    </div>
  );
};

export default My;
