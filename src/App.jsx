import pokemonArray from "./Data";
import Carousel from "./components/Carousel";

const app = () => {
  return (
    <>
      <Carousel elements={pokemonArray}></Carousel>
    </>
  )
}

export default app;