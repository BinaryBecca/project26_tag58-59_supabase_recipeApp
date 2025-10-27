import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import { Link, useNavigate } from "react-router"
import supabase from "../../utils/supabase"

interface UserRecipeCardProps {
  recipe: IRecipe
}

export default function UserRecipeCard({ recipe }: UserRecipeCardProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!window.confirm("Möchtest du dieses Rezept wirklich löschen?")) return

    try {
      // Zutaten löschen
      const { error: ingredientError } = await supabase.from("ingredients").delete().eq("recipe_id", recipe.id)

      if (ingredientError) {
        console.error("Fehler beim Löschen der Zutaten:", ingredientError)
        return
      }

      // Rezept löschen
      const { error: recipeError } = await supabase.from("recipes").delete().eq("id", recipe.id)

      if (recipeError) {
        console.error("Fehler beim Löschen des Rezepts:", recipeError)
        return
      }

      alert("Rezept erfolgreich gelöscht.")
      navigate("/user_recipes") // Weiterleitung
    } catch (error) {
      console.error("Unerwarteter Fehler beim Löschen:", error)
    }
  }

  return (
    <>
      <div className="grid grid-rows-2 m-10 w-100">
        <div className="relative border rounded-t-full overflow-hidden border-gray-300">
          <img
            className="relative w-full h-60 object-cover z-10"
            src={recipe.image_url}
            alt={recipe.name}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = "/img/placeholder-img.png"
            }}
          />
        </div>

        {/* adding clip-path & box-shadow in css  */}
        <div className="relative flex flex-col justify-between items-center py-10 px-4 border border-gray-300 bg-white">
          {/* pointer-events-none = click/hover-effects are not effected by overlay! */}
          <div
            className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${
              isDarkMode ? "bg-pastelyellow/5" : "bg-pastelyellow"
            }`}></div>

          <h2 className="font-bold text-2xl z-10">{recipe.name}</h2>
          <p className="text-xl text-center z-10">{recipe.description}</p>
          <div className="flex flex-row justify-evenly gap-2">
            <Link
              to={`/editing_recipes/${recipe.id}`}
              className={`z-20 p-2 mb-4 border border-white/80 rounded-4xl text-md sm:text-l cursor-pointer ${
                isDarkMode ? "bg-pastelpink text-black" : "bg-white text-pastelpink"
              }`}>
              Bearbeiten
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="p-2 mb-4 border border-red-500 text-red-500 rounded-4xl text-md sm:text-l cursor-pointer hover:bg-red-500 hover:text-white transition">
              Löschen
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
