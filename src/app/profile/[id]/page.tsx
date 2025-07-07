'use client';

import { UserProfile } from '@/features/user/ui';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

const UserProfilePage = () => {
  const params = useParams<{ id: string }>();
  if (!params || !params.id) return null;
  return (
    <Container>
      <UserProfile id={params.id} />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 20px;
`;

export default UserProfilePage;
