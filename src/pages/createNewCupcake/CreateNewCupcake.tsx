import { useContext, useState } from "react"
import supabase from "../../utils/supabase"
import { useNavigate } from "react-router"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import FormButton from "../../components/formButton/FormButton"
import FormFieldSelect from "../../components/formFieldSelect/FormFieldSelect"
import FormFieldTextarea from "../../components/formFieldTextarea/FormFieldTextarea"
import { uploadImg } from "../../functions/uploadImg"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import FormFieldWrapper from "../../components/formFieldWrapper/FormFieldWrapper"

interface CreateNewCupcakeProps {
  user: IUser
}

export default function CreateNewCupcake() {
  const { user } = useContext(mainContext) as CreateNewCupcakeProps
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const navigate = useNavigate()

  const [categoryName, setCategoryname] = useState<string>("")

  const [recipeName, setRecipeName] = useState<string>("")
  const [description, setDesription] = useState<string>("")
  const [servings, setServings] = useState<number>(0)
  const [instructions, setInstructions] = useState<string>("")
  const [image_url, setImageUrl] = useState<File | null>(null)

  // mehrere Zutaten hinzufügen!
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: number; unit: string; additionalInfo: string }[]
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

      // (falls da) img hochladen
      const uploadedImg = await uploadImg(image_url)

      console.log("URL:", uploadedImg)

      if (!uploadedImg) {
        setFormError("Bild konnte nicht hochgeladen werden")
        return
      }

      // recipes > Rezept speichern
      const { data: recipeData, error: recipeError } = await supabase
        .from("recipes")
        .insert([
          {
            name: recipeName,
            description,
            servings,
            instructions,
            category_id: categoryId,
            image_url: uploadedImg,
            // #user soll Rezept später editieren können!!!
            user_id: user.id,
          },
        ])
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
          ingredientName: ing.name,
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
    setCategoryname("")
    setRecipeName("")
    setDesription("")
    setServings(0)
    setInstructions("")
    setImageUrl(null)
    setIngredients([])
    setFormError(null)
  }

  return (
    <FormFieldWrapper title="Neues Rezept erstellen">
      <form className="py-10 px-2" onSubmit={handleSubmit}>
        <div className="flex flex-col align-item w-full">
          <FormFieldInput
            type="text"
            name="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
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
              onChange={(e) => setCategoryname(e.target.value)}
              required={true}
              placeholder="Wähle eine Kategorie aus *"
              options={[
                { label: "Klassisch", value: "Klassisch" },
                { label: "Besondere Anlässe", value: "Besondere Anlässe" },
                { label: "Saisonal", value: "Saisonal" },
                { label: "Gesund & Vegan", value: "Gesund & Vegan" },
                { label: "Schokoladengenuss", value: "Schokoladengenuss" },
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setImageUrl(e.target.files[0])
                }
              }}
              className="w-full text-gray-700"
            />
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
                value={ing.name}
                onChange={(e) => {
                  // addingIngredient[index] = Obj. in Array
                  addingIngredient[index].name = e.target.value
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
              setIngredients([...ingredients, { name: "", quantity: 0, unit: "", additionalInfo: "" }])
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

            <FormButton type="submit" text="Rezept anlegen" />
          </div>
        </div>
      </form>
    </FormFieldWrapper>
  )
}
