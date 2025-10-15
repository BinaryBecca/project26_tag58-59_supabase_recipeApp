import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface FormButtonProps {
  text: string
}

export default function FormButton({ text }: FormButtonProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <button
      className={`p-2 mb-4 border border-white/80 rounded-4xl text-xl cursor-pointer ${
        isDarkMode ? "bg-pastelpink text-black" : "bg-white text-pastelpink"
      }`}>
      {text}
    </button>
  )
}
