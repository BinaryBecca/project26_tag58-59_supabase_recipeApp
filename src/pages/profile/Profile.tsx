import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import supabase from "../../utils/supabase"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import FormButton from "../../components/formButton/FormButton"
import FormFieldWrapper from "../../components/formFieldWrapper/FormFieldWrapper"
import FormFieldLabel from "../../components/formFieldLabel/FormFieldLabel"
import { Link } from "react-router"
import CupcakeCard from "../../components/cupcakeCard/CupcakeCard"
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
    <FormFieldWrapper title="Profil bearbeiten">
      <form className="flex flex-col align-items py-10 px-2" onSubmit={handleSave}>
        {!isEditing ? (
          <>
            <div className="flex flex-col gap-4 text-gray-700 mb-10 px-10">
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
              className={`p-2 mb-4 border border-white/80 rounded-4xl text-md sm:text-l cursor-pointer ${
                isDarkMode ? "bg-pastelpink text-black" : "bg-white text-pastelpink"
              }`}>
              Bearbeiten
            </button>
          </>
        ) : (
          <>
            <FormFieldLabel text="Vorname" />
            <FormFieldInput
              type="text"
              name="firstname"
              value={newFirstname}
              onChange={(e) => setNewFirstname(e.target.value)}
              placeholder="Neuer Vorname"
            />

            <FormFieldLabel text="Nachname" />
            <FormFieldInput
              type="text"
              name="lastname"
              value={newLastname}
              onChange={(e) => setNewLastname(e.target.value)}
              placeholder="Neuer Nachname"
            />

            <FormFieldLabel text="Nutzername" />
            <FormFieldInput
              type="text"
              name="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Neuer Username"
            />

            <FormFieldLabel text="E-Mail" />
            <FormFieldInput
              type="email"
              name="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Neue E-Mail"
            />

            <FormFieldLabel text="Passwort" />
            <FormFieldInput
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Neues Passwort"
            />

            <div className=" flex mt-4 gap-3">
              <FormButton text="Profil ändern" />
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 border border-gray-500 rounded-4xl text-md sm:text-l cursor-pointer">
                Abbrechen
              </button>
            </div>
          </>
        )}
      </form>
      <h2
        className={`text-center font-quicksand font-bold text-3xl pb-6 ${
          isDarkMode ? "text-gray-700" : "text-white/80"
        }`}>
        Rezepte bearbeiten
      </h2>
      <Link to="/user_recipes" className="flex flex-col mb-4 items-center">
        {" "}
        <img className="h-50 object-contain" src={isDarkMode ? "/img/baker_light.png" : "/img/baker_dark.png"} alt="" />
      </Link>
      <p className="text-gray-500 text-center text-xs">Klicke auf den Bäcker</p>
    </FormFieldWrapper>
  )
}
