import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { ListingDetailRes, useLikeMutation } from '@/entities/listing';
import { useTradeDetailQuery } from '@/entities/trade';
import { TradeRequest } from '@/features/trade/ui';
import { LikeIcon } from '@/shared/assets/icons';
import { useMyQuery } from '@/entities/user';
import * as S from './ListingDetail.styles';
import { colors } from '@/shared/constants';
import { ModalLayout } from '@/shared/ui';
import { calcDistance } from '../../lib';
import { showToast } from '@/shared/lib';

interface ListingDetailActionsProps {
  data: ListingDetailRes;
  postId: number;
}

const ListingDetailActions = ({ data, postId }: ListingDetailActionsProps) => {
  const theme = useTheme();
  const { data: myData } = useMyQuery();
  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [originalLiked, setOriginalLiked] = useState<boolean | undefined>(
    undefined,
  );
  const { mutate: controlLike } = useLikeMutation(postId);
  const [openTradeRequest, setOpenTradeRequest] = useState(false);
  const tradeId = data.trade?.id;
  const { data: tradeData } = useTradeDetailQuery(tradeId);

  function checkLogin() {
    if (!data || !myData) {
      showToast.info('로그인 후 이용해 주세요.');
      return false;
    }
    return true;
  }

  function handleLike() {
    if (!checkLogin()) return;
    if (data.isOwner) {
      showToast.warn('본인의 게시글은 찜할 수 없습니다.');
      return;
    }
    setLiked((prev) => !prev);
  }

  function handleClickExchange() {
    if (!checkLogin()) return;
    if (data.isOwner) {
      showToast.warn('자신의 게시글에는 교환을 신청할 수 없습니다.');
      return;
    }
    setOpenTradeRequest(true);
  }

  useEffect(() => {
    setLiked(data.isFavorite);
    setOriginalLiked(data.isFavorite);
  }, [data.isFavorite]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (liked !== undefined && liked !== originalLiked) {
        controlLike(
          { postId, like: liked },
          {
            onSuccess: () => {
              setOriginalLiked(liked);
            },
          },
        );
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [liked, originalLiked]);

  return (
    <>
      <S.ButtonRow>
        <S.Button
          variant={liked ? 'outline-primary' : 'outline-gray'}
          onClick={handleLike}>
          <LikeIcon
            fill={liked ? colors.light.PRIMARY : 'none'}
            stroke={!liked ? theme.colors.GRAY_500 : theme.colors.PRIMARY}
            strokeWidth={1.5}
          />
          찜하기
        </S.Button>
        <S.Button variant='primary' onClick={handleClickExchange}>
          교환 신청
        </S.Button>
      </S.ButtonRow>
      {openTradeRequest && myData && (
        <ModalLayout
          isOpen={openTradeRequest}
          title='교환할 책을 선택해 주세요'
          onClose={() => setOpenTradeRequest(false)}>
          <TradeRequest
            isFar={calcDistance(myData.area.emdId, data.writer.emdId)}
            postId={postId}
            onClose={() => setOpenTradeRequest(false)}
            tradeId={data.trade ? data.trade.id : undefined}
            prevItems={tradeData?.buyer.item.map((i) => i.id)}
          />
        </ModalLayout>
      )}
    </>
  );
};
export default ListingDetailActions;
