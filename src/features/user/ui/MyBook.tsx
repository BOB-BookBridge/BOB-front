import { ListingList } from '@/features/listing/ui';
import { LocalErrorBoundary } from '@/shared/lib';

const MyBook = () => {
  return (
    <div style={{ width: '100%' }}>
      <LocalErrorBoundary>
        <ListingList isUserPage={true} />
      </LocalErrorBoundary>
    </div>
  );
};

export default MyBook;
