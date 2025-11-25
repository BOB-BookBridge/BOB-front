import styled from 'styled-components';
import BookShelfSection from './BookShelfSection';
import { useMyQuery } from '@/entities/user';
import {
  LoadingContainer,
  LoadingIndicator,
} from '@/shared/ui/LoadingIndicator';

const WishList = () => {
  const { data, isPending } = useMyQuery();
  return (
    <Container>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        data &&
        data.wishes && <BookShelfSection books={data?.wishes} type='WISH' />
      )}
    </Container>
  );
};

export default WishList;

const Container = styled.div`
  width: 100%;
`;
