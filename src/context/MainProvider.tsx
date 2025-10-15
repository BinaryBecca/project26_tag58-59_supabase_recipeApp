/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react"
import type { IRecipe } from "../interfaces/IRecipe"
import { getCategories, getIngredients, getRecipes } from "../functions/functions"
import type { IIngredient } from "../interfaces/IIngredient"
import type { ICategory } from "../interfaces/ICategory"
import type { IUser } from "../interfaces/IUser"
import supabase from "../utils/supabase"

export interface mainContextProps {
  recipes: IRecipe[]
  ingredients: IIngredient[]
  categories: ICategory[]
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const mainContext = createContext<mainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [ingredients, setIngredients] = useState<IIngredient[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<IUser | null>(null)

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

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getSession()
      const session = data?.session

      if (session?.user) {
        setUser(session?.user as unknown as IUser)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
      setLoading(false)
    }
    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as unknown as IUser) || null)
      setIsLoggedIn(!!session?.user)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <mainContext.Provider
      value={{ recipes, ingredients, categories, isLoggedIn, setIsLoggedIn, loading, user, setUser }}>
      {children}
    </mainContext.Provider>
  )
}
