import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { Category } from "../../types";
import "./NewCategory.scss"

interface Props {
  createCategory(newCategory: Category): void
}

const NewCategory: FC<Props> = ({ createCategory }) => {
  const [categoryName, setCategoryName] = useState<string>("")

  const clearInput = () => {
    setCategoryName("")
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let newCategory: Category = {
        id: 0,
        name: categoryName
      }
      clearInput()
      createCategory(newCategory)
    }

    if (e.key === "Escape") {
      clearInput()
    }
  }

  return (
    <div className="new-category">
      <input type="text" placeholder={"New category"} value={categoryName} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  )
}

export default NewCategory