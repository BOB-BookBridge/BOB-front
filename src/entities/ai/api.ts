import axios from 'axios';
import { AIChatReq, AIChatRes } from '.';

export const sendChatToAI = async ({
  messages,
}: {
  messages: AIChatReq[];
}): Promise<AIChatRes> => {
  const { data } = await axios.post('/api/ai', { messages });
  return data;
};
