import { LocalErrorBoundary } from '@/shared/lib';

const MyTrade = () => {
  return (
    <div style={{ width: '100%' }}>
      <LocalErrorBoundary>
        <div>내 거래</div>
      </LocalErrorBoundary>
    </div>
  );
};

export default MyTrade;
