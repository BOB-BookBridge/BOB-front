'use client';

import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { ListingWrite } from '@/features/listing/ui';

const ListingWritePage = () => {
  const params = useParams<{ id: string }>();

  return (
    <Container>
      <ListingWrite id={Number(params?.id)} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default ListingWritePage;
