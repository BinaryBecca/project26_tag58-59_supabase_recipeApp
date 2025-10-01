import { Link } from "react-router"

export default function Nav() {
  return (
    <nav className="flex flex-row justify-between align-items p-5">
      <div className="flex flex-row  align-items gap-2">
        <img className="h-6" src="/img/logo.png" alt="coffee cup" />
        <p>Die Rezeptwelt</p>
      </div>
      <div className="flex flex-row gap-5">
        <Link to="/">Home</Link>
        <Link to="recipes">Rezepte</Link>
        <Link to="about">Über uns</Link>
      </div>

      <div>
        <Link to="login">Login</Link>
      </div>
    </nav>
  )
}
