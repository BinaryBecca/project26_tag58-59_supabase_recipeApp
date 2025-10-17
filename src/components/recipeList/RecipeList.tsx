import { useContext } from "react"
import RecipeCard from "../recipeCard/RecipeCard"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"

interface RecipeListProps {
  selectingACategory?: string | null
}

export default function RecipeList({ selectingACategory }: RecipeListProps) {
  const { recipes } = useContext(mainContext) as mainContextProps

  const getFilteredRecipes = () => {
    return selectingACategory
      ? recipes.filter((recipe) => {
          return recipe.category_id === selectingACategory
        })
      : recipes
  }

  return (
    <section className="flex flex-row flex-wrap justify-evenly pt-5">
      {getFilteredRecipes().map((recipe: IRecipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />
      })}
    </section>
  )
}
