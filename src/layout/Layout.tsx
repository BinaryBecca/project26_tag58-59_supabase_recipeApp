import Header from "../components/header/Header"
import { Outlet } from "react-router"
import Footer from "../components/footer/Footer"

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="bg-pastelyellow/20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
