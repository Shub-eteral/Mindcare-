import ChatWindow from './components/ChatWindow'
import Disclaimer from './components/Disclaimer'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-calm-50">
      <div className="w-full max-w-2xl flex flex-col h-screen">
        <header className="py-6 text-center">
          <h1 className="text-2xl font-serif text-calm-800">MindCare AI</h1>
          <p className="text-sm text-calm-500">A space to think, not a diagnosis.</p>
        </header>
        <Disclaimer />
        <ChatWindow />
      </div>
    </div>
  )
}

export default App
