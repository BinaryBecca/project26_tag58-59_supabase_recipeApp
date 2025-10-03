import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { darkModeContext, type DarkmodeProviderProps } from "../darkModeContext/DarkModeProvider.tsx"

// detailPage
// back/forward
// dark/light_mode

interface ButtonProps {
  navigateTo?: string | number
  className?: string
  imgSrc: string
  imgHoverSrc?: string
  imgDarkSrc?: string
  imgAlt: string
  imgClassName: string
  darkMode?: boolean
}

export default function Button({
  navigateTo,
  className,
  imgSrc,
  imgHoverSrc,
  imgDarkSrc,
  imgAlt,
  imgClassName,
  darkMode,
}: ButtonProps) {
  const { isDarkMode, activatingDarkMode } = useContext(darkModeContext) as DarkmodeProviderProps

  const navigate = useNavigate()
  const [isHOvered, setisHovered] = useState(false)
  // const [isDarkMode, setIsDarkMode] = useState(false)

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

  const funcDifferentImgSrc = () => {
    if (darkMode) {
      return isDarkMode ? imgDarkSrc : imgSrc
    }
    if (isHOvered) {
      return imgHoverSrc
    }
    return imgSrc
  }

  return (
    <button
      className={className}
      onClick={handleOnClick}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}>
      <img src={funcDifferentImgSrc()} alt={imgAlt} className={imgClassName} />
    </button>

    //   {/* detailPage */}
    //   <img src="/img/detail-button.png" alt="cupcake" />
    //   <img src="/img/detail-button-hover.png" alt="cupcake" />

    //   <img src="/img/detail-button-clicked.png" alt="cupcake" />

    //   {/* back/forward */}
    //   <img src="/img/arrow.png" alt="arrow right" />
    //   <img src="/img/arrow-hover.png" alt="arrow right" />

    //   <img className="rotate-180" src="/img/arrow.png" alt="arrow left" />
    //   <img className="rotate-180" src="/img/arrow-hover.png" alt="arrow left" />

    //   {/* dark/light_mode */}
    //   <img src="/img/dark_mode.png" alt="cupcake" />
    //   <img src="/img/light_mode.png" alt="cupcake" />
  )
}
