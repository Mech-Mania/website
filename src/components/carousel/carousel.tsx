import { useEffect, useState, useRef } from "react";
function Carousel(props: any) {
    const filePaths = [
        "/carousel/1.jpg",
        "/carousel/3.jpg",
        "/carousel/5.jpg",
        "/carousel/6.jpg",
        "/carousel/7.jpg",
        "/carousel/9.jpg",
        "/carousel/11.jpg",
    ]
    const [images, setImages] = useState<any>([])
    const currRef: any = useRef(null);

    const addImages = () => {
        const lst = [];
        for (let i = 0; i < filePaths.length; i++) {
            lst.push(
                <img
                    className="h-[281px] w-[374.5px]"
                    key={i}
                    src={filePaths[i]}
                ></img>
            );
        }
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
                duration: 30000,
                iterations: Infinity,
                direction: dir ? "reverse" : "normal",
            }
        );
    }, [])
    
    return (
        <>
            <div className="flex flex-row" ref={(el) => (currRef.current = el)}>
                {images}
                {images}
                {images}
            </div>
        </>
    );
}

export default Carousel;