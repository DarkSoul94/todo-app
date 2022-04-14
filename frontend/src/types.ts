export type Category = {
  id: number
  name: string
}

export type Task = {
  id: number
  text: string
  category: Category
  checked: boolean
}