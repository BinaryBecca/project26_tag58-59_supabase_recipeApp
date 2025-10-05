import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider.tsx"

// dark/light_mode
// detailPage
// back/forward

interface ButtonProps {
  navigateTo?: string | number
  className?: string
  imgSrc: string
  imgHoverSrc?: string
  imgAlt: string
  imgClassName: string
  darkMode?: boolean
}

export default function Button({
  navigateTo,
  className,
  imgSrc,
  imgHoverSrc,
  imgAlt,
  imgClassName,
  darkMode,
}: ButtonProps) {
  const { activatingDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  const navigate = useNavigate()
  const [isHovered, setisHovered] = useState(false)

  const handleOnClick = () => {
    if (darkMode) {
      activatingDarkMode()
    }

    if (typeof navigateTo === "string") {
      navigate(navigateTo)
    } else if (typeof navigateTo === "number") {
      navigate(navigateTo)
    }
  }

  return (
    <button
      className={className}
      onClick={handleOnClick}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}>
      <img src={isHovered && imgHoverSrc ? imgHoverSrc : imgSrc} alt={imgAlt} className={imgClassName} />
    </button>

    //   {/* dark/light_mode */}
    //   <img src="/img/dark_mode.png" alt="cupcake" />
    //   <img src="/img/light_mode.png" alt="cupcake" />

    //   {/* detailPage */}
    //   <img src="/img/detail-button_dark.png" alt="cupcake" />
    //   <img src="/img/detail-button_light.png" alt="cupcake" /> */}

    //   <img src="/img/detail-button-clicked.png" alt="cupcake" />

    //   {/* back/forward */}
    //   <img src="/img/arrow.png" alt="arrow right" />
    //   <img src="/img/arrow-hover.png" alt="arrow right" />

    //   <img className="rotate-180" src="/img/arrow.png" alt="arrow left" />
    //   <img className="rotate-180" src="/img/arrow-hover.png" alt="arrow left" />
  )
}
