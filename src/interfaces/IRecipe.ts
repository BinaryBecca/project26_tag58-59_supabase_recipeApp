import type { ICategory } from "./ICategory"

export interface IRecipe {
  id: string
  name: string
  description: string
  servings: number
  instructions: string
  category_id: string
  categories: ICategory[]
  image_url?: string
  user_id?: string
}
