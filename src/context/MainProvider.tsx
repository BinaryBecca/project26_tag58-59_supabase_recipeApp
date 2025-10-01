import { createContext, useEffect, useState } from "react"
import type { IRecipe } from "../interfaces/IRecipe"
import { getRecipes } from "../functions/functions"

export interface mainContextProps {
  recipes: IRecipe[]
}

export const mainContext = createContext<mainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])

  useEffect(() => {
    const getData = async () => {
      const showing_recipe = await getRecipes()
      setRecipes(showing_recipe)
    }
    getData()
  }, [])

  return <mainContext.Provider value={{ recipes }}>{children}</mainContext.Provider>
}
