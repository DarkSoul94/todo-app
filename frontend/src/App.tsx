import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategoryList } from './api/category';
import { createTask, deleteTask, getTaskList, updateTask } from './api/task';
import './App.scss';
import CategoryItem from './components/Category/CategoryItem';
import NewCategory from './components/NewCategory/NewCategory';
import NewTask from './components/NewTask/NewTask';
import TaskItem from './components/Task/TaskItem';
import { Category, Task } from './types';

const DefaultCategory: Category = { id: 0, name: "All" }

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [categoryes, setCategoryes] = useState<Array<Category>>([DefaultCategory])
  const [category, setCategory] = useState<Category>(DefaultCategory)

  useEffect(() => {
    getCategoryList().then(res => res.data)
      .then(data => {
        setCategoryes(prev => [...prev, ...data.categoryList]);
      })

    getTaskList().then(res => res.data)
      .then(data => {
        setTasks(data.taskList)
      })
  }, [])

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

  const createTaskHandle = (newTask: Task) => {
    createTask(newTask).then(res => res.data)
      .then(data => { newTask.id = data.id })
    setTasks(prev => [...prev, newTask])
  }

  const checkTaskHandle = (taskID: number, checkState: boolean) => {
    updateTask(taskID, checkState).then(() => {
      setTasks(prev => {
        prev.forEach(task => {
          if (task.id === taskID) {
            task.checked = checkState
          }
        });
        return prev
      })
    })
  }

  const deleteTaskHandle = (taskID: number) => {
    deleteTask(taskID).then(() => {
      setTasks(prev => prev.filter(task => task.id !== taskID))
    })
  }

  let renderedList;
  if (category.id) {
    renderedList = tasks.filter(task => task.category.id === category.id).map(task => (
      <TaskItem key={task.id} id={task.id} text={task.text} category={task.category.name} checked={task.checked} onCheck={checkTaskHandle} onDelete={deleteTaskHandle} />
    ))
  } else {
    renderedList = tasks.map(task => (
      <TaskItem key={task.id} id={task.id} text={task.text} category={task.category.id ? task.category.name : "Uncategorized"} checked={task.checked} onCheck={checkTaskHandle} onDelete={deleteTaskHandle} />
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
        <NewTask taskCategory={category} createTask={createTaskHandle} />
        <div className="task-list">
          {renderedList}
        </div>
      </div>
    </div>
  );
}

export default App;
