import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [habits, setHabits] = useState<string[]>([]);

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

const getCurrentWeekDates = (): string[] => {
  const today = new Date();
  const weekDates: string[] = [];

  // 日本語の曜日
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekday = weekdays[date.getDay()];

    weekDates.push(`${month}/${day}（${weekday}）`);
  }

  return weekDates;
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
  const weekDates = getCurrentWeekDates();
  const todayStr = weekDates[0]; // 今日のセルにハイライトつけるなら

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
              {weekDates.map((dateStr) => (
                <th
                  key={dateStr}
                  className={dateStr === weekDates[0] ? 'highlight' : ''}
                >
                  {dateStr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => (
              <tr key={habit}>
                <td>{habit}</td>
                {weekDates.map(dateStr => (
                  <td key={`${habit}-${dateStr}`}>
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
