import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { IRecipe } from "../../interfaces/IRecipe"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import type { IIngredient } from "../../interfaces/IIngredient"
import type { ICategory } from "../../interfaces/ICategory"
import type { IUser } from "../../interfaces/IUser"
import supabase from "../../utils/supabase"
import FormButton from "../../components/formButton/FormButton"
import EditingButton from "../../components/editingButton/EditingButton"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"

interface EditingUserRecipesProps {
  user: IUser
  // setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function EditingUserRecipes() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const { id } = useParams()
  const { categories } = useContext(mainContext) as mainContextProps
  const { user } = useContext(mainContext) as EditingUserRecipesProps

  const [userRecipes, setUserRecipes] = useState<IRecipe[]>([])
  const [userIngredients, setUserIngredients] = useState<IIngredient[]>([])

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null)
  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>([])

  const navigate = useNavigate()

  //# fetch recipes from user to edit
  const fetchUserRecipes = async () => {
    if (user) {
      const { data, error } = await supabase.from("recipes").select("*").eq("user_id", user.id)
      if (error) {
        console.error("Fehler beim Fetchen der Rezepte", error)
      } else {
        setUserRecipes(data || [])
      }
    }
  }

  //# fetch ingredients from user to edit
  const fetchUserIngredients = async () => {
    if (user) {
      const { data, error } = await supabase.from("ingredients").select("*").eq("user_id", user.id)
      if (error) {
        console.error("Fehler beim Fetchen der Zutaten", error)
      } else {
        setUserIngredients(data || [])
      }
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchUserRecipes()
      fetchUserIngredients()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // #edit recipe user
  const handleEditing = (recipe: IRecipe) => {
    setSelectedRecipe(recipe)
    const ingredientsForRecipe = userIngredients.filter((i) => i.recipe_id === recipe.id)
    setSelectedIngredients(ingredientsForRecipe)
    setIsEditing(true)
  }

  //#saving changes
  const handleSave = async () => {
    if (!selectedRecipe || !selectedIngredients) return
    const { error: recipeError } = await supabase
      .from("recipes")
      .update({
        name: selectedRecipe.name,
        description: selectedRecipe.description,
        servings: selectedRecipe.servings,
        instructions: selectedRecipe.instructions,
        category_id: selectedRecipe.category_id,
        image_url: selectedRecipe.image_url,
        // user_id: selectedRecipe.user_id,
      })
      .eq("id", selectedRecipe.id)

    // Unterschied schon existierende/neue Zutaten!
    const existingIngredients = selectedIngredients.filter((ing) => ing.id)
    const newIngredients = selectedIngredients.filter((ing) => !ing.id)

    // nur existierende Zutatenn updaten
    const ingredientUpdates = await Promise.all(
      existingIngredients.map((ingredient) =>
        supabase
          .from("ingredients")
          .update({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            additional_info: ingredient.additional_info,
          })
          .eq("id", ingredient.id)
      )
    )

    let insertError = null
    if (newIngredients.length > 0) {
      const { error } = await supabase.from("ingredients").insert(
        newIngredients.map((ing) => ({
          recipe_id: selectedRecipe.id,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          additional_info: ing.additional_info,
        }))
      )
      insertError = error
    }

    const ingredientError = ingredientUpdates.some((res) => res.error) || insertError

    if (recipeError || ingredientError) {
      console.error("Fehler beim Speichern des Rezeptes", recipeError, ingredientError)
    } else {
      console.log("Rezept und Zutaten erfolgreich gespeichert")
      setIsEditing(false)
      fetchUserRecipes()
      fetchUserIngredients()
    }
  }

  //# changes with ingredients
  const handleIngredientChange = (index: number, field: keyof IIngredient, value: string | number) => {
    const updatedIngredients = [...selectedIngredients]
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    }
    setSelectedIngredients(updatedIngredients)
  }

  //# delete recipe
  const handleDelete = async (recipeId: string) => {
    if (!window.confirm("Möchtest du dieses Rezept wirklich löschen?")) return

    try {
      // zuerst Zutaten löschen (wegen Foreign Key)
      const { error: ingredientError } = await supabase.from("ingredients").delete().eq("recipe_id", recipeId)

      if (ingredientError) {
        console.error("Fehler beim Löschen der Zutaten:", ingredientError)
        return
      }

      // dann das Rezept löschen
      const { error: recipeError } = await supabase.from("recipes").delete().eq("id", recipeId)

      if (recipeError) {
        console.error("Fehler beim Löschen des Rezepts:", recipeError)
        return
      }

      alert("Rezept erfolgreich gelöscht.")
      navigate("/user_recipes")
    } catch (error) {
      console.error("Unerwarteter Fehler beim Löschen:", error)
    }
  }

  //   const handleRecipeDeleted = async (recipeId: string) => {
  //   // Zutaten löschen
  //   await supabase.from("ingredients").delete().eq("recipe_id", recipeId)

  //   // Rezept löschen
  //   await supabase.from("recipes").delete().eq("id", recipeId)

  //   // Lokalen State aktualisieren, damit die UI sofort aktualisiert wird
  //   setUserRecipes(prev => prev.filter(r => r.id !== recipeId))
  //   setUserIngredients(prev => prev.filter(i => i.recipe_id !== recipeId))

  //   // Weiterleitung
  //   navigate("/user_recipes")
  // }

  const showingRecipe = userRecipes.find((recipe: IRecipe) => {
    return recipe.id === id
  })

  const showingIngredient = userIngredients.filter((ingredient: IIngredient) => {
    return ingredient.recipe_id === id
  })

  const showingCategory = categories.filter((category: ICategory) => {
    return category.id === showingRecipe?.category_id
  })

  if (showingRecipe === undefined) {
    return <p className="text-center text-2xl py-10">Rezept wurde nicht gefunden.</p>
  }

  if (showingIngredient === undefined) {
    return <p className="text-center text-2xl py-10">Zutaten wurde nicht gefunden.</p>
  }

  if (showingCategory === undefined) {
    return <p className="text-center text-2xl py-10">Kategorien wurden nicht gefunden.</p>
  }

  return (
    <section className="flex flex-col justify-between">
      {!isEditing ? (
        <>
          <div
            className="relative bg-cover bg-center w-full px-20 py-30"
            style={{ backgroundImage: `url(${showingRecipe.image_url || "/img/placeholder-img.png"})` }}>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="py-8 px-5 sm:py-10 sm:px-10 md:px-15 lg:px-20 font-quicksand text-xl sm:text-2xl">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-6xl font-bold pb-2">{showingRecipe.name}</h1>
              <EditingButton onClick={() => handleEditing(showingRecipe)} />
            </div>

            <h2 className="pb-8">{showingRecipe.description}</h2>
            <h2 className="font-bold text-2xl sm:text-3xl pb-4">Zutaten</h2>
            <div className={`p-5 mb-4 ${isDarkMode ? "bg-pastelpink/40" : "bg-white/20"}`}>
              Für <span className="font-bold">{showingRecipe.servings}</span> Portionen
            </div>
            <ul className="pb-8">
              {showingIngredient.map((ingredient) => (
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
              ))}
            </ul>

            <h2 className="font-bold text-2xl sm:text-3xl pb-4">Zubereitung</h2>
            <ol className="list-decimal list-inside pb-8">
              {showingRecipe.instructions
                .split(/\d+\.\s*/)
                .filter((item) => item !== "")
                .map((instruction, index) => (
                  <li className="pb-2" key={index}>
                    {instruction.trim()}
                  </li>
                ))}
            </ol>

            <h2 className="font-bold text-2xl sm:text-3xl pb-4">Kategorie</h2>
            <div
              className={`inline-block p-5 mb-10 sm:mb-20 rounded-4xl ${
                isDarkMode ? "bg-pastelpink/40" : "bg-white/20"
              }`}>
              {showingCategory.map((category) => (
                <p key={category.id}>{category.name}</p>
              ))}
            </div>
          </div>
        </>
      ) : selectedRecipe ? (
        <>
          <div
            className="relative bg-cover bg-center w-full px-20 py-30"
            style={{ backgroundImage: `url(${showingRecipe.image_url || "/img/placeholder-img.png"})` }}>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="py-8 px-5 sm:py-10 sm:px-10 md:px-15 lg:px-20 font-quicksand text-xl sm:text-2xl">
            <input
              type="text"
              value={selectedRecipe.name}
              onChange={(e) => setSelectedRecipe({ ...selectedRecipe, name: e.target.value })}
              className="w-full text-3xl sm:text-6xl font-bold pb-2 bg-transparent border border-black p-2 mb-4"
            />

            <input
              type="text"
              value={selectedRecipe.description}
              onChange={(e) => setSelectedRecipe({ ...selectedRecipe, description: e.target.value })}
              className="w-full text-xl sm:text-2xl bg-transparent border border-black p-2 mb-4"
            />

            <div className="flex flex-col flex-1">
              {/* <input
                type="text"
                value={selectedRecipe?.servings.toString()}
                onChange={(e) => setSelectedRecipe({ ...selectedRecipe, servings: Number(e.target.value) })}
                className="w-full text-xl sm:text-2xl bg-transparent border border-black p-2"
              /> */}
              <FormFieldInput
                type="number"
                name="servings"
                value={selectedRecipe.servings.toString()}
                onChange={(e) => setSelectedRecipe({ ...selectedRecipe, servings: Number(e.target.value) })}
              />
            </div>

            <select
              value={selectedRecipe.category_id}
              onChange={(e) => setSelectedRecipe({ ...selectedRecipe, category_id: e.target.value })}
              className="w-full text-xl sm:text-2xl bg-transparent border border-black p-2 mb-4">
              <option value="">Kategorie wählen</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {selectedIngredients.map((ing, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                  className="w-full text-xl sm:text-2xl bg-transparent border-none outline-none"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="number"
                    value={ing.quantity}
                    onChange={(e) => handleIngredientChange(index, "quantity", Number(e.target.value))}
                    className="w-full sm:w-1/2 text-xl sm:text-2xl bg-transparent border-none outline-none"
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    className="w-full sm:w-1/2 text-xl sm:text-2xl bg-transparent border-none outline-none"
                  />
                </div>

                <button
                  type="button"
                  className="p-2 mb-4 border border-gray-500 rounded-4xl text-l cursor-pointer"
                  onClick={() =>
                    setSelectedIngredients([
                      ...selectedIngredients,
                      { name: "", quantity: 0, unit: "", additional_info: "", recipes: [] },
                    ])
                  }>
                  + Zutat hinzufügen
                </button>
              </div>
            ))}

            <textarea
              value={selectedRecipe.instructions}
              onChange={(e) => setSelectedRecipe({ ...selectedRecipe, instructions: e.target.value })}
              rows={6}
              className="w-full text-xl sm:text-2xl bg-transparent border border-gray-400 rounded-xl px-4 py-2"
            />

            <div className="flex flex-row gap-5 items-center justify-center pt-10">
              <FormButton text="Änderungen speichern" onClick={handleSave} />
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 mb-4 border border-gray-500 rounded-4xl text-md sm:text-l cursor-pointer">
                Abbrechen
              </button>
              <button
                type="button"
                onClick={() => handleDelete(selectedRecipe.id)}
                className="p-2 mb-4 border border-red-500 text-red-500 rounded-4xl text-md sm:text-l cursor-pointer hover:bg-red-500 hover:text-white transition">
                Löschen
              </button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  )
}
