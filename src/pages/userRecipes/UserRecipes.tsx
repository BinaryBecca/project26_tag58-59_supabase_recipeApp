import { useContext, useEffect, useState } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import type { IRecipe } from "../../interfaces/IRecipe"
import supabase from "../../utils/supabase"
import type { IIngredient } from "../../interfaces/IIngredient"
import UserRecipeList from "../../components/userRecipeList/UserRecipeList"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldWrapper from "../../components/formFieldWrapper/FormFieldWrapper"

interface UserRecipesProps {
  user: IUser
  // setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function UserRecipes() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  // setUser
  const { user } = useContext(mainContext) as UserRecipesProps

  const [userRecipes, setUserRecipes] = useState<IRecipe[]>([])
  const [userIngredients, setUserIngredients] = useState<IIngredient[]>([])

  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

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

  // #edit recipe user
  const handleEditing = (recipe: IRecipe) => {
    setSelectedRecipe(recipe)
    setIsEditing(true)
  }

  return (
    <>
      <h2
        className={`text-center font-quicksand font-bold text-4xl pt-5 pb-6 ${
          isDarkMode ? "text-gray-700" : "text-white/80"
        }`}>
        Erstellte Rezepte
      </h2>
      <UserRecipeList />

      {isEditing && selectedRecipe && (
        <FormFieldWrapper title="Rezept bearbeiten">
          <form>
            <ul className="flex flex-row flex-wrap gap-4">
              {userRecipes.map((recipe) => (
                <li key={recipe.id} className="border p-4 rounded-xl">
                  <img className="h-50" src={recipe.image_url} alt={recipe.name} />
                  <h4 className="text-xl font-semibold">{recipe.name}</h4>
                  <p>{recipe.description}</p>
                  <p>{recipe.servings}</p>
                  <p>{recipe.instructions}</p>
                </li>
              ))}
            </ul>
          </form>
        </FormFieldWrapper>
      )}
    </>
  )
}
