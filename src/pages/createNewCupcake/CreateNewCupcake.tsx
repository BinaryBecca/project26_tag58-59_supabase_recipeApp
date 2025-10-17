import { useContext, useState } from "react"
import supabase from "../../utils/supabase"
import { useNavigate } from "react-router"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import FormButton from "../../components/formButton/FormButton"
import FormFieldSelect from "../../components/formFieldSelect/FormFieldSelect"
import FormFieldTextarea from "../../components/formFieldTextarea/FormFieldTextarea"

export default function CreateNewCupcake() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const navigate = useNavigate()

  const [categoryName, setCategoryName] = useState<string>("")

  const [recipesName, setRecipesName] = useState<string>("")
  const [description, setDesription] = useState<string>("")
  const [servings, setServings] = useState<number>(0)
  const [instructions, setInstructions] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")

  // mehrere Zutaten hinzufügen!
  const [ingredients, setIngredients] = useState<
    { ingredientName: string; quantity: number; unit: string; additionalInfo: string }[]
  >([])

  // const [ingredientName, setIngredientName] = useState<string>("")
  // const [quantity, setQuantity] = useState<number>(0)
  // const [unit, setUnit] = useState<string>("")
  // const [additionalInfo, setAdditionalInfo] = useState<string>("")

  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // categories > ID holen
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("name", categoryName)
        .single()

      if (categoryError || !categoryData) {
        setFormError("Kategorie nicht gefunden")
        return
      }

      const categoryId = categoryData.id

      // recipes > Rezept speichern
      const { data: recipeData, error: recipeError } = await supabase
        .from("recipes")
        .insert([{ recipesName, description, servings, instructions, category_id: categoryId }])
        .select()
        .single()

      if (recipeError || !recipeData) {
        setFormError("Fehler beim Speichern des Rezepts")
        return
      }

      const recipeId = recipeData.id

      // ingredients-array > Zutaten speichern
      await supabase.from("ingredients").insert(
        ingredients.map((ing) => ({
          ingredientName: ing.ingredientName,
          quantity: ing.quantity,
          unit: ing.unit,
          additionalInfo: ing.additionalInfo,
          recipe_id: recipeId,
        }))
      )

      setFormError(null)
      navigate("/")
    } catch (err) {
      setFormError("Unerwarteter Fehler")
      console.error(err)
    }
  }

  // Kopie Ingredient Array
  const addingIngredient = [...ingredients]

  // alle Werte rauslöschen
  const reset = () => {
    setRecipesName("")
    setDesription("")
    setServings(0)
    setInstructions("")
    setImageUrl("")
    setCategoryName("")
    setIngredients([])
    setFormError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`border rounded-2xl py-5 px-10  ${
          isDarkMode ? "bg-white/20 border-gray-700/80" : "bg-pastelpink/40 border-white/80"
        }`}>
        <h2
          className={`text-center font-quicksand font-bold text-3xl px-5 ${
            isDarkMode ? "text-gray-700" : "text-white/80"
          }`}>
          Neues Rezept erstellen
        </h2>

        <form className="py-10 px-2" onSubmit={handleSubmit}>
          <div className="flex flex-col align-item w-full">
            <FormFieldInput
              type="text"
              name="recipesName"
              value={recipesName}
              onChange={(e) => setRecipesName(e.target.value)}
              placeholder="Rezeptname *"
              required={true}
            />

            <div className="flex flex-row justify-between gap-2 items-center">
              <FormFieldInput
                type="number"
                name="servings"
                value={servings.toString()}
                onChange={(e) => setServings(Number(e.target.value))}
                placeholder="Portionen (z.B. 4) *"
                required={true}
              />

              <FormFieldSelect
                name="categories"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required={true}
                placeholder="Wähle eine Kategorie aus *"
                options={[
                  { label: "Klassisch", value: "klassisch" },
                  { label: "Besondere Anlässe", value: "besondereAnlässe" },
                  { label: "Saisonal", value: "saisonal" },
                  { label: "Gesund & Vegan", value: "gesundUndVegan" },
                  { label: "Schokoladengenuss", value: "schokoladengenuss" },
                ]}
              />
            </div>

            <FormFieldInput
              type="text"
              name="descriptions"
              value={description}
              onChange={(e) => setDesription(e.target.value)}
              placeholder="Beschreibung *"
              required={true}
            />

            <FormFieldTextarea
              name="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder={`Anleitung *
              z.B.
              1. Mische die trockenen Zutaten in einer Schüssel.
              2. Dreh dich im Kreis.`}
              rows={5}
            />

            {/* storage img hinzufügen */}
            <div
              className={`border rounded-2xl py-5 px-10 mb-4  ${
                isDarkMode ? "bg-white/20 border-gray-700/80" : "bg-pastelpink/40 border-white/80"
              }`}>
              <p>Hier img hochladen</p>
            </div>

            {ingredients.map((ing, index) => (
              <div
                key={index}
                className={`flex flex-col border rounded-2xl py-5 px-10 mb-8  ${
                  isDarkMode ? "bg-white/20 border-gray-700/80" : "bg-pastelpink/40 border-white/80"
                }`}>
                <FormFieldInput
                  type="text"
                  name="ingredient"
                  value={ing.ingredientName}
                  onChange={(e) => {
                    // addingIngredient[index] = Obj. in Array
                    addingIngredient[index].ingredientName = e.target.value
                    setIngredients(addingIngredient)
                  }}
                  placeholder="Zutat"
                />
                <div className="flex flex-row">
                  <FormFieldInput
                    type="number"
                    name="quantity"
                    value={ing.quantity.toString()}
                    onChange={(e) => {
                      addingIngredient[index].quantity = Number(e.target.value)
                      setIngredients(addingIngredient)
                    }}
                    placeholder="Menge"
                  />

                  <FormFieldInput
                    type="string"
                    name="unit"
                    value={ing.unit}
                    onChange={(e) => {
                      addingIngredient[index].unit = e.target.value
                      setIngredients(addingIngredient)
                    }}
                    placeholder="Einheit"
                  />
                </div>
                <FormFieldInput
                  type="string"
                  name="additionalInfo"
                  value={ing.additionalInfo}
                  onChange={(e) => {
                    addingIngredient[index].additionalInfo = e.target.value
                    setIngredients(addingIngredient)
                  }}
                  placeholder="Zusatz"
                />
              </div>
            ))}

            <button
              className="p-2 mb-4 border border-gray-500 rounded-4xl text-l cursor-pointer"
              type="button"
              onClick={() =>
                // leere Zutat hinzufügen
                setIngredients([...ingredients, { ingredientName: "", quantity: 0, unit: "", additionalInfo: "" }])
              }>
              + Zutat hinzufügen
            </button>

            <div className="flex flex-row items-center gap-5 justify-end w-full">
              <button
                type="button"
                onClick={reset}
                className="p-2 mb-4 border border-gray-500 rounded-4xl text-l cursor-pointer">
                Abbrechen
              </button>

              <FormButton text="Rezept anlegen" />
            </div>
          </div>

          {/* <p className="text-center text-s text-gray-700">
            Noch nicht angemeldet?{" "}
            <Link
              to="/signup"
              className={`text-m ${
                isDarkMode ? "text-pastelpink hover:text-pink-500" : "text-gray-400 hover:text-gray-50"
              }`}>
              Anmelden
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  )
}
