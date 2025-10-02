import type { IRecipe } from "./IRecipe"

export interface IIngredient {
  id: string
  recipe_id: string
  name: string
  quantity: number
  unit: string
  additional_info?: string
  recipes: IRecipe[]
}
