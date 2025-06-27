import { ListingList } from '@/features/listing/ui';

const MyFavorite = () => {
  return (
    <div style={{ width: '100%' }}>
      <ListingList isFavorite={true} />
    </div>
  );
};

export default MyFavorite;
