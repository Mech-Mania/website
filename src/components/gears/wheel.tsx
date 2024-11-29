import { useEffect, useState, useRef } from "react";
import Tooth from "./tooth";

function Wheel(props: any) {
    const [teeth, setTeeth]:any[] = useState([]);
    const teethRefs:any = useRef([]); // Ref array to store references to all teeth

    const currWidth =  (props.width)

    const addTeeth = () => {

        const lst = [];
        for (let i = 0; i<currWidth/4+props.height/4-2; i++) {
            lst.push(
                <div
                    className="absolute w-16 h-16"
                    key={i}
                    ref={(el) => (teethRefs.current[i] = el)} // Save the reference
                >
                    <Tooth />
                </div>
            );
        }
        setTeeth(lst);
    };

    useEffect(() => {
        addTeeth();
    }, []);

    useEffect(() => {
        teethRefs.current.forEach((ref:any, index:any) => {
            if (ref) {
                ref.animate(
                    [
                        { transformOrigin: `-${currWidth/2-4}rem -${props.height/2}rem`, transform: `rotate(0deg) translateX(-${currWidth/2-2}rem) translateY(-${props.height/2+2}rem)`, offset: 0 },
                        { transformOrigin: `${currWidth/2}rem -${props.height/2}rem`, transform: `rotate(0deg) translateX(${currWidth/2-2}rem) translateY(-${props.height/2+2}rem)`, offset: (currWidth/4-2)/(currWidth/2+props.height/2-4) },
                        { transformOrigin: `${currWidth/2+4}rem -${props.height/2-4}rem`, transform: `rotate(90deg) translateX(${currWidth/2+2}rem) translateY(-${props.height/2-2}rem)`, offset: (currWidth/4-1)/(currWidth/2+props.height/2-4) },
                        { transformOrigin: `${currWidth/2+4}rem ${props.height/2}rem`, transform: `rotate(90deg) translateX(${currWidth/2+2}rem) translateY(${props.height/2-2}rem)`, offset: (currWidth/4+props.height/4-3)/(currWidth/2+props.height/2-4) },
                        { transformOrigin: `${currWidth/2}rem ${props.height/2+4}rem`, transform: `rotate(180deg) translateX(${currWidth/2-2}rem) translateY(${props.height/2+2}rem)`, offset: 0.5 },
                        { transformOrigin: `-${currWidth/2-4}rem ${props.height/2+4}rem`, transform: `rotate(180deg) translateX(-${currWidth/2-2}rem) translateY(${props.height/2+2}rem)`, offset: (currWidth/2+props.height/4-4)/(currWidth/2+props.height/2-4) },
                        { transformOrigin: `-${currWidth/2}rem ${props.height/2}rem`, transform: `rotate(270deg) translateX(-${currWidth/2+2}rem) translateY(${props.height/2-2}rem)`, offset: (currWidth/2+props.height/4-3)/(currWidth/2+props.height/2-4) },
                        { transformOrigin: `-${currWidth/2}rem -${props.height/2-4}rem`, transform: `rotate(270deg) translateX(-${currWidth/2+2}rem) translateY(-${props.height/2-2}rem)`, offset: (currWidth/2+props.height/2-5)/(currWidth/2+props.height/2-4) },
                        { transformOrigin: `-${currWidth/2-4}rem -${props.height/2}rem`, transform: `rotate(360deg) translateX(-${currWidth/2-2}rem) translateY(-${props.height/2+2}rem)`, offset: 1 },
                        
                    ], // Animation keyframes
                    {
                        duration: (currWidth/4+props.height/4-2)*2000/3, // Duration in ms
                        iterations: Infinity, // Infinite looping
                        delay: index * -2000/3,
                    }
                );
            }
        });
    }, [teeth]); // Trigger animation when teeth are set

    return (
        <>
            {teeth}
            <div style={{ width: currWidth + "rem", height: props.height + "rem" }} className="bg-black box-content z-10 rounded-[2.5rem]">
                {props.children}
            </div>
        </>
    );
}

export default Wheel;
