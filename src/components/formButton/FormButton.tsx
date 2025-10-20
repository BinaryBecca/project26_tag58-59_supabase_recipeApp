import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface FormButtonProps {
  text: string
  type?: "submit" | "button"
}

export default function FormButton({ text, type = "submit" }: FormButtonProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <button
      type={type}
      className={`p-2 mb-4 border border-white/80 rounded-4xl text-l cursor-pointer ${
        isDarkMode ? "bg-pastelpink text-black" : "bg-white text-pastelpink"
      }`}>
      {text}
    </button>
  )
}
