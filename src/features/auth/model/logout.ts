import { useFailedChatStore } from '@/features/chat/model/useFailedChatStore';
import { useLogoutMutation } from '@/entities/auth/queries';
import { useFilterStore } from '@/features/listing/model';

export function useLogout() {
  const { mutate: logoutMutation } = useLogoutMutation();
  const { reset } = useFailedChatStore();
  const { setEmdId } = useFilterStore();

  function logout() {
    logoutMutation();
    reset();
    sessionStorage.clear();
    setEmdId(undefined);
  }
  return { logout };
}
