import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { ListingDetailProps } from '@/entities/listing/types';
import { getAreaNameById } from '@/features/user/lib';
import * as S from './ListingDetail.styles';
import { useMyQuery } from '@/entities/user';

type Writer = ListingDetailProps['writer'];

interface UserInfoProps {
  writer: Writer;
}

const UserInfo = ({ writer }: UserInfoProps) => {
  const router = useRouter();
  const { data, isError } = useMyQuery();
  const memberId = !isError && !!data?.memberId ? data.memberId : null;
  const handleClickUser = () => {
    if (writer.memberId === memberId) router.push('/my');
    else router.push(`/profile/${writer.memberId}`);
  };
  return (
    <S.UserInfo onClick={handleClickUser}>
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
        <S.Text>{getAreaNameById(writer.emdId)}</S.Text>
      </S.UserText>
    </S.UserInfo>
  );
};

export default UserInfo;
