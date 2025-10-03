export default function Footer() {
  return (
    <footer className="flex flex-row justify-between items-center py-10 px-20 bg-pastelblue/20 font-quicksand text-xl">
      <div className="flex flex-col gap-5">
        <p>Social Media</p>
        <div className="flex flex-row gap-5">
          <img className="h-6 w-6 object-contain" src="/img/youtube.png" alt="youtube logo" />
          <img className="h-6 w-6 object-contain" src="/img/twitter.png" alt="twitter logo" />
          <img className="h-6 w-6 object-contain" src="/img/instagram.png" alt="instagram logo" />
          <img className="h-6 w-6 object-contain" src="/img/pinterest.png" alt="pinterest logo" />
        </div>
      </div>
      <div className="flex flex-row  align-items gap-2">
        <img className="h-8 w-8 object-contain" src="/img/logo.png" alt="cupcake" />
        <p className="font-bakery text-2xl">Cupcake World</p>
      </div>
    </footer>
  )
}
