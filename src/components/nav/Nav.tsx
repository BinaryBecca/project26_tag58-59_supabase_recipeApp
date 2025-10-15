import { Link, NavLink, useNavigate } from "react-router"
import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"
import Button from "../button/Button"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import supabase from "../../utils/supabase"

export default function Nav() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const { isLoggedIn, setIsLoggedIn } = useContext(mainContext) as mainContextProps
  const navigate = useNavigate()

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout funktioniert nicht", error)
    }
    setIsLoggedIn(false)
    navigate("/")
  }

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
        <NavLink to="/" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Home
        </NavLink>
        <NavLink to="recipes" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Rezepte
        </NavLink>
        <NavLink to="about" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Über uns
        </NavLink>
        <NavLink to="create" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Neues Cupcake-Rezept erstellen
        </NavLink>
      </div>

      <div className="flex flex-row items-center gap-2 text-l font-bold">
        <NavLink to="profile" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Profil
        </NavLink>

        {!isLoggedIn ? (
          <>
            <NavLink to="login" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
              Login
            </NavLink>
            <NavLink to="signup" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
              SignUp
            </NavLink>
          </>
        ) : (
          <div className="flex items-center">
            <button onClick={logOut} className="bg-pastelpink text-white py-2 px-4 rounded-3xl cursor-pointer">
              Log Out
            </button>
          </div>
        )}

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
