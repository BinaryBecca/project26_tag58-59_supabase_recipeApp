import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface FormFieldWrapperProps {
  title: string
  children: React.ReactNode
}

export default function FormFieldWrapper({ title, children }: FormFieldWrapperProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div
        className={`border rounded-2xl py-5 px-10 ${
          isDarkMode ? "bg-white/20 border-gray-700/80" : "bg-pastelpink/40 border-white/80"
        }`}>
        <h2
          className={`text-center font-quicksand font-bold text-3xl px-5 ${
            isDarkMode ? "text-gray-700" : "text-white/80"
          }`}>
          {title}
        </h2>

        {children}
      </div>
    </div>
  )
}
