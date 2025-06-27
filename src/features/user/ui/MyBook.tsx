import { ListingList } from '@/features/listing/ui';

const MyBook = () => {
  return (
    <div style={{ width: '100%' }}>
      <ListingList isMyPage={true} />
    </div>
  );
};

export default MyBook;
