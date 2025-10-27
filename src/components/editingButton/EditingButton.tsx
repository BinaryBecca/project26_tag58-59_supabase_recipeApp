import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

interface EditingButtonProps {
  onClick: () => void
}

export default function EditingButton({ onClick }: EditingButtonProps) {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <button className="pl-5 cursor-pointer" type="button" onClick={onClick}>
      <img
        className="h-8 w-8 object-contain"
        src={`${isDarkMode ? "/img/pen_light.png" : "/img/pen_dark.png"}`}
        alt="pen-icon"
      />
    </button>
  )
}
