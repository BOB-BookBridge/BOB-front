import { useFailedChatStore } from '@/features/chat/model/useFailedChatStore';
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
  const { reset } = useFailedChatStore();

  function handleLogout() {
    logout();
    reset();
    sessionStorage.removeItem('my-tab-selected');
  }
  function handleDeleteAccount() {}
  return (
    <>
      {data ? (
        <S.Container>
          <DefaultProfile width={80} />
          <EditNickname defaultNickname={data.nickname} />
          <EditArea {...data.area} />
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

export default EditProfile;
