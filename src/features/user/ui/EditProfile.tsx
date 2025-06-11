import DefaultProfile from '@/shared/assets/default-profile.svg';
import EditNickname from './EditNickname';
import EditArea from './EditArea';

const EditProfile = () => {
  // #todo: 기본값 처리
  return (
    <div style={{ width: '100%', marginTop: 50, padding: 10 }}>
      <DefaultProfile width={100} />
      <EditNickname />
      <EditArea />
    </div>
  );
};

export default EditProfile;
