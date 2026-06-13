export interface AIChatReq {
  role: ChatRole;
  content: string;
}

export interface AIChatRes {
  reply: string;
}

export type ChatRole = 'user' | 'assistant';
