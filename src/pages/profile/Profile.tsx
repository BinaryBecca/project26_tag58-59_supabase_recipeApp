import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import supabase from "../../utils/supabase"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import FormButton from "../../components/formButton/FormButton"
import type { IRecipe } from "../../interfaces/IRecipe"
import FormFieldWrapper from "../../components/formFieldWrapper/FormFieldWrapper"
// import { useNavigate } from "react-router"

interface ProfileProps {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function Profile() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const { user, setUser } = useContext(mainContext) as ProfileProps

  // const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newFirstname, setNewFirstname] = useState("")
  const [newLastname, setNewLastname] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [userRecipes, setUserRecipes] = useState<IRecipe[]>([])

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data, error } = await supabase.from("users").select("*").eq("id", user.id)
      if (error) {
        console.error("Fehler beim Fetchen", error)
      } else {
        setUser(data?.[0] || null)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  //# fetchRecipes from user to edit
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

  useEffect(() => {
    fetchUserRecipes()
  }, [])

  async function handleSave() {
    if ((user && newUsername !== user.username) || newFirstname !== user.firstname || newLastname !== user.lastname) {
      const { error } = await supabase
        .from("users")
        .update({
          firstname: newFirstname,
          lastname: newLastname,
          username: newUsername,
        })
        .eq("id", user.id)
      if (error) {
        console.error("Fehler beim Speichern", error)
      } else {
        fetchData()
      }
    }
    // ! e-mail/password in auth.users gespeichert; Änderungen über supabase.auth.updateUser
    if (newEmail || newPassword) {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
        password: newPassword,
      })

      if (error) {
        console.error("Fehler beim Speichern", error)
      } else if (newPassword) {
        await supabase.auth.signOut()
      } else {
        fetchData()
      }
    }
    setIsEditing(false)
  }

  function handleClick() {
    if (user) {
      setNewFirstname(user.firstname)
      setNewLastname(user.lastname)
      setNewUsername(user.username)
      setIsEditing(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
      <FormFieldWrapper title="Profil bearbeiten">
        <form className="flex flex-col align-items py-10 px-2" onSubmit={handleSave}>
          {!isEditing ? (
            <>
              <div className="flex flex-col gap-4 text-gray-700 mb-10">
                <div className="flex">
                  <span className="w-25 font-bold">Vorname:</span>
                  <span className="text-gray-600">{user?.firstname}</span>
                </div>
                <div className="flex">
                  <span className="w-25 font-bold">Nachname:</span>
                  <span className="text-gray-600">{user?.lastname}</span>
                </div>
                <div className="flex">
                  <span className="w-25 font-bold">Nutzername:</span>
                  <span className="text-gray-600">{user?.username}</span>
                </div>
                <div className="flex">
                  <span className="w-25 font-bold">E-Mail:</span>
                  <span className="text-gray-600">{user?.email}</span>
                </div>
                <div className="flex">
                  <span className="w-25 font-bold">Passwort:</span>
                  <span className="text-gray-600">••••••••</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClick}
                className={`p-2 mb-4 border border-white/80 rounded-4xl text-xl cursor-pointer ${
                  isDarkMode ? "bg-pastelpink text-black" : "bg-white text-pastelpink"
                }`}>
                Bearbeiten
              </button>
            </>
          ) : (
            <>
              <label className="text-gray-600 pl-2">Vorname</label>
              <FormFieldInput
                type="text"
                name="firstname"
                value={newFirstname}
                onChange={(e) => setNewFirstname(e.target.value)}
                placeholder="Neuer Vorname"
              />

              <label className="text-gray-600 pl-2">Nachname</label>
              <FormFieldInput
                type="text"
                name="lastname"
                value={newLastname}
                onChange={(e) => setNewLastname(e.target.value)}
                placeholder="Neuer Nachname"
              />

              <label className="text-gray-600 pl-2">Nutzername</label>
              <FormFieldInput
                type="text"
                name="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Neuer Username"
              />

              <label className="text-gray-600 pl-2">E-Mail</label>
              <FormFieldInput
                type="email"
                name="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Neue E-Mail"
              />

              <label className="text-gray-600 pl-2">Passwort</label>
              <FormFieldInput
                type="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Neues Passwort"
              />

              <div className=" flex mt-4 gap-3">
                <FormButton text="Änderungen übernehmen" />
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-2 mb-4 border border-gray-500 rounded-4xl text-l cursor-pointer">
                  Abbrechen
                </button>
              </div>
            </>
          )}
        </form>
      </FormFieldWrapper>

      <FormFieldWrapper title="Erstellte Rezepte">
        <ul className="flex flex-row flex-wrap gap-4">
          {userRecipes.map((recipe) => (
            <li key={recipe.id} className="border p-4 rounded-xl">
              <img className="h-50" src={recipe.image_url} alt={recipe.name} />
              <h4 className="text-xl font-semibold">{recipe.name}</h4>
              <p>{recipe.description}</p>
              <p>{recipe.servings}</p>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul>
      </FormFieldWrapper>
    </div>
  )
}
