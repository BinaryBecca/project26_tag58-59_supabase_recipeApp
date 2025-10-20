import { useContext } from "react"
import RecipeCard from "../userRecipeCard/UserRecipeCard"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IRecipe } from "../../interfaces/IRecipe"

export default function UserRecipeList() {
  const { recipes, user } = useContext(mainContext) as mainContextProps
  // only recipes with user_id!
  const userRecipes = recipes.filter((recipe) => recipe.user_id === user?.id)

  return (
    <section className="flex flex-row flex-wrap justify-evenly pt-5">
      {userRecipes.length === 0 ? (
        <p className="text-center px-5">Es sind noch keine Rezepte erstellt worden</p>
      ) : (
        userRecipes.map((recipe: IRecipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />
        })
      )}
    </section>
  )
}
