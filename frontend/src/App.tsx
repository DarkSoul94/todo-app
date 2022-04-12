import { useEffect, useState } from 'react';
import './App.scss';
import NewTask from './components/NewTask/NewTask';
import TaskItem from './components/Task/TaskItem';
import { Task } from './types';

const Tasks: Array<Task> = [
  { id: 1, text: "Get a new helmet", category: "Uncategorized", checked: true },
  { id: 2, text: "Purchase Milk & Corn Flakes", category: "Groceries", checked: false },
]

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [category, setCategory] = useState<string>("Uncategorized")

  useEffect(() => {
    setTasks(Tasks)
  }, [])

  const check = (taskID: number, checkState: boolean) => {
    setTasks(prev => {
      prev.forEach(task => {
        if (task.id === taskID) {
          task.checked = checkState
        }
      });
      return prev
    })
  }

  const deleteTask = (taskID: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskID))
  }

  const taskList = tasks.map(task => (
    <TaskItem key={task.id} id={task.id} text={task.text} category={task.category} checked={task.checked} onCheck={check} onDelete={deleteTask} />
  ))

  const crateTask = (newTask: Task) => {
    newTask.id = tasks.length + 1
    setTasks(prev => [...prev, newTask])
  }

  return (
    <div className="wrapper">
      <div className="category-list">
        <div className="category-item">
          <span>All</span>
        </div>
        <div className="category-item">
          <span>Groceries</span>
        </div>
        <div className="category-item">
          <span>College</span>
        </div>
      </div>
      <div className="content">
        <h1>All Tasks</h1>
        <NewTask taskCategory={category} createTask={crateTask} />
        <div className="task-list">
          {taskList}
        </div>
      </div>
    </div>
  );
}

export default App;
