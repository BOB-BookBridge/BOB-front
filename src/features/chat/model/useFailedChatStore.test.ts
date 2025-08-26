import { DetailImage } from '@/entities/listing';
import { useFailedChatStore } from './useFailedChatStore';

describe('sendMessage 실패 흐름 테스트', () => {
  beforeEach(() => {
    localStorage.clear();
    useFailedChatStore.getState().reset();
    localStorage.clear();
  });

  it('sendMessage 실패 시 실패 메시지가 store와 localStorage에 저장된다', () => {
    const mockFailedChat = {
      clientId: 'test-id',
      content: '실패 메시지',
      type: 'TEXT',
      isMine: true,
      isLoading: false,
      isError: true,
      images: [] as DetailImage[],
      isRead: false,
      sentAt: String(new Date()),
    } as const;

    useFailedChatStore.getState().addFailedChat(2, mockFailedChat);

    const stored = JSON.parse(
      localStorage.getItem('failed-chat-storage') || '{}',
    );

    expect(stored.state.failedChats[2].length).toBe(1);
    expect(stored.state.failedChats[2][0].content).toBe('실패 메시지');
    expect(stored.state.failedChats[2][0].clientId).toBe('test-id');
  });

  it('재전송 시 실패 메시지가 store와 localStorage에서 삭제된다', () => {
    const clientId = 'to-be-deleted';
    const failChat = {
      clientId,
      content: '삭제될 메시지',
      type: 'TEXT',
      isMine: true,
      isLoading: false,
      isError: true,
      images: [] as DetailImage[],
      isRead: false,
      sentAt: String(new Date()),
    } as const;

    useFailedChatStore.getState().addFailedChat(1, failChat);
    useFailedChatStore.getState().deleteFailedChat(1, clientId);

    const stored = JSON.parse(
      localStorage.getItem('failed-chat-storage') || '{}',
    );

    expect(stored.state.failedChats[1].length).toBe(0);
  });
});
