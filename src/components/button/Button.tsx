import { useNavigate } from "react-router"

// detailPage
// back/forward
// dark/light_mode

export default function Button() {
  const navigate = useNavigate()
  return (
    <button>
      {/* detailPage */}
      <img src="/img/detail-button.png" alt="cupcake" />
      <img src="/img/detail-button-clicked.png" alt="cupcake" />
      <img src="/img/detail-button-hover.png" alt="cupcake" />

      {/* back/forward */}
      <img src="/img/arrow.png" alt="arrow right" />
      <img src="/img/arrow-hover.png" alt="arrow right" />
      <img className="rotate-180" src="/img/arrow.png" alt="arrow left" />
      <img className="rotate-180" src="/img/arrow-hover.png" alt="arrow left" />

      {/* dark/light_mode */}
      <img className="rotate-180" src="/img/dark_mode.png" alt="cupcake" />
      <img className="rotate-180" src="/img/light_mode.png" alt="cupcake" />
    </button>
  )
}
