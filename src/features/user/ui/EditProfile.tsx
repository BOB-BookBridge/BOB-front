import DefaultProfile from '@/shared/assets/default-profile.svg';
import EditNickname from './EditNickname';

const EditProfile = () => {
  // #todo: 기본값 처리
  return (
    <div style={{ width: '100%', marginTop: 50 }}>
      <DefaultProfile width={100} />
      <EditNickname />
    </div>
  );
};

export default EditProfile;
