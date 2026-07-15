import { useState, useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import { createSession, sendMessage, Message } from '../api/client'

export default function ChatWindow() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    createSession().then(setSessionId).catch(() => setSessionId(null))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(text: string) {
    if (!sessionId) return
    const next = [...messages, { role: 'user' as const, content: text }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await sendMessage(sessionId, text, messages)
      setMessages([...next, { role: 'assistant', content: res.reply }])
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col px-4 pb-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 && (
          <p className="text-center text-calm-400 text-sm mt-8">
            Whenever you're ready, share what's on your mind.
          </p>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <MessageBubble role="assistant" content="..." />}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={loading || !sessionId} />
    </div>
  )
}
