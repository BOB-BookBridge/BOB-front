export interface AIChatReq {
  role: ChatRole;
  content: string;
}

export interface AIChatRes {
  reply: string;
  error: boolean;
}

export type ChatRole = 'user' | 'assistant';
