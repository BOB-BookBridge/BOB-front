import { useState } from 'react';
import styled from 'styled-components';
import SelectBookStatus from '@/features/user/ui/profile/SelectBookStatus';
import { LoadingIndicator, ModalLayout } from '@/shared/ui';
import { BookModel, BookStatus } from '@/entities/listing';
import { SearchModalContent } from '@/features/search/ui';
import SelectBook from './SelectBook';
import {
  usePatchTradeItemsMutation,
  usePostTradeMutation,
} from '@/entities/trade';
import {
  Bookcase,
  useBookcaseMutation,
  useBookcaseQuery,
  useMyQuery,
} from '@/entities/user';
import Tab from './Tab';

const TradeRequest = ({
  postId,
  isFar,
  prevItems,
  tradeId,
  onClose,
}: {
  postId?: number;
  isFar?: boolean;
  prevItems?: number[];
  tradeId?: number;
  onClose: () => void;
}) => {
  const tabs = ['책 선택', '책 등록'];
  const [selectedTab, setSelectedTab] = useState(0);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);
  const { data: mydata } = useMyQuery();
  const { data: bookcaseData, isLoading } = useBookcaseQuery(
    { memberId: mydata?.memberId ?? '', key: 'AVAILABLE', require: prevItems },
    { enabled: !!mydata?.memberId },
  );
  const { mutate: enterBookcaseBook } = useBookcaseMutation();
  const { mutate: requestTrade } = usePostTradeMutation();
  const { mutate: changeTradeItems } = usePatchTradeItemsMutation();

  if (isLoading || !bookcaseData) {
    return <LoadingIndicator text='로딩중' />;
  }

  function handleChangeTab(v: number) {
    setSelectedTab(v);
  }

  function handleSelectAddBook(book: BookModel) {
    setSelectedBook(book);
    setOpenStatusModal(true);
  }

  function handleSelectBookStatus(bookStatus: BookStatus) {
    if (!selectedBook) return;

    const bookWithStatus = {
      ...selectedBook,
      status: bookStatus,
    };
    enterBookcaseBook(bookWithStatus);
    setOpenStatusModal(false);
    setSelectedTab(0);
  }

  function handleTradeRequest(selected: Bookcase[]) {
    const itemIds = selected.map((book) => book.id);

    if (postId && isFar !== undefined) {
      requestTrade(
        { postId, itemIds, isFar },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
    if (prevItems && tradeId) {
      changeTradeItems(
        { tradeId, itemIds },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
  }

  return (
    <Container>
      <Tab tabs={tabs} selected={selectedTab} onChange={handleChangeTab} />
      {selectedTab === 0 ? (
        bookcaseData.length === 0 ? (
          <EmptyText>
            {`거래에 이용 가능한 책이 없습니다 \n 책 등록 탭에서 추가해 주세요`}
          </EmptyText>
        ) : (
          <SelectBook
            books={bookcaseData}
            onTradeRequest={handleTradeRequest}
            prevItems={prevItems}
          />
        )
      ) : (
        <SearchModalContent onSelectBook={handleSelectAddBook} />
      )}

      {openStatusModal && (
        <ModalLayout
          isOpen={openStatusModal}
          onClose={() => setOpenStatusModal(false)}
          title='책 상태 입력'>
          <SelectBookStatus onSelect={handleSelectBookStatus} />
        </ModalLayout>
      )}
    </Container>
  );
};

export default TradeRequest;

const Container = styled.div`
  width: 100%;
`;

const EmptyText = styled.div`
  text-align: center;
  margin: 10px;
  color: ${({ theme }) => theme.colors.GRAY_600};
  white-space: pre-wrap;
  font-size: 14px;
`;
