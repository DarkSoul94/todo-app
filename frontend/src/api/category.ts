import { $host } from "."
import { Category } from "../types"

export type getCategoryListResponce = {
  status: string
  categoryList: Array<Category>
}
export const getCategoryList = () => {
  return $host.get<getCategoryListResponce>("/category")
}

export const createCategory = (cat: Category) => {
  return $host.post("/category", cat)
}