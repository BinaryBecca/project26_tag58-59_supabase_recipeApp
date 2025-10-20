import { useState } from "react"
import CategoriesBar from "../../components/categoriesBar/CategoriesBar"
import CupcakeList from "../../components/cupcakeList/CupcakeList"

export default function Recipes() {
  const [selectingACategory, setSelectingACategory] = useState<string | null>(null)

  return (
    <>
      <CategoriesBar selectingACategory={selectingACategory} setSelectingACategory={setSelectingACategory} />
      <CupcakeList selectingACategory={selectingACategory} />
    </>
  )
}
