import { useLocation } from "react-router"
import Nav from "../nav/Nav"
import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider"

export default function Header() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  const location = useLocation()

  // prüfen, ob auf Detailseite (Achtung path variiert!)
  const detailPage = location.pathname.startsWith("/details")
  // Routen, bei denen kein hero-img angzeigt werden soll
  const pagesWithoutHeroImg = ["/signup", "/login", "/profile", "/create", "/user_recipes"]

  // falls detailpage/pagesWithoutHeroImg => hidingHeroImg true
  const hidingHeroImg = detailPage || pagesWithoutHeroImg.includes(location.pathname)

  return (
    <header className={`font-quicksand text-xl ${isDarkMode ? "bg-pastelblue/20" : "bg-pastelblue"}`}>
      <Nav />

      {!hidingHeroImg && (
        <div className="bg-[url('/img/hero-img.png')] relative bg-cover bg-center w-full px-10 py-20 sm:px-20 sm:py-30">
          <p className="relative text-white/90 text-center z-20 text-3xl md:text-5xl">
            <span className="block sm:hidden">Cupcake-Rezepte entdecken & teilen.</span>
            <span className="hidden sm:block">
              Entdecke himmlische Cupcake-Rezepte – und teile deine eigenen Kreationen mit der Community.
            </span>
          </p>
          <div className="absolute inset-0 bg-black/45 z-10"></div>
        </div>
      )}
    </header>
  )
}
