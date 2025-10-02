import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"

export default function RecipeCard() {
  const { recipes } = useContext(mainContext) as mainContextProps

  return (
    <>
      {recipes.map((recipe: IRecipe) => {
        return (
          <div key={recipe.id} className="grid grid-rows-2 m-10 w-100">
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
              {/* <p className="absolute top-30 left-30 text-black/80 text-4xl z-20 text-center">NO IMAGE FOUND</p> */}
            </div>

            <div className="flex flex-col justify-start items-center py-10 px-4 border border-gray-300 p-3">
              <h2 className="font-bold text-2xl">{recipe.name}</h2>
              <p className="text-xl py-5 text-center">{recipe.description}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}
