import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface FormFieldTextareaProps {
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
}

export default function FormFieldTextarea({
  name,
  value,
  onChange,
  placeholder,
  required,
  rows,
}: FormFieldTextareaProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`px-5 py-2 mb-4 border border-white/80 rounded-4xl resize-none 
      ${isDarkMode ? "bg-pastelpink/40 text-black" : "bg-white/20 text-gray-500"}`}></textarea>
  )
}
