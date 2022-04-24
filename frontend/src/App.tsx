import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategoryList } from './api/category';
import './App.scss';
import CategoryItem from './components/Category/CategoryItem';
import NewCategory from './components/NewCategory/NewCategory';
import NewTask from './components/NewTask/NewTask';
import TaskItem from './components/Task/TaskItem';
import { Category, Task } from './types';

const DefaultCategory: Category = { id: 0, name: "All" }

const Tasks: Array<Task> = [
  { id: 1, text: "Get a new helmet", category: { id: 0, name: "All" }, checked: true },
  { id: 2, text: "Purchase Milk & Corn Flakes", category: { id: 1, name: "Groceries" }, checked: false },
]

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [categoryes, setCategoryes] = useState<Array<Category>>([DefaultCategory])
  const [category, setCategory] = useState<Category>(DefaultCategory)

  useEffect(() => {
    getCategoryList().then(res => res.data)
      .then((data) => {
        setCategoryes(prev => [...prev, ...data.categoryList]);
      })

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

  const createCategoryHandle = (newCategory: Category) => {
    createCategory(newCategory).then(res => res.data)
      .then(data => {
        newCategory.id = data.id
        setCategoryes(prev => [...prev, newCategory])
      })
  }

  const deleteCategoryHandle = (categoryID: number) => {
    deleteCategory(categoryID).then(() => {
      setCategoryes(prev => prev.filter(cat => cat.id !== categoryID))
    })
  }

  const categoryList = categoryes.map(cat => (
    <CategoryItem key={cat.id} category={cat} setCategory={setCategory} deleteCategory={deleteCategoryHandle} />
  ))

  const crateTask = (newTask: Task) => {
    newTask.id = tasks.length + 1;
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
        <NewCategory createCategory={createCategoryHandle} />
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
