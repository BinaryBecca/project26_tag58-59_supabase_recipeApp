import { Link } from "react-router"

export default function Nav() {
  return (
    <nav className="flex flex-row justify-between px-20 py-5">
      <Link to="/">Home</Link>
      <Link to="recipes">Rezepte</Link>
      <Link to="about">Über uns</Link>
    </nav>
  )
}
