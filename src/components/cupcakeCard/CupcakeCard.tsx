import type { IRecipe } from "../../interfaces/IRecipe"
import Button from "../button/Button"
import "./CupcakeCard.css"

interface CupcakeCardProps {
  recipe: IRecipe
}

export default function CupcakeCard({ recipe }: CupcakeCardProps) {
  return (
    <div className="box-canvas">
      <div className="wrapper">
        <div className="card-content">
          <div className="flex flex-col items-center p-2">
            <div className="p-5 text-center">
              <h2 className="font-bold text-2xl">{recipe.name}</h2>
              <p className="text-sm text-center mt-2">{recipe.description}</p>
            </div>

            <Button
              navigateTo={`/details/${recipe.id}`}
              className="h-10 w-10"
              imgSrc="/img/detail-button_dark.png"
              imgHoverSrc="/img/detail-button_light.png"
              imgAlt="cupcake"
              imgClassName="h-10 w-10 object-contain cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="toppings-wrap">
        <img
          className="toppings-bg"
          src={recipe.image_url}
          alt={recipe.name}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = "/img/placeholder-img.png"
          }}
        />
        <div className="topping" />
        <div className="topping-middle" />
        <div className="topping-top" />
      </div>

      {/* <div className="cherry"></div> */}
    </div>
  )
}
