import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface FormFieldSelectProps {
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  placeholder?: string
  options: { label: string; value: string }[]
}

export default function FormFieldSelect({
  name,
  value,
  onChange,
  required,
  options,
  placeholder,
}: FormFieldSelectProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`px-5 py-3 mb-4 border border-white/80 rounded-4xl 
      ${isDarkMode ? "bg-pastelpink/40 text-black" : "bg-white/20 text-gray-500"}`}>
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
