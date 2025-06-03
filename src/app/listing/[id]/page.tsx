'use client';

import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { ListingDetail } from '@/features/listing/ui';

const ListingDetailPage = () => {
  const params = useParams<{ id: string }>();
  if (!params || !params.id) return null;
  return (
    <Container>
      <ListingDetail id={Number(params.id)} />
    </Container>
  );
};

const Container = styled.div`
  margin-right: 100px;
  @media (max-width: 744px) {
    margin-right: 0;
  }
`;

export default ListingDetailPage;
