import DefaultProfile from '@/shared/assets/default-profile.svg';
import EditNickname from './EditNickname';
import EditPassword from './EditPassword';
import * as S from './EditProfile.styles';
import EditArea from './EditArea';

const EditProfile = () => {
  // #todo: 기본값 처리
  function handleLogout() {}
  function handleDeleteAccount() {}
  return (
    <S.Container>
      <DefaultProfile width={80} />
      <EditNickname />
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
  );
};

export default EditProfile;
