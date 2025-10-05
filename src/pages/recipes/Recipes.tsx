import { useState } from "react"
import CategoriesBar from "../../components/categoriesBar/CategoriesBar"
import RecipeList from "../../components/recipeList/RecipeList"

export default function Recipes() {
  const [selectingACategory, setSelectingACategory] = useState<string | null>(null)

  return (
    <>
      <CategoriesBar selectingACategory={selectingACategory} setSelectingACategory={setSelectingACategory} />
      <RecipeList selectingACategory={selectingACategory} />
    </>
  )
}
