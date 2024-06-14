import { BsFillArrowLeftCircleFill as ArrowLeft, BsFillArrowRightCircleFill as ArrowRight, BsDot as Bullet } from "react-icons/bs";
import './Carousel.scss'
import { useState } from "react";
import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);



export default ({ elements }) => {

    const [active, setActive] = useState(0);

    const swipe = (direction) => {
        const wrapper = document.querySelector('.wrapper');
        let offset = direction === 'right' ? 1 : -1;
        let newValue = active + offset;
        if (!isNaN(direction)) {
            newValue = direction
        }
        if (newValue >= elements.length) {
            newValue = 0;
        } else if (newValue < 0) {
            newValue = elements.length - 1;
        }
        setActive(newValue);
        gsap.to(wrapper, {
            scrollTo: `#${elements[newValue].Name}`,
            duration: 0.75,
            ease: 'power2.out'
        });
    }

    return (
        <>
            <div className="carousel-group relative">
                <ArrowLeft className="arrow left-[-50px]" onClick={() => swipe('left')}></ArrowLeft>
                <div className="wrapper aspect-video h-[500px] flex overflow-x-scroll rounded-3xl" >
                    {elements.map(el => (
                        <figure
                            key={el.Name}
                            className="h-full aspect-video bg-cover bg-center flex items-end"
                            style={{ backgroundImage: `url(${el.Image})` }}
                            id={el.Name}
                        >
                            <div className="text-content flex flex-col gap-3 items-center  p-4 bg-black bg-opacity-80 text-white w-full">
                                <h2 className="text-2xl font-bold">{el.Name}</h2>
                                <p className="font-semibold text-lg italic">{el.description}</p>
                            </div>
                        </figure>
                    ))}
                </div>
                <div className="bullets-container flex justify-center mt-4 text-4xl">
                    {elements.map((el, index) => {
                        return <Bullet
                            key={`bullet${index}`}
                            className={`cursor-pointer ${index === active ? 'text-white' : 'text-gray-600'}`}
                            onClick={() => { swipe(index) }}
                        >

                        </Bullet>
                    })}
                </div>
                <ArrowRight className="arrow right-[-50px]" onClick={() => swipe('right')}></ArrowRight>
            </div>


        </>
    )
};