import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import supabase from "../../utils/supabase"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormButton from "../../components/formButton/FormButton"

export default function Login() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Fehler beim Login", error)
      }
      console.log("Login war erfolgreich", data)
      navigate("/")
    } catch (error) {
      console.error("Fehler beim Login", error)
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
          Anmelden
        </h2>

        <form className="flex flex-col align-items py-10 px-2" onSubmit={handleLogin}>
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

          <FormButton text="Login" />

          <p className="text-center text-s text-gray-700">
            Noch nicht angemeldet?{" "}
            <Link
              to="/signup"
              className={`text-m ${
                isDarkMode ? "text-pastelpink hover:text-pink-500" : "text-gray-400 hover:text-gray-50"
              }`}>
              Anmelden
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
