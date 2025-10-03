import { useLocation } from "react-router"
import Nav from "../nav/Nav"

export default function Header() {
  const location = useLocation()
  const detailPage = location.pathname.startsWith("/details")

  return (
    <header className="bg-pastelblue/20 font-quicksand text-xl">
      <Nav />

      {!detailPage && (
        <div className="relative bg-[url('/img/hero-img.png')] bg-cover bg-center h-1/2 w-full px-20 py-25">
          <p className="relative text-white/90 text-5xl z-20 text-center">
            Entdecke himmlische Cupcake-Rezepte – und teile deine eigenen Kreationen mit der Community.
          </p>
          <div className="absolute inset-0 bg-black/45 z-10"></div>
        </div>
      )}
    </header>
  )
}
