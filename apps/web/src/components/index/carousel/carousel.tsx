import { useEffect, useState, useRef } from "react";

const filePaths = [
    "jpg", //Img 1
    "jpg", //Img 2
    "jpg", //Img 3
    "jpg", //Img 4
    "jpg", //Img 5
    "jpg", //Img 6
    "jpg", //Img 7
    "png", //Img 8
    "png", //Img 9
    "png", //Img 10
    "png", //Img 11
    "jpg", //Img 12
    "jpg", //Img 13
    "jpg", //Img 14
    "jpg", //Img 15
    "jpg", //Img 16
    "jpg", //Img 17
    "jpg", //Img 18
    "jpg", //Img 19
    "jpg", //Img 20
    "jpg", //Img 21
    "jpg", //Img 22
    "jpg", //Img 23
]          
function Carousel(props: any) { 
    
    const [images, setImages] = useState<any>([])
    const currRef: any = useRef(null);

    const addImages = () => {
        const lst = [];
        for (let i = 1; i <= filePaths.length; i++) {
            lst.push(
                <img
                    className="h-[281px]"
                    key={i}
                    id={`carousel-image-${i}`}
                    src={`/carousel/${i}.${filePaths[i-1]}`}
                ></img>
            );
        }
        // Shuffle list
        lst .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        
        //Apply elements
        setImages(lst);
    };

    const dir = props.dir ? true : false;
    useEffect(()=>{
        addImages()
        currRef.current.getAnimations().forEach((animation: Animation) => animation.cancel()); // Clear existing animations
        currRef.current.animate(
            [
                { transform: `translateX(0)`, offset: 0 },
                { transform: `translateX(-${374.5*filePaths.length}px)`, offset: 1 },
            ],
            {
                duration: 2727*filePaths.length,
                iterations: Infinity,
                direction: dir ? "reverse" : "normal",
            }
        );
    }, [])
    
    return (
        <>
            <div className="flex flex-row" ref={currRef}>
                {images}
                {images}
                {images}
            </div>
        </>
    );
}

export default Carousel;
