import { useState, KeyboardEvent } from 'react'

interface Props {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('')

  function submit() {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex items-end gap-2 pt-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type how you're feeling..."
        rows={1}
        className="flex-1 resize-none rounded-xl border border-calm-200 bg-white px-3 py-2 text-sm text-calm-800 focus:outline-none focus:ring-2 focus:ring-calm-400"
      />
      <button
        onClick={submit}
        disabled={disabled}
        className="rounded-xl bg-calm-500 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        Send
      </button>
    </div>
  )
}
