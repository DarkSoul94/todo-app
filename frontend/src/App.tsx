import { useEffect, useState } from 'react';
import './App.scss';
import NewCategory from './components/NewCategory/NewCategory';
import NewTask from './components/NewTask/NewTask';
import TaskItem from './components/Task/TaskItem';
import { Category, Task } from './types';

const Categories: Array<Category> = [
  { id: 0, name: "All" },
  { id: 1, name: "Groceries" },
  { id: 2, name: "College" },
]

const Tasks: Array<Task> = [
  { id: 1, text: "Get a new helmet", category: { id: 0, name: "All" }, checked: true },
  { id: 2, text: "Purchase Milk & Corn Flakes", category: { id: 1, name: "Groceries" }, checked: false },
]

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [categoryes, setCategoryes] = useState<Array<Category>>([])
  const [category, setCategory] = useState<Category>({ id: 0, name: "All" })

  useEffect(() => {
    setCategoryes(Categories);
    setTasks(Tasks);
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

  const createCategory = (newCategory: Category) => {
    newCategory.id = categoryes.length + 1;
    setCategoryes(prev => [...prev, newCategory])
  }

  const categoryList = categoryes.map(cat => (
    <div className="category-item" key={cat.id}>
      <span onClick={() => setCategory(cat)} >{cat.name}</span>
    </div>
  ))

  const crateTask = (newTask: Task) => {
    newTask.id = tasks.length + 1;
    console.log(newTask)
    setTasks(prev => [...prev, newTask])
  }

  const deleteTask = (taskID: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskID))
  }

  let renderedList;
  if (category.id) {
    renderedList = tasks.filter(task => task.category.id === category.id).map(task => (
      <TaskItem key={task.id} id={task.id} text={task.text} category={task.category.name} checked={task.checked} onCheck={check} onDelete={deleteTask} />
    ))
  } else {
    renderedList = tasks.map(task => (
      <TaskItem key={task.id} id={task.id} text={task.text} category={task.category.id ? task.category.name : "Uncategorized"} checked={task.checked} onCheck={check} onDelete={deleteTask} />
    ))
  }

  return (
    <div className="wrapper">
      <header>
        <NewCategory createCategory={createCategory} />
        <div className="category-list">
          {categoryList}
        </div>
      </header>

      <div className="content">
        <h1>{category.name} Tasks</h1>
        <NewTask taskCategory={category} createTask={crateTask} />
        <div className="task-list">
          {renderedList}
        </div>
      </div>
    </div>
  );
}

export default App;
