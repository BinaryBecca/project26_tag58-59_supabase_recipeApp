import { useContext, useEffect, useState } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import type { IRecipe } from "../../interfaces/IRecipe"
import supabase from "../../utils/supabase"
import type { IIngredient } from "../../interfaces/IIngredient"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldWrapper from "../../components/formFieldWrapper/FormFieldWrapper"

interface EditingUserRecipesProps {
  user: IUser
  // setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function UserRecipes() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  // setUser
  const { user } = useContext(mainContext) as EditingUserRecipesProps

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
      <section className="flex flex-col justify-between">
        <div
          className="relative bg-cover bg-center w-full px-20 py-30"
          style={{ backgroundImage: `url(${userRecipe.image_url || "/img/placeholder-img.png"})` }}>
          <p className="relative text-white/80 text-4xl sm:text-5xl z-20 text-center">{userRecipe.name}</p>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="py-8 px-5 sm:py-10 sm:px-10 md:px-15 lg:px-20 font-quicksand text-xl sm:text-2xl">
          <h1 className="text-3xl sm:text-6xl font-bold pb-2">{userRecipe.name}</h1>
          <h2 className="pb-8">{userRecipe.description}</h2>
          <h2 className="font-bold text-2xl sm:text-3xl pb-4">Zutaten</h2>
          <div className={`p-5 mb-4 ${isDarkMode ? "bg-pastelpink/40" : "bg-white/20"}`}>
            Für <span className="font-bold">{userRecipe.servings}</span> Portionen
          </div>
          <ul className="pb-8">
            {userIngredients.map((ingredient) => {
              return (
                <div key={ingredient.id}>
                  <li className="py-2.5 grid grid-cols-[8rem_1fr] gap-8">
                    <span className="text-right">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <span>
                      {ingredient.name}
                      {ingredient.additional_info && ","} {ingredient.additional_info}
                    </span>
                  </li>
                  <div className="border-b"></div>
                </div>
              )
            })}
          </ul>

          <h2 className="font-bold text-2xl sm:text-3xl pb-4">Zubereitung</h2>

          <ol className="list-decimal list-inside pb-8">
            {userRecipe.instructions
              // ! /\d+\.\s*/ zerlegt 1., 2., etc. in einzelne array-elemnte
              // \d 0-9
              // \. .
              // \s* Leerzeichen
              .split(/\d+\.\s*/)
              .filter((item) => item != "")
              .map((instruction, index) => {
                return (
                  <li className="pb-2" key={index}>
                    {instruction.trim()}
                  </li>
                )
              })}
          </ol>

          <h2 className="font-bold text-2xl sm:text-3xl pb-4">Kategorie</h2>
          <div
            className={`inline-block p-5 mb-10 sm:mb-20 rounded-4xl ${
              isDarkMode ? "bg-pastelpink/40" : "bg-white/20"
            }`}>
            <p key={userCategory.id}>{userCategory.name}</p>
          </div>
        </div>
      </section>

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

//# fetch recipes from user to edit
// const fetchUserRecipes = async () => {
//   if (user) {
//     const { data, error } = await supabase.from("recipes").select("*").eq("user_id", user.id)
//     if (error) {
//       console.error("Fehler beim Fetchen der Rezepte", error)
//     } else {
//       setUserRecipe(data || [])
//     }
//   }
// }

//# fetch ingredients from user to edit
// const fetchUserIngredients = async () => {
//   if (user) {
//     const { data, error } = await supabase.from("ingredients").select("*").eq("user_id", user.id)
//     if (error) {
//       console.error("Fehler beim Fetchen der Zutaten", error)
//     } else {
//       setUserIngredients(data || [])
//     }
//   }
// }

// useEffect(() => {
//   fetchUserRecipes()
//   fetchUserIngredients()
// }, [])
