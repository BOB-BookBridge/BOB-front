import { useFailedChatStore } from '@/features/chat/model/useFailedChatStore';
import { useLogoutMutation } from '@/entities/auth/queries';
import ProfileInfoSection from './ProfileInfoSection';
import { useMyQuery } from '@/entities/user';
import EditPassword from '../EditPassword';
import * as S from '../Profile.styles';

const MyInfo = () => {
  const { data } = useMyQuery();
  const { mutate: logout } = useLogoutMutation();
  const { reset } = useFailedChatStore();

  function handleLogout() {
    logout();
    reset();
    sessionStorage.removeItem('my-tab-selected');
  }
  function handleDeleteAccount() {}
  return (
    <>
      {' '}
      {data ? (
        <S.Container>
          <ProfileInfoSection
            nickname={data.nickname}
            area={data.area}
            profileImageUrl={data.profileImageUrl}
          />
          {!data.isSocial && <EditPassword />}
          <S.AccountRow>
            <div style={{ fontWeight: 600 }}>계정</div>
            <S.AccountText>이메일</S.AccountText>
            <S.AccountText $isGray={true}>
              &emsp;
              {data.email}
            </S.AccountText>
            <S.AccountText $isButton={true} onClick={handleLogout}>
              로그아웃
            </S.AccountText>
            <S.AccountText $isButton={true} onClick={handleDeleteAccount}>
              탈퇴하기
            </S.AccountText>
          </S.AccountRow>
        </S.Container>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default MyInfo;
