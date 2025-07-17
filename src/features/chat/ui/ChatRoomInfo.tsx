import Image from 'next/image';
import { useTheme } from 'styled-components';
import { DropdownIcon } from '@/shared/assets/icons';
import { chatPostStatusMap } from '@/shared/lib';
import { useMyQuery } from '@/entities/user';
import * as S from './ChatRoom.styles';

type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  sellPrice: number;
  sellerId: string;
  status: 'IN_PROGRESS';
};
interface ChatRoomInfoProps {
  post: Post;
  isOpenDropdown: boolean;
  onClick: () => void;
}
const ChatRoomInfo = ({ post, isOpenDropdown, onClick }: ChatRoomInfoProps) => {
  const theme = useTheme();
  const { data } = useMyQuery();
  const isSeller = data?.memberId === post.sellerId;
  function handleClickStatus() {
    onClick();
  }
  return (
    <S.Info>
      <S.ImageWrapper>
        <Image
          loader={() => post.thumbnailUrl}
          src={post.thumbnailUrl}
          alt='책 대표사진'
          width={40}
          height={40}
          unoptimized
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
                <S.DropdownItem>거래완료</S.DropdownItem>
              </S.DropdownList>
            )}
          </S.Status>
          <S.TitleText>{post.title}</S.TitleText>
        </S.InfoTop>
        <S.InfoBottom>{post.sellPrice.toLocaleString()}원</S.InfoBottom>
      </div>
    </S.Info>
  );
};
export default ChatRoomInfo;
