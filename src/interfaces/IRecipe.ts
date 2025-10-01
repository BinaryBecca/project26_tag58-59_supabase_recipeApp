import type { ICategory } from "./ICategory"

export interface IRecipe {
  id: number
  name: string
  description: string
  servings: number
  instructions: string
  category_id: number
  categories: ICategory[]
}
