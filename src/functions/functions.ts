import type { ICategory } from "../interfaces/ICategory"
import type { IIngredient } from "../interfaces/IIngredient"
import type { IRecipe } from "../interfaces/IRecipe"
import supabase from "../utils/supabase"

export async function getRecipes(): Promise<IRecipe[]> {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("id, name, description, servings, instructions, category_id, image_url")
  if (error) {
    console.error(error)
  }
  // console.log("recipes", recipes)
  return recipes as unknown as IRecipe[]
}

export async function getIngredients(): Promise<IIngredient[]> {
  const { data: ingredients, error } = await supabase
    .from("ingredients")
    .select("id, recipe_id, name, quantity, unit, additional_info")
  if (error) {
    console.error(error)
  }
  console.log("ingredients", ingredients)
  return ingredients as unknown as IIngredient[]
}

export async function getCategories(): Promise<ICategory[]> {
  const { data: categories, error } = await supabase.from("categories").select("id, name")
  if (error) {
    console.error(error)
  }
  console.log("categories", categories)
  return categories as unknown as ICategory[]
}
