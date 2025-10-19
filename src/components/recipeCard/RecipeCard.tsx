import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import Button from "../button/Button"

interface RecipeCardProps {
  recipe: IRecipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
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
          {/*        
    //   <img src="/img/detail-button_dark.png" alt="cupcake" />
    //   <img src="/img/detail-button_light.png" alt="cupcake" /> */}
          <Button
            navigateTo={`/details/${recipe.id}`}
            className="relative h-10 w-10 z-20"
            imgSrc={isDarkMode ? "/img/detail-button_light.png" : "/img/detail-button_dark.png"}
            imgHoverSrc={isDarkMode ? "/img/detail-button_dark.png" : "/img/detail-button_light.png"}
            imgAlt="cupcake"
            imgClassName="h-10 w-10 object-contain cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}
