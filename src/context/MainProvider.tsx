import { createContext, useState } from "react"
import type { IRecipe } from "../interfaces/IRecipe"

export interface mainContextProps {
  recipes: IRecipe[]
}

export const mainContext = createContext<mainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])

  return <mainContext.Provider value={{ recipes }}>{children}</mainContext.Provider>
}
