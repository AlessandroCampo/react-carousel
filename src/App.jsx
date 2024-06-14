import pokemonArray from "./Data";
import Carousel from "./components/Carousel/Carousel";

const app = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full bg-[#121212]">
        <Carousel elements={pokemonArray} ></Carousel>
      </div>

    </>
  )
}

export default app;