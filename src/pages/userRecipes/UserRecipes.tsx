import { useContext, useEffect, useState } from "react"
import FormFieldWrapper from "../../components/formFieldWrapper/FormFieldWrapper"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import type { IRecipe } from "../../interfaces/IRecipe"
import supabase from "../../utils/supabase"
import type { IIngredient } from "../../interfaces/IIngredient"
import CupcakeCard from "../../components/cupcakeCard/CupcakeCard"
import CupcakeList from "../../components/cupcakeList/CupcakeList"
import UserRecipeList from "../../components/userRecipeList/UserRecipeList"

interface UserRecipesProps {
  user: IUser
  // setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function UserRecipes() {
  // const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  // setUser
  const { user } = useContext(mainContext) as UserRecipesProps

  const [userRecipes, setUserRecipes] = useState<IRecipe[]>([])
  const [userIngredients, setUserIngredients] = useState<IIngredient[]>([])

  //# fetch recipes from user to edit
  const fetchUserRecipes = async () => {
    if (user) {
      const { data, error } = await supabase.from("recipes").select("*").eq("user_id", user.id)
      if (error) {
        console.error("Fehler beim Fetchen der Rezepte", error)
      } else {
        setUserRecipes(data || [])
      }
    }
  }

  //# fetch ingredients from user to edit
  const fetchUserIngredients = async () => {
    if (user) {
      const { data, error } = await supabase.from("ingredients").select("*").eq("user_id", user.id)
      if (error) {
        console.error("Fehler beim Fetchen der Zutaten", error)
      } else {
        setUserIngredients(data || [])
      }
    }
  }

  useEffect(() => {
    fetchUserRecipes()
    fetchUserIngredients()
  }, [])

  return (
    <>
      <FormFieldWrapper title="Erstellte Rezepte">
        <UserRecipeList />
      </FormFieldWrapper>

      {/* <ul className="flex flex-row flex-wrap gap-4">
          {userRecipes.map((recipe) => (
            <li key={recipe.id} className="border p-4 rounded-xl">
              <img className="h-50" src={recipe.image_url} alt={recipe.name} />
              <h4 className="text-xl font-semibold">{recipe.name}</h4>
              <p>{recipe.description}</p>
              <p>{recipe.servings}</p>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul> */}
    </>
  )
}
