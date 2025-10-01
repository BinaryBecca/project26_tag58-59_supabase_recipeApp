import Nav from "../nav/Nav"

export default function Header() {
  return (
    <>
      <Nav />
      <div className="relative bg-[url('/img/hero-img.png')] bg-cover bg-center h-1/2 w-full p-20">
        <p className="relative text-white text-4xl z-20 text-center">
          Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch.
        </p>
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      </div>
    </>
  )
}
