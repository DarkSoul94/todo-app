import { FC, useState } from "react";
import "./TaskItem.scss"

interface Props {
  id: number
  text: string
  category: string
  checked: boolean
  onCheck(taskID: number, checkState: boolean): void
  onDelete(taskID: number): void
}

const TaskItem: FC<Props> = ({ id, text, category, checked, onCheck, onDelete }) => {
  const [checkboxState, setCheckboxState] = useState<boolean>(checked)

  const changeChecked = () => {
    onCheck(id, !checkboxState)
    setCheckboxState(prev => !prev)
  }

  const onClickDelete = () => {
    onDelete(id)
  }

  return (
    <div className="task-item">
      <div className="checkbox" onClick={changeChecked}>
        {
          checkboxState ?
            <img src="/img/checked.svg" alt="checked" width={28} height={28} /> :
            <img src="/img/unchecked.svg" alt="unchecked" width={28} height={28} />
        }
      </div>
      <p>{text}</p>
      <div className='item-category'>{category}</div>
      <img className='delete' src="/img/delete.png" alt="delete" width={14} height={16} onClick={onClickDelete} />
    </div >
  )
}

export default TaskItem;