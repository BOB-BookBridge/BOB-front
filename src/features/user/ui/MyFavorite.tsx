import { ListingList } from '@/features/listing/ui';
import { LocalErrorBoundary } from '@/shared/lib';

const MyFavorite = () => {
  return (
    <div style={{ width: '100%' }}>
      <LocalErrorBoundary>
        <ListingList isFavorite={true} />
      </LocalErrorBoundary>
    </div>
  );
};

export default MyFavorite;
