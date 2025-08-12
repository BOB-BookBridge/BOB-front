'use client';

import styled from 'styled-components';
import { useParams } from 'next/navigation';
import { ListingDetail } from '@/features/listing/ui';
import { LocalErrorBoundary } from '@/shared/lib';

const ListingDetailPage = () => {
  const params = useParams<{ id: string }>();
  if (!params || !params.id) return null;
  return (
    <Container>
      <LocalErrorBoundary>
        <ListingDetail id={Number(params.id)} />
      </LocalErrorBoundary>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default ListingDetailPage;
