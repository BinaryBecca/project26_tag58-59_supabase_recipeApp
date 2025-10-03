import Header from "../components/header/Header"
import { Outlet } from "react-router"
import Footer from "../components/footer/Footer"
import { useContext } from "react"
import { darkModeContext, type DarkmodeProviderProps } from "../components/darkModeContext/DarkModeProvider"

export default function Layout() {
  const { isDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps
  return (
    <div>
      <Header />
      <main className={`${isDarkMode ? "bg-pastelpink/15" : "bg-pastelpink"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
