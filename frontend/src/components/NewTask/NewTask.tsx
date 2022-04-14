import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { Category, Task } from "../../types";
import "./NewTask.scss"

interface Props {
  taskCategory: Category
  createTask(newTask: Task): void
}

const NewTask: FC<Props> = ({ taskCategory, createTask }) => {
  const [taskText, setTaskText] = useState<string>("")

  const clearInput = () => {
    setTaskText("")
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let newTask: Task = {
        id: 0,
        text: taskText,
        category: taskCategory,
        checked: false
      }
      clearInput()
      createTask(newTask)
    }

    if (e.key === "Escape") {
      clearInput()
    }
  }

  return (
    <div className="new-task">
      <input type="text" placeholder={taskCategory.id ? "New task insdie ‘" + taskCategory.name + "’ category" : "New task insdie ‘Uncategorized’ category"} value={taskText} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  )
}

export default NewTask