interface Props {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-calm-500 text-white rounded-br-sm'
            : 'bg-white border border-calm-200 text-calm-800 rounded-bl-sm'
        }`}
      >
        {content}
      </div>
    </div>
  )
}
