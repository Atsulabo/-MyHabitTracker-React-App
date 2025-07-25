import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [habits, setHabits] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // チェック状態管理
  type HabitRecord = {
    [habit: string]: {
      [day: string]: boolean;
    };
  };

  const [record, setRecords] = useState<HabitRecord>({});

  const addHabit = () => {
    if (input.trim()) {
      setHabits([...habits, input]);
      setInput('');
    }
  };

  // 曜日を固定で並べる
const weekdays = ['月', '火', '水', '木', '金', '土', '日'];

// 今日の曜日インデックス（0:日〜6:土）
const today = new Date();
const todayIndex = (today.getDay() + 6) % 7; // 日曜始まりを月曜始まりに補正

// 月〜日順に日付を計算
const getWeekDates = (): string[] => {
  const base = new Date();
  const dates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    // 月曜を基準に各曜日を計算（今日の曜日からずらす）
    d.setDate(base.getDate() - todayIndex + i);

    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    dates.push(`${month}/${day} \n（${weekdays[i]}）`);
  }

  return dates;
};


  // 🔸 トグルチェック
  const toggleCheck = (habit: string, day: string) => {
    setRecords(prev => ({
      ...prev,
      [habit]: {
        ...prev[habit],
        [day]: !prev[habit]?.[day],
      },
    }));
  };
  const weekDates = getWeekDates();
  //副作用
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedRecords = localStorage.getItem('records');

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }

    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
    setLoaded(true); // ← 読み込み完了フラグを立てる
  }, []);

  //
  useEffect(() => {
    if(loaded){
      localStorage.setItem('habits', JSON.stringify(habits));
      localStorage.setItem('records', JSON.stringify(record));
    }
}, [habits,record,loaded]);


  return (
    <div className="skin">
      <header>
        <h1>Grind Journal</h1>
        <h2>"Consistency creates success.”</h2>
      </header>
      <form
        className="input-line"
        onSubmit={(e) => {
          e.preventDefault();
          addHabit();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="習慣づけたい習慣を入力"
        />
        <button onClick={addHabit}>add</button>
      </form>

      {habits.length === 0 ? (
        <p className="empty-message">No habits yet. Start building your routine today!</p>
      ) : (
        <table className="habit-table">
          <thead>
            <tr>
              <th>Habit</th>
              {weekDates.map((dateStr, i) => (
                <th
                  key={dateStr}
                  className={`habit-column${i === todayIndex ? ' highlight' : ''}`}
                >
                  {dateStr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => (
              <tr key={habit}>
                <td className="habit-column" title={habit}>{habit}</td>
                {weekDates.map((dateStr, i) => (
                  <td
                    key={`${habit}-${dateStr}`}
                    className={i === todayIndex ? 'highlight' : ''}
                  >
                    <input
                      type="checkbox"
                      checked={record[habit]?.[dateStr] || false}
                      onChange={() => toggleCheck(habit, dateStr)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
