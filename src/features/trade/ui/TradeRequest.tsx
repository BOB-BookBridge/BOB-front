import { useState } from 'react';
import styled from 'styled-components';
import Tab from './Tab';
import { SearchModalContent } from '@/features/search/ui';
import { BookState, BookStatus } from '@/entities/listing';
import { ModalLayout } from '@/shared/ui';
import SelectBookStatus from '@/features/user/ui/profile/SelectBookStatus';
import SelectBook from './SelectBook';

const TradeRequest = () => {
  const tabs = ['책 선택', '책 등록'];
  const [selectedTab, setSelectedTab] = useState(0);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  function handleChangeTab(v: number) {
    setSelectedTab(v);
  }

  function handleSelectAddBook(book: BookState) {
    console.log(book);
    setOpenStatusModal(true);
  }

  function handleSelectBookStatus(bookStatus: BookStatus) {
    console.log(bookStatus);
    setOpenStatusModal(false);
    setSelectedTab(0);
  }

  return (
    <Container>
      <Tab tabs={tabs} selected={selectedTab} onChange={handleChangeTab} />
      {selectedTab === 0 ? (
        <SelectBook />
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
