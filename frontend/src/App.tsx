import { useEffect, useState } from 'react';
import './App.scss';
import TaskItem from './components/Task/TaskItem';

type Task = {
  id: number
  text: string
  category: string
  checked: boolean
}

const Tasks: Array<Task> = [
  { id: 1, text: "Get a new helmet", category: "Uncategorized", checked: true },
  { id: 2, text: "Purchase Milk & Corn Flakes", category: "Groceries", checked: false },
]

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([])

  useEffect(() => {
    setTasks(Tasks)
  }, [])

  const check = (taskID: number, checkState: boolean) => {
    setTasks(prev => {
      prev.forEach(task => {
        if (task.id === taskID) {
          task.checked = !task.checked
        }
      });
      return prev
    })
  }

  const deleteTask = () => { console.log("delete") }

  const taskList = tasks.map(task => (
    <TaskItem key={task.id} id={task.id} text={task.text} category={task.category} checked={task.checked} onCheck={check} onDelete={deleteTask} />
  ))

  return (
    <div className="wrapper">
      <div className="category-list">
        <div className="category-item">
          All
        </div>
        <div className="category-item">
          Groceries
        </div>
        <div className="category-item">
          College
        </div>
      </div>
      <div className="content">
        <h1>All Tasks</h1>
        <div className="new-task">
          <input type="text" placeholder='Add a new task insdie ‘All’ category' />
        </div>
        <div className="task-list">
          {taskList}
        </div>
      </div>
    </div>
  );
}

export default App;
