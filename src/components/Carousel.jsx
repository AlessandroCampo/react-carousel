export default ({ elements }) => {
    return (
        <>
            {elements.map(el => {
                return <img src={el.Image} alt="img" />
            })}
        </>
    )
};