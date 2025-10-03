import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import { useParams } from "react-router"
import type { IIngredient } from "../../interfaces/IIngredient"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import type { ICategory } from "../../interfaces/ICategory"
import Button from "../../components/button/Button"

export default function Details() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const { id } = useParams()
  // console.log("id", id)

  const { recipes, ingredients, categories } = useContext(mainContext) as mainContextProps
  const showingRecipe = recipes.find((recipe: IRecipe) => {
    // console.log(`${recipe.id}`, `${id}`, recipe.id === id)
    return recipe.id === id
  })

  const showingIngredient = ingredients.filter((ingredient: IIngredient) => {
    // console.log(`${ingredient.recipe_id}`, `${id}`, ingredient.recipe_id === id)
    return ingredient.recipe_id === id
  })

  const showingCategory = categories.filter((category: ICategory) => {
    // console.log(`${category.id}`, `${showingRecipe?.category_id}`, category.id === showingRecipe?.category_id)
    return category.id === showingRecipe?.category_id
  })

  if (!id) {
    return <p>ID fehlt in der URL.</p>
  }

  if (showingRecipe === undefined) {
    return <p className="text-center text-2xl py-10">Rezept wurd nicht gefunden.</p>
  }

  if (showingIngredient === undefined) {
    return <p className="text-center text-2xl py-10">Zutaten wurd nicht gefunden.</p>
  }

  if (showingCategory === undefined) {
    return <p className="text-center text-2xl py-10">Kategorien wurden nicht gefunden.</p>
  }

  return (
    <section className="flex flex-col justify-between">
      <div
        className="relative bg-cover bg-center w-full px-20 py-30"
        style={{ backgroundImage: `url(${showingRecipe.image_url})` }}>
        <p className="relative text-white/80 text-5xl z-20 text-center">{showingRecipe.name}</p>
        <div className="absolute inset-0 bg-black/45 z-10"></div>
      </div>

      <div className="py-10 px-20 font-quicksand text-2xl">
        <h1 className="text-6xl font-bold pb-2">{showingRecipe.name}</h1>
        <h2 className="pb-8">{showingRecipe.description}</h2>
        <h2 className="font-bold text-3xl pb-4">Zutaten</h2>
        <div className={`p-5 mb-4 ${isDarkMode ? "bg-pastelpink/40" : "bg-white/20"}`}>
          Für <span className="font-bold">{showingRecipe.servings}</span> Portionen
        </div>
        <ul className="pb-8">
          {showingIngredient.map((ingredient) => {
            return (
              <div key={ingredient.id}>
                <li className="py-2.5 grid grid-cols-[8rem_1fr] gap-8">
                  <span className="text-right">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span>
                    {ingredient.name}
                    {ingredient.additional_info && ","} {ingredient.additional_info}
                  </span>
                </li>
                <div className="border-b"></div>
              </div>
            )
          })}
        </ul>

        <h2 className="font-bold text-3xl pb-4">Zubereitung</h2>

        <ol className="list-decimal list-inside pb-8">
          {showingRecipe.instructions
            // ! /\d+\.\s*/ zerlegt 1., 2., etc. in einzelne array-elemnte
            // \d 0-9
            // \. .
            // \s* Leerzeichen
            .split(/\d+\.\s*/)
            .filter((item) => item != "")
            .map((instruction, index) => {
              return (
                <li className="pb-2" key={index}>
                  {instruction.trim()}
                </li>
              )
            })}
        </ol>

        <h2 className="font-bold text-3xl pb-4">Kategorie</h2>
        <div className={`inline-block p-5 mb-20 rounded-4xl ${isDarkMode ? "bg-pastelpink/40" : "bg-white/20"}`}>
          {showingCategory.map((category) => {
            return <p key={category.id}>{category.name}</p>
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button
            navigateTo={-1}
            className="rotate-180 h-10 w-10 cursor-pointer hover:h-11 hover:w-11 rounded-full overflow-hidden"
            imgSrc="/img/arrow-dark.png"
            imgHoverSrc="/img/arrow.png"
            imgDarkSrc="/img/arrow.png"
            imgAlt="arrow right"
            imgClassName="h-10 w-10 object-contain hover:h-11 hover:w-11 hover:bg-pastelpink/80"
          />
          <Button
            navigateTo={1}
            className="h-10 w-10 cursor-pointer hover:h-11 hover:w-11 rounded-full overflow-hidden"
            imgSrc="/img/arrow-dark.png"
            imgHoverSrc="/img/arrow.png"
            imgDarkSrc="/img/arrow.png"
            imgAlt="arrow right"
            imgClassName="h-10 w-10 object-contain hover:h-11 hover:w-11 hover:bg-pastelpink/80"
          />
        </div>
      </div>
    </section>
  )
}
