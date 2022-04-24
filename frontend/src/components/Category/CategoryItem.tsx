import { FC } from "react"
import { Category } from "../../types"

import "./CategoryItem.scss"

interface Props {
  category: Category
  setCategory(cat: Category): void
  deleteCategory(categoryID: number): void
}

const CategoryItem: FC<Props> = ({ category, setCategory, deleteCategory }) => {
  const onClickCategory = () => {
    setCategory(category)
  }

  const onClickDelete = () => {
    deleteCategory(category.id)
  }

  return (
    <div className="category-item">
      <span onClick={onClickCategory} >{category.name}</span>
      {category.id ? <img className='delete' src="/img/delete.png" alt="delete" width={14} height={16} onClick={onClickDelete} /> : null}
    </div>
  )
}

export default CategoryItem