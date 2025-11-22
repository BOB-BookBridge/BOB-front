import styled from 'styled-components';
import BookShelfSection from './BookShelfSection';
import { useMyQuery } from '@/entities/user';
import {
  LoadingContainer,
  LoadingIndicator,
} from '@/shared/ui/LoadingIndicator';

const Bookcase = () => {
  const { data, isPending } = useMyQuery();
  return (
    <Container>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator text='불러오는중' />
        </LoadingContainer>
      ) : (
        data && <BookShelfSection books={data.bookcase} type='BOOKCASE' />
      )}
    </Container>
  );
};

export default Bookcase;

const Container = styled.div`
  width: 100%;
`;
