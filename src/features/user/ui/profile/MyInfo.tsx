import ProfileInfoSection from './ProfileInfoSection';
import AccountInfoSection from './AccountInfoSection';
import { useMyQuery } from '@/entities/user';
import * as S from '../Profile.styles';

const MyInfo = () => {
  const { data } = useMyQuery();

  return (
    <>
      {data ? (
        <S.Container>
          <ProfileInfoSection
            nickname={data.nickname}
            area={data.area}
            profileImageUrl={data.profileImageUrl}
          />
          <AccountInfoSection isSocial={data.isSocial} email={data.email} />
        </S.Container>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default MyInfo;
