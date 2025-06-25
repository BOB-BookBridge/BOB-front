import DefaultProfile from '@/shared/assets/default-profile.svg';
import { useLogoutMutation } from '@/entities/auth/queries';
import { useMyQuery } from '@/entities/user';
import EditNickname from './EditNickname';
import EditPassword from './EditPassword';
import * as S from './EditProfile.styles';
import EditArea from './EditArea';

const EditProfile = () => {
  const { data } = useMyQuery();
  const { mutate: logout } = useLogoutMutation();
  function handleLogout() {
    logout();
  }
  function handleDeleteAccount() {}
  return (
    <>
      {data ? (
        <S.Container>
          <DefaultProfile width={80} />
          <EditNickname defaultNickname={data.nickname} />
          <EditArea />
          <EditPassword />
          <S.AccountRow>
            <div style={{ fontWeight: 600 }}>계정</div>
            <S.AccountButton onClick={handleLogout}>로그아웃</S.AccountButton>
            <S.AccountButton onClick={handleDeleteAccount}>
              회원 탈퇴
            </S.AccountButton>
          </S.AccountRow>
        </S.Container>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EditProfile;
