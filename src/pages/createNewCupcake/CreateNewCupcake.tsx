import { useState } from "react"

export default function CreateNewCupcake() {
  const [title, setTitle] = useState<string>("")
  const [description, setDesription] = useState<string>("")
  // number?
  const [servings, setServings] = useState<string>("")
  const [instructions, setInstructions] = useState<string>("")
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !description || !servings || !instructions) {
      setFormError("Bitte fülle alle Felder aus!")
      return
    }

    console.log(title, description, servings, instructions)
  }

  return (
    <form className="flex flex-col justify-between items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between my-2">
        <label htmlFor="title">Titel:</label>
        <input
          className="p-2 border"
          placeholder="Titel"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-between my-2">
        <label htmlFor="description">Beschreibung</label>
        <textarea
          className="p-2 border"
          placeholder="Beschreibung"
          id="description"
          value={description}
          onChange={(e) => setDesription(e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-between my-2">
        <label htmlFor="servings">Portionen</label>
        <input
          className="p-2 border"
          placeholder="Portionen"
          type="string"
          id="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-between my-2">
        <label htmlFor="instructions">Anleitung</label>
        <textarea
          className="p-2 border"
          placeholder="Anleitung"
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      <button>Cupcake-Rezept erstellen</button>

      {formError && <p className="text-red-400">{formError}</p>}
    </form>
  )
}
