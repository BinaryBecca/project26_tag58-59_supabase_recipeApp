import type { IRecipe } from "./IRecipe"

export interface IIngredient {
  id: number
  recipe_id: number
  name: string
  quantity: number
  unit: string
  additional_info?: string
  recipes: IRecipe[]
}
