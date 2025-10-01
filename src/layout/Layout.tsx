import Header from "../components/header/Header"
import { Outlet } from "react-router"
import Footer from "../components/footer/Footer"

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
