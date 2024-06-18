import { BsFillArrowLeftCircleFill as ArrowLeft, BsFillArrowRightCircleFill as ArrowRight, BsDot as Bullet, BsPauseCircleFill as Pause, BsPlayCircleFill as Play } from "react-icons/bs";
import './Carousel.scss'
import { useState, useEffect } from "react";
import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);

//NOTE - MAKE SURE EVERTY ELEMENT NAME IS UNIQUE

export default ({ elements }) => {

    const [active, setActive] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const [autoPlay, setAutoPlay] = useState(null)

    const startAutoplay = () => {
        setAutoplayEnabled(true);
    };

    const stopAutoplay = () => {
        setAutoplayEnabled(false);
    };


    const swipe = (direction) => {
        const wrapper = document.querySelector('.wrapper');
        if (isSwiping) return
        console.log('swiping')
        setIsSwiping(b => b = true);
        let offset = direction === 'right' ? 1 : -1;
        let newValue = active + offset;
        //can accept numbers or strings
        if (!isNaN(direction)) {
            newValue = direction
        }
        if (newValue >= elements.length) {
            newValue = 0;
        } else if (newValue < 0) {
            newValue = elements.length - 1;
        }
        setActive(a => a = newValue);
        gsap.to(wrapper, {
            scrollTo: `#${elements[newValue].Name}`,
            duration: 0.75,
            ease: 'power2.out',
            onComplete: () => {
                setIsSwiping(b => b = false);
            }
        });
    }


    // useEffect(() => {
    //     let id;
    //     if (autoplayEnabled) {
    //         let count = 0;
    //         id = setInterval(() => {
    //             count++;
    //             if (count > elements.length) {
    //                 count = 1
    //             }
    //             swipe(count);
    //         }, 2000);
    //         setAutoPlay(id);
    //     } else {
    //         clearInterval(autoPlay); // Clear the interval when autoplay is disabled
    //     }

    //     // Clean up the setInterval when the component unmounts
    //     return () => clearInterval(id); // Use id here instead of autoPlay
    // }, [autoplayEnabled]);




    return (
        <>
            <div className="carousel-group relative">
                <ArrowLeft className="icon  top-1/2 left-[-50px]" onClick={() => swipe('left')}></ArrowLeft>
                {
                    autoplayEnabled ?
                        <Pause className=" top-10 right-10 icon z-20" onClick={stopAutoplay}></Pause> :
                        <Play className=" top-10 right-10 icon z-20" onClick={startAutoplay}></Play>

                }

                <div className="wrapper aspect-video h-[500px] flex overflow-x-scroll rounded-3xl relative" >
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
                <ArrowRight className="icon  top-1/2 right-[-50px]" onClick={() => swipe('right')}></ArrowRight>
            </div>


        </>
    )
};