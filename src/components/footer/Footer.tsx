import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

export default function Footer() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  return (
    <footer
      className={`flex flex-row justify-between items-center py-6 sm:py-10 px-5 sm:px-20 font-quicksand text-xl ${
        isDarkMode ? "bg-pastelblue/20" : "bg-pastelblue"
      }`}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-3 sm:gap-5">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img className="h-5 w-5 sm:h-6 sm:w-6 object-contain" src="/img/youtube.png" alt="YouTube Logo" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img className="h-5 w-5 sm:h-6 sm:w-6 object-contain" src="/img/twitter.png" alt="Twitter Logo" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img className="h-5 w-5 sm:h-6 sm:w-6 object-contain" src="/img/instagram.png" alt="Instagram Logo" />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <img className="h-5 w-5 sm:h-6 sm:w-6 object-contain" src="/img/pinterest.png" alt="Pinterest Logo" />
          </a>
        </div>
      </div>
      <div className="flex flex-row  align-items gap-2">
        <img className="h-5 w-5 sm:h-6 sm:w-6 object-contain" src="/img/logo.png" alt="cupcake" />
        <p className="font-bakery text-sm sm:text-xl">Cupcake Club</p>
      </div>
    </footer>
  )
}
