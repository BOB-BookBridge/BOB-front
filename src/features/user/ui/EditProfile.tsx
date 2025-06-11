import DefaultProfile from '@/shared/assets/default-profile.svg';
import EditNickname from './EditNickname';
import EditPassword from './EditPassword';
import * as S from './EditProfile.styles';
import EditArea from './EditArea';

const EditProfile = () => {
  // #todo: 기본값 처리
  return (
    <S.Container>
      <DefaultProfile width={100} />
      <EditNickname />
      <EditArea />
      <EditPassword />
    </S.Container>
  );
};

export default EditProfile;
