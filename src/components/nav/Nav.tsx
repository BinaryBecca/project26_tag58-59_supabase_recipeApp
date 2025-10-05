import { Link } from "react-router"
import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"
import Button from "../button/Button"

export default function Nav() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  // const handleOnClick = () => {
  //   if (isDarkMode) {
  //     activatingDarkMode()
  //   }
  // }

  return (
    <nav className="flex flex-row justify-between items-center py-8 px-10">
      <div className="flex flex-row  align-items gap-2">
        <img className="h-6 w-6 object-contain" src="/img/logo.png" alt="cupcake" />
        <p className="font-bakery text-xl">Cupcake Club</p>
      </div>

      <div className="flex flex-row gap-10 text-l font-bold">
        <Link to="/">Home</Link>
        <Link to="recipes">Rezepte</Link>
        <Link to="about">Über uns</Link>
      </div>

      <div className="flex flex-row items-center gap-2 text-l font-bold">
        <Link to="login">Login</Link>
        <Button
          className="h-8 w-8 hover:h-10 hover:w-10 cursor-pointer"
          imgSrc={isDarkMode ? "/img/dark_mode.png" : "/img/light_mode.png"}
          imgHoverSrc="/img/dark_mode.png"
          imgAlt="darkmode/lightmode button"
          imgClassName="h-8 w-8 object-contain hover:h-10 hover:w-10"
          darkMode={true}
        />
        {/* <button onClick={handleOnClick} className="h-8 w-8 hover:h-10 hover:w-10 cursor-pointer">
          <img
            className="h-8 w-8 object-contain hover:h-10 hover:w-10"
            src={isDarkMode ? "/img/dark_mode.png" : "/img/light_mode.png"}
            alt="darkmode/lightmode button"
          />
        </button> */}
      </div>
    </nav>
  )
}
