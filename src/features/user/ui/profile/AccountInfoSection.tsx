import { useFailedChatStore } from '@/features/chat/model/useFailedChatStore';
import { useLogoutMutation } from '@/entities/auth/queries';
import { useDeleteUserMutation, UserProfileReq } from '@/entities/user';
import EditPassword from './EditPassword';
import * as S from '../Profile.styles';
import { useRouter } from 'next/navigation';

type AccountInfoProps = Pick<UserProfileReq, 'isSocial' | 'email'>;

const AccountInfoSection = ({ isSocial, email }: AccountInfoProps) => {
  const { mutate: logout } = useLogoutMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();
  const { reset } = useFailedChatStore();
  const router = useRouter();

  function handleLogout() {
    logout();
    reset();
    sessionStorage.removeItem('my-tab-selected');
  }

  function handleDeleteAccount() {
    const ok = window.confirm('정말 탈퇴하시겠습니까?');
    if (ok) {
      reset();
      sessionStorage.removeItem('my-tab-selected');
      deleteUser(undefined, { onSuccess: () => router.push('/') });
    }
  }

  return (
    <div>
      <S.SectionContainer>
        <div style={{ fontWeight: 600, marginBottom: 10 }}>기본 정보</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <S.AccountTitleText>이메일</S.AccountTitleText>
          <S.AccountText $isGray={true}>{email}</S.AccountText>
        </div>
        {!isSocial && <EditPassword />}
      </S.SectionContainer>
      <S.Actions style={{ gap: 10 }}>
        <S.AccountText $isButton={true} onClick={handleLogout}>
          {`로그아웃 >`}
        </S.AccountText>
        <S.AccountText $isButton={true} onClick={handleDeleteAccount}>
          {`탈퇴하기 >`}
        </S.AccountText>
        <S.Footer />
      </S.Actions>
    </div>
  );
};

export default AccountInfoSection;
