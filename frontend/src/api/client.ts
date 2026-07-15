const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResult {
  reply: string
  flagged: boolean
  resources?: Array<{ name: string; phone?: string; url?: string; notes?: string }>
}

export async function createSession(): Promise<string> {
  const res = await fetch(`${API_URL}/api/session`, { method: 'POST' })
  const data = await res.json()
  return data.session_id
}

export async function sendMessage(
  sessionId: string,
  message: string,
  history: Message[],
): Promise<ChatResult> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, message, history }),
  })
  if (!res.ok) throw new Error('Chat request failed')
  return res.json()
}
