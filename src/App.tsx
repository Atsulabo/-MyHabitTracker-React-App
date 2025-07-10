import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="skin">
        <header>
          <h1>Grind Journal</h1>
          <h2>"Consistency creates success.”</h2>
        </header>
        <form
          className="input-line"
        >
          <input
            type="text"
            value=""
            placeholder="タスクを入力"
          />
          <button>add</button>
        </form>
        <p className="empty-message">No habits yet. Start building your routine today!</p>
      </div>
  )
}

export default App
