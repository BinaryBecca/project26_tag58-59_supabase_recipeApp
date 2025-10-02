import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import Button from "../button/Button"

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

            <div className="flex flex-col justify-between items-center py-10 px-4 border border-gray-300 p-3 bg-white">
              <h2 className="font-bold text-2xl">{recipe.name}</h2>
              <p className="text-xl text-center">{recipe.description}</p>
              {/*        
    //   <img src="/img/detail-button.png" alt="cupcake" />
    //   <img src="/img/detail-button-hover.png" alt="cupcake" /> */}
              <Button
                navigateTo={`details/${recipe.id}`}
                className="h-10 w-10"
                imgSrc="/img/detail-button.png"
                imgHoverSrc="/img/detail-button-hover.png"
                imgAlt="cupcake"
                imgClassName="h-10 w-10 object-contain cursor-pointer hover:h-12 hover:w-12"
              />
            </div>
          </div>
        )
      })}
    </>
  )
}
