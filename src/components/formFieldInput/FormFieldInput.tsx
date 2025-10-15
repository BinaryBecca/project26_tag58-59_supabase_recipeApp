import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface FormFieldInputProps {
  type: string
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  height?: string
}

export default function FormFieldInput({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  height,
}: FormFieldInputProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`px-5 py-2 mb-4 border border-white/80 rounded-4xl ${height}
 ${isDarkMode ? "bg-pastelpink/40 text-black" : "bg-white/20 text-gray-500"}`}
    />
  )
}
