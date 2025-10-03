import { useLocation } from "react-router"
import Nav from "../nav/Nav"
import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

export default function Header() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const location = useLocation()
  const detailPage = location.pathname.startsWith("/details")

  return (
    <header className={`font-quicksand text-xl ${isDarkMode ? "bg-pastelblue/20" : "bg-pastelblue"}`}>
      <Nav />

      {!detailPage && (
        <div className="bg-[url('/img/hero-img.png')] relative bg-cover bg-center w-full px-20 py-30">
          <p className="relative text-white/90 text-5xl z-20 text-center">
            Entdecke himmlische Cupcake-Rezepte – und teile deine eigenen Kreationen mit der Community.
          </p>
          <div className="absolute inset-0 bg-black/45 z-10"></div>
        </div>
      )}
    </header>
  )
}
