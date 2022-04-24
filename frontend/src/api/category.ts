import { $host } from "."
import { Category } from "../types"

export type getCategoryListResponce = {
  status: string
  categoryList: Array<Category>
}
export const getCategoryList = () => {
  return $host.get<getCategoryListResponce>("/category")
}

export type createCategoryResponce = {
  status: string
  id: number
}

export const createCategory = (cat: Category) => {
  return $host.post<createCategoryResponce>("/category", cat)
}

export const deleteCategory = (categoryID: number) => {
  return $host.delete("/category/" + categoryID)
}