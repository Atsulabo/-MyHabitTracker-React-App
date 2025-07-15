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
  //過去の7日間の日付リストを取得
  const getFutureDates = (numDays:number):string[] => {
    const today = new Date();
    const dates = [];
    for(let i = 0; i < numDays; i++){
      const d = new Date();
      d.setDate(today.getDate()+i);
      dates.push(d.toLocaleDateString('Ja-JP', {month: '2-digit', day: '2-digit'}));
    }
    return dates;
  };
  //チェック状態管理
  type HabitRecord = {
    [habit: string]: {
      [date: string]: boolean;
    };
  };

  //習慣
  const [record,setRecords] = useState<HabitRecord>({});
  const dates =getFutureDates(7);

  //トグルチェック
  const toggleCheck = (habit: string, date: string) => {
  setRecords(prev => ({
    ...prev,
    [habit]: {
      ...prev[habit],
      [date]: !prev[habit]?.[date],
    },
  }));
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
            <table className="habit-table">
              <thead>
                <tr>
                  <th>Habit</th>
                  {dates.map(date => (
                    <th key={date}>{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {habits.map(habit => (
                  <tr key={habit}>
                    <td>{habit}</td>
                    {dates.map(date => (
                      <td key={`${habit}-${date}`}>
                        <input
                          type="checkbox"
                          checked={record[habit]?.[date] || false}
                          onChange={() => toggleCheck(habit, date)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
  );
}

export default App
