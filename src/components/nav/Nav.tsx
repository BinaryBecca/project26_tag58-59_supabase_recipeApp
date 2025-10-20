import { NavLink, useNavigate } from "react-router"
import { useContext, useState } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"
import Button from "../button/Button"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import supabase from "../../utils/supabase"

export default function Nav() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const { isLoggedIn, setIsLoggedIn } = useContext(mainContext) as mainContextProps
  const navigate = useNavigate()

  const [openBurgerMenu, setOpenBurgerMenu] = useState(false)

  async function logOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout funktioniert nicht", error)
    }
    setIsLoggedIn(false)
    navigate("/")
  }

  return (
    <nav className="p-4 md:py-8 md:px-10 flex flex-row justify-between items-center">
      {/* Logo */}
      <div className="flex flex-row  align-items gap-2">
        <img className="h-5 w-5 md:h-6 md:w-6 object-contain" src="/img/logo.png" alt="cupcake" />
        <p className="text-sm md:text-xl font-bakery">Cupcake Club</p>
      </div>

      {/* Smartphone Menu */}
      <div className="flex flex-row items-center gap-2">
        {/* Dark-/Lightmode-button*/}
        <Button
          className="sm:hidden h-6 w-6 cursor-pointer mb-1.5 mr-2"
          imgSrc={isDarkMode ? "/img/dark_mode.png" : "/img/light_mode.png"}
          imgHoverSrc="/img/dark_mode.png"
          imgAlt="darkmode/lightmode button"
          imgClassName="h-8 w-8 object-contain "
          darkMode={true}
        />

        {/* Burgermenu */}
        <button
          className="lg:hidden md:absolute md:top-8 md:right-4 flex flex-col gap-1 md:gap-2 p-2"
          onClick={() => setOpenBurgerMenu(!openBurgerMenu)}>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full md:w-8 md:h-1 md:rounded"></div>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full md:w-8 md:h-1 md:rounded"></div>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full md:w-8 md:h-1 md:rounded"></div>
        </button>
      </div>

      {openBurgerMenu && (
        <div className="flex flex-col top-0 bg-white border border-gray-600 rounded-2xl p-5 gap-4 absolute right-0 top-15 md:top-22 z-50 font-bold">
          <NavLink to="/" onClick={() => setOpenBurgerMenu(false)}>
            Home
          </NavLink>
          <NavLink to="recipes" onClick={() => setOpenBurgerMenu(false)}>
            Rezepte
          </NavLink>
          <NavLink to="create" onClick={() => setOpenBurgerMenu(false)}>
            Rezept anlegen
          </NavLink>
          <NavLink to="favorites" onClick={() => setOpenBurgerMenu(false)} className="mb-2">
            Merkliste
          </NavLink>
          {isLoggedIn ? (
            <div className="flex flex-row gap-4 items-center md:hidden">
              <NavLink to="profile" onClick={() => setOpenBurgerMenu(false)} className="text-gray-400">
                Profil
              </NavLink>

              <button
                onClick={() => {
                  logOut()
                  setOpenBurgerMenu(false)
                }}
                className="h-8 w-8">
                <img
                  src={isDarkMode ? "/img/logout_smartphone_dark.png" : "/img/logout_smartphone_light.png"}
                  alt="logout-button"
                />
              </button>
              {/* <button onClick={logOut} className="bg-pastelpink text-white py-2 px-4 rounded-3xl cursor-pointer">
                Log Out
              </button> */}
            </div>
          ) : (
            <>
              <NavLink
                to="login"
                onClick={() => setOpenBurgerMenu(false)}
                className="bg-pastelpink text-white py-2 px-4 rounded-3xl cursor-pointer">
                Login
              </NavLink>
              <NavLink
                to="signup"
                onClick={() => setOpenBurgerMenu(false)}
                className="bg-white text-pastelpink border border-pastelpink py-2 px-4 rounded-3xl cursor-pointer">
                SignUp
              </NavLink>
            </>
          )}
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:flex-row lg:gap-10 lg:text-l lg:font-bold">
        <NavLink to="/" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Home
        </NavLink>
        <NavLink to="recipes" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Rezepte
        </NavLink>
        <NavLink to="create" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Rezept anlegen
        </NavLink>
        <NavLink to="favorites" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
          Merkliste
        </NavLink>
      </div>

      <div className="hidden sm:flex sm:flex-row sm:items-center sm:gap-2 sm:text-l sm:font-bold">
        {!isLoggedIn ? (
          <>
            <NavLink to="login" className="bg-pastelpink text-white py-2 px-4 rounded-3xl cursor-pointer">
              Login
            </NavLink>
            <NavLink
              to="signup"
              className="bg-white text-pastelpink border border-pastelpink py-2 px-4 rounded-3xl cursor-pointer">
              SignUp
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="profile" className={({ isActive }) => ` ${isActive ? "border-b text-xl" : "text-gray-400"}`}>
              Profil
            </NavLink>
            <div className="flex items-center">
              <button onClick={logOut} className="bg-pastelpink text-white py-2 px-4 rounded-3xl cursor-pointer">
                Log Out
              </button>
            </div>
          </>
        )}

        <Button
          className="h-8 w-8 cursor-pointer md:mr-8"
          imgSrc={isDarkMode ? "/img/dark_mode.png" : "/img/light_mode.png"}
          imgHoverSrc="/img/dark_mode.png"
          imgAlt="darkmode/lightmode button"
          imgClassName="h-8 w-8 object-contain "
          darkMode={true}
        />
      </div>
    </nav>
  )
}
