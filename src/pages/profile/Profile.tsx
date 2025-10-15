import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import supabase from "../../utils/supabase"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import FormButton from "../../components/formButton/FormButton"

interface ProfileProps {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export default function Profile() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const { user, setUser } = useContext(mainContext) as ProfileProps

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newFirstname, setNewFirstname] = useState("")
  const [newLastname, setNewLastname] = useState("")
  const [newUsername, setNewUsername] = useState("")

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
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`border rounded-2xl py-5 px-10  ${
          isDarkMode ? "bg-white/20 border-gray-700/80" : "bg-pastelpink/40 border-white/80"
        }`}>
        <h2
          className={`text-center font-quicksand font-bold text-3xl px-5 ${
            isDarkMode ? "text-gray-700" : "text-white/80"
          }`}>
          Profil bearbeiten
        </h2>
        <form className="flex flex-col align-items py-10 px-2" onSubmit={handleSave}>
          {!isEditing ? (
            <>
              <div className="mb-10">
                <p className="text-gray-700">
                  Vorname: <span className="text-xl">{user?.firstname}</span>
                </p>
                <p className="text-gray-700">
                  Nachname: <span className="text-xl">{user?.lastname}</span>
                </p>
                <p className="text-gray-700">
                  Username: <span className="text-xl">{user?.username}</span>
                </p>
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
                placeholder="Vorname"
                required
              />

              <label className="text-gray-600 pl-2">Nachname</label>
              <FormFieldInput
                type="text"
                name="lastname"
                value={newLastname}
                onChange={(e) => setNewLastname(e.target.value)}
                placeholder="Nachname"
                required
              />

              <label className="text-gray-600 pl-2">Username</label>
              <FormFieldInput
                type="text"
                name="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Username"
                required
              />

              <FormButton text="Änderungen übernehmen" />
            </>
          )}
        </form>
      </div>
    </div>
  )
}
