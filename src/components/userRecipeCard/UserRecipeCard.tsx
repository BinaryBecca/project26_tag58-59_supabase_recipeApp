import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import { Link } from "react-router"

interface UserRecipeCardProps {
  recipe: IRecipe
}

export default function UserRecipeCard({ recipe }: UserRecipeCardProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

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
          <div
            className={`absolute inset-0 w-full h-full z-0 ${
              isDarkMode ? "bg-pastelyellow/5" : "bg-pastelyellow"
            }`}></div>

          <h2 className="font-bold text-2xl z-10">{recipe.name}</h2>
          <p className="text-xl text-center z-10">{recipe.description}</p>
          <Link
            to="/editing_recipes"
            className={`z-20 p-2 mb-4 border border-white/80 rounded-4xl text-md sm:text-l cursor-pointer ${
              isDarkMode ? "bg-pastelpink text-black" : "bg-white text-pastelpink"
            }`}>
            Bearbeiten
          </Link>
        </div>
      </div>
    </>
  )
}
