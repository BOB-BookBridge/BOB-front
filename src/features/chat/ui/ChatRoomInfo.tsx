import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import TradeDetail from '@/features/trade/ui/TradeDetail';
import { useTradeDetailQuery } from '@/entities/trade';
import { DropdownIcon } from '@/shared/assets/icons';
import { TradeRequest } from '@/features/trade/ui';
import { Button, ModalLayout } from '@/shared/ui';
import { chatPostStatusMap } from '@/shared/lib';
import { useMyQuery } from '@/entities/user';
import { ChatPost } from '@/entities/chat';
import * as S from './ChatRoom.styles';

interface ChatRoomInfoProps {
  tradeId: number;
  post: ChatPost;
  isOpenDropdown: boolean;
  onClick: () => void;
}

const ChatRoomInfo = ({
  tradeId,
  post,
  isOpenDropdown,
  onClick,
}: ChatRoomInfoProps) => {
  const theme = useTheme();
  const { data } = useMyQuery();
  const isSeller = data?.id === post.sellerId;
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { data: tradeData } = useTradeDetailQuery(tradeId);

  function handleClickEdit() {
    setOpenDetail(false);
    setOpenEdit(true);
  }

  function handleClickCloseEdit() {
    setOpenEdit(false);
    setOpenDetail(true);
  }

  function handleClickCloseAll() {
    setOpenEdit(false);
    setOpenDetail(false);
  }

  function handleClickStatus() {
    onClick();
  }
  return (
    <>
      <S.Info>
        <S.InfoLeftSection>
          <S.ImageWrapper>
            <Image
              src={post.thumbnailUrl}
              alt='책 대표사진'
              fill
              style={{ objectFit: 'cover' }}
            />
          </S.ImageWrapper>
          <div>
            <S.InfoTop>
              <S.Status
                onClick={isSeller ? handleClickStatus : undefined}
                $clickable={isSeller}>
                <S.StatusText>{chatPostStatusMap[post.status]}</S.StatusText>
                {isSeller && <DropdownIcon fill={theme.colors.BLACK} />}
                {isOpenDropdown && (
                  <S.DropdownList>
                    <S.DropdownItem>판매중</S.DropdownItem>
                    <S.DropdownItem>예약중</S.DropdownItem>
                    <S.DropdownItem>거래완료</S.DropdownItem>
                  </S.DropdownList>
                )}
              </S.Status>
              <S.TitleText>{post.title}</S.TitleText>
            </S.InfoTop>
            <S.InfoBottom>{post.sellPrice.toLocaleString()}원</S.InfoBottom>
          </div>
        </S.InfoLeftSection>
        <S.DetailButton onClick={() => setOpenDetail(true)}>
          거래 상세
        </S.DetailButton>
      </S.Info>
      {openDetail && tradeData && (
        <ModalLayout
          isOpen={openDetail}
          title={`${tradeData?.buyer.nickname}님의 거래 요청`}
          onClose={() => setOpenDetail(false)}>
          <TradeDetail
            type={isSeller ? 'RESPONSE' : 'REQUEST'}
            trade={tradeData}
          />
          <Button text='내 거래 물품 변경' onClick={handleClickEdit} />
        </ModalLayout>
      )}
      {openEdit && (
        <ModalLayout
          isOpen={openEdit}
          title='교환할 책을 선택해 주세요'
          onClose={handleClickCloseEdit}>
          <TradeRequest
            tradeId={tradeId}
            onClose={handleClickCloseAll}
            prevItems={
              isSeller
                ? tradeData?.seller.item.map((i) => i.id)
                : tradeData?.buyer.item.map((i) => i.id)
            }
          />
        </ModalLayout>
      )}
    </>
  );
};
export default ChatRoomInfo;
