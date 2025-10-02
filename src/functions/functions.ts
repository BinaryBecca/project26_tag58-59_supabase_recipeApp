import type { IRecipe } from "../interfaces/IRecipe"
import supabase from "../utils/supabase"

export async function getRecipes(): Promise<IRecipe[]> {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("id, name, description, servings, instructions, category_id, image_url")
  if (error) {
    console.error(error)
  }
  console.log("recipes", recipes)
  return recipes as unknown as IRecipe[]
}
