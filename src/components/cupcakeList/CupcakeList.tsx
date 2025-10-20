import { useContext } from "react"

import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import CupcakeCard from "../cupcakeCard/CupcakeCard"

interface CupcakeListProps {
  selectingACategory?: string | null
}

export default function CupcakeList({ selectingACategory }: CupcakeListProps) {
  const { recipes } = useContext(mainContext) as mainContextProps

  const getFilteredRecipes = () => {
    return selectingACategory
      ? recipes.filter((recipe) => {
          return recipe.category_id === selectingACategory
        })
      : recipes
  }

  return (
    <section className="flex flex-row flex-wrap justify-evenly pt-5 gap-10 pb-20">
      {getFilteredRecipes().map((recipe: IRecipe) => {
        return <CupcakeCard key={recipe.id} recipe={recipe} />
      })}
    </section>
  )
}
