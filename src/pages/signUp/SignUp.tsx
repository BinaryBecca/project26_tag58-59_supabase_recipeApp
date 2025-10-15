import { useContext, useState } from "react"
// import { mainContext } from "../../context/MainProvider"
// import type { IUser } from "../../interfaces/IUser"
import { useNavigate } from "react-router"
import supabase from "../../utils/supabase"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"

// interface SignUpProps {
//   user: IUser | null
//   setUser: React.Dispatch<React.SetStateAction<IUser | null>>
// }

export default function SignUp() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  // const { user, setUser } = useContext(mainContext) as SignUpProps
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState<string>("")
  const [lastname, setLastname] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            firstname,
            lastname,
          },
        },
      })

      if (error) {
        console.error("Fehler beim SignUp", error)
      }
      console.log("SignUp war erfolgreich", data)
      // direkt zum Profile
      navigate("/profile")
    } catch (error) {
      console.error("Fehler beim SignUp", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`border rounded-2xl p-5 ${
          isDarkMode ? "bg-white/20 border-black/80" : "bg-pastelpink/40 border-white/80"
        }`}>
        <h2
          className={`text-center font-quicksand font-bold text-3xl px-5 ${
            isDarkMode ? "text-gray-700" : "text-white/80"
          }`}>
          Erstelle einen Account
        </h2>

        <form className="flex flex-col align-items py-10 px-2" onSubmit={handleSignUp}>
          <FormFieldInput
            type="text"
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Vorname"
            required={true}
          />
          <FormFieldInput
            type="text"
            name="lastname"
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Nachname"
            required={true}
          />
          <FormFieldInput
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required={true}
          />
          <FormFieldInput
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            required={true}
          />
          <FormFieldInput
            type="current_password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required={true}
          />
        </form>
      </div>
    </div>
  )
}
