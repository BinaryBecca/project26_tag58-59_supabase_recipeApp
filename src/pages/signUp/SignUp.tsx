import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import supabase from "../../utils/supabase"
import FormFieldInput from "../../components/formFieldInput/FormFieldInput"
import { darkModeContext, type DarkmodeProviderProps } from "../../components/darkModeContext/DarkModeProvider"
import FormButton from "../../components/formButton/FormButton"
import FormFieldWrapper from "../../components/formFieldWrapper/FormFieldWrapper"

export default function SignUp() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

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
      //! direkt zum Profile
      navigate("/profile")
    } catch (error) {
      console.error("Fehler beim SignUp", error)
    }
  }

  return (
    <FormFieldWrapper title="Erstelle einen Account">
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

        <FormButton text="Anmelden" />

        <p className="text-center text-s text-gray-700">
          Schon angemeldet?{" "}
          <Link
            to="/login"
            className={`text-m ${
              isDarkMode ? "text-pastelpink hover:text-pink-500" : "text-gray-400 hover:text-gray-50"
            }`}>
            Login
          </Link>
        </p>
      </form>
    </FormFieldWrapper>
  )
}
