import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../../context/MainProvider"
import type { IUser } from "../../interfaces/IUser"
import supabase from "../../utils/supabase"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import FormButton from "../../components/formButton/FormButton"
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
                <p className="text-gray-700">
                  E-Mail: <span className="text-xl">{user?.email}</span>
                </p>
                <p className="text-gray-700">
                  Passwort: <span className="text-xl">••••••••</span>
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

              <label className="text-gray-600 pl-2">Username</label>
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

              <FormButton text="Änderungen übernehmen" />
            </>
          )}
        </form>
      </div>
    </div>
  )
}
