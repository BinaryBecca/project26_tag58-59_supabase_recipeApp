/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react"
import type { IRecipe } from "../interfaces/IRecipe"
import { getCategories, getIngredients, getRecipes } from "../functions/functions"
import type { IIngredient } from "../interfaces/IIngredient"
import type { ICategory } from "../interfaces/ICategory"

export interface mainContextProps {
  recipes: IRecipe[]
  ingredients: IIngredient[]
  categories: ICategory[]
}

export const mainContext = createContext<mainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [ingredients, setIngredients] = useState<IIngredient[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    const getData = async () => {
      const showing_recipe = await getRecipes()
      const showing_ingredient = await getIngredients()
      const showing_category = await getCategories()

      setRecipes(showing_recipe)
      setIngredients(showing_ingredient)
      setCategories(showing_category)
    }
    getData()
  }, [])

  return <mainContext.Provider value={{ recipes, ingredients, categories }}>{children}</mainContext.Provider>
}
