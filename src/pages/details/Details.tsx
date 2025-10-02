import { useContext } from "react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"
import { useParams } from "react-router"
import type { IIngredient } from "../../interfaces/IIngredient"
import type { ICategory } from "../../interfaces/ICategory"

export default function Details() {
  const { id } = useParams()
  console.log("id", id)

  const { recipes, ingredients, categories } = useContext(mainContext) as mainContextProps
  console.log(
    "All ingredients:",
    ingredients.map((i) => i.recipe_id)
  )
  const showingRecipe = recipes.find((recipe: IRecipe) => recipe.id === id)
  const showingIngredient = ingredients.filter(
    (ingredient: IIngredient) => console.log("Vergleich:", ingredient.recipe_id === id, ingredient.recipe_id, id)
    //  ingredient.recipe_id.trim() === id?.trim()
  )

  console.log("All ingredients:", ingredients)
  console.log("Filtered ingredients:", showingIngredient)
  // const showingCategory = categories.filter((category: ICategory) => category.id === id)

  if (!id) {
    return <p>ID fehlt in der URL.</p>
  }
  console.log("Alle Zutaten:", ingredients.length)

  if (showingRecipe === undefined) {
    return <p className="text-center text-2xl py-10">Rezept wurd nicht gefunden.</p>
  }

  if (!showingIngredient.length) {
    return <p className="text-center text-2xl py-10">Zutaten werden geladen...</p>
  }
  if (showingIngredient.length === 0) {
    return <p className="text-center text-2xl py-10">Zutaten wurden nicht gefunden.</p>
  }

  // if (showingCategory === undefined) {
  //   return <p className="text-center text-2xl py-10">Kategorien wurden nicht gefunden.</p>
  // }

  return (
    <section className="flex flex-col justify-between">
      <div
        className="relative bg-cover bg-center h-1/2 w-full px-20 py-25"
        style={{ backgroundImage: `url(${showingRecipe.image_url})` }}>
        <p className="relative text-white/80 text-4xl z-20 text-center">{showingRecipe.name}</p>
        <div className="absolute inset-0 bg-black/45 z-10"></div>
      </div>

      <div>
        <h2>Portionen</h2>
        <p>{showingRecipe.servings}</p>

        <h2>Zutaten</h2>
        <ul>
          {showingIngredient.map((ingredient) => {
            return (
              <li key={ingredient.id}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            )
          })}
        </ul>

        <h2>Zubereitung</h2>
        <ul>
          <li>{showingRecipe.instructions}</li>
        </ul>

        <h2>Zusätzliche Informationen</h2>
      </div>
    </section>
  )
}
