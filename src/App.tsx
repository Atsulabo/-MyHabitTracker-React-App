import { useState } from 'react'
import './App.css'

function App() {
  //入力したのをフォームに反映する
  const [input, setInput] = useState('');
  //習慣リストに入力→登録申請されたのを反映する
  const [habits, setHabits] = useState<string[]>([]);

  const addHabit=()=>{
    if (input.trim()){
      setHabits([...habits, input]);
      setInput('');
    }
  };

  return (
      <div className="skin">
        <header>
          <h1>Grind Journal</h1>
          <h2>"Consistency creates success.”</h2>
        </header>
        <form
          className="input-line"
          onSubmit={(e)=>{
            e.preventDefault();
            addHabit();
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="習慣づけたい習慣を入力"
          />
          <button onClick={addHabit}>add</button>
        </form>
        {habits.length === 0 ? (
          <p className="empty-message">No habits yet. Start building your routine today!</p>
        ) : (
          <>
            {habits.map((habit, index)=>(
              <div key={index} className="habit-line">
                {habit}
              </div>
          ))}
          </>
        )}
      </div>
  );
}

export default App
