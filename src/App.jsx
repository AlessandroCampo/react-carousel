import pokemonArray from "./Data";

const app = () => {
  return (
    <>
      {
        pokemonArray.map(p => {
          return <img src={p.Image}></img>
        })
      }
    </>
  )
}

export default app;