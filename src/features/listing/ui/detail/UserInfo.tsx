import Image from 'next/image';
import { ListingDetailProps } from '@/entities/listing/types';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import * as S from './ListingDetail.styles';

type Writer = ListingDetailProps['writer'];

interface UserInfoProps {
  writer: Writer;
}

const UserInfo = ({ writer }: UserInfoProps) => {
  return (
    <S.UserInfo>
      {writer.profileUrl ? (
        <Image
          src={writer.profileUrl}
          width={60}
          height={60}
          alt='profile image'
        />
      ) : (
        <DefaultProfile width={60} />
      )}
      <S.UserText>
        <S.HeadingText>{writer.nickname}</S.HeadingText>
        <S.Text>{writer.activityArea}</S.Text>
      </S.UserText>
    </S.UserInfo>
  );
};

export default UserInfo;
