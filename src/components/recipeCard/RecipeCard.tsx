import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"

export default function RecipeCard() {
  const { recipes } = useContext(mainContext) as mainContextProps

  return (
    <>
      {recipes.map((recipe: IRecipe) => {
        return (
          <div key={recipe.id} className="border p-5 m-10 rounded">
            <h2 className="font-bold">{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        )
      })}
    </>
  )
}
