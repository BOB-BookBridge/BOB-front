interface Sender {
  id: string;
  nickname: string;
  profile: string | null;
}
export interface Notification {
  type: 'CHAT' | 'TRADE';
  refId: number;
  body: string;
  sender: Sender | null;
  sentAt: string;
}

export const connectNoti = (
  onNoti: (data: Notification) => void,
  onError: (error: Event) => void,
) => {
  const es = new EventSource(
    `${process.env.NEXT_PUBLIC_API_URL}notifications/subscribe`,
    { withCredentials: true },
  );

  es.addEventListener('NOTIFICATION', (e: MessageEvent) => {
    try {
      const data = JSON.parse(e.data);
      onNoti(data);
    } catch (err) {
      console.error('파싱 실패', e.data);
    }
  });

  es.onerror = (e) => {
    onError(e);
    es.close();
  };
  return es;
};
