import { useEffect, useState, useRef } from "react";
import Tooth from "./tooth";

function Gears(props: any) {
    const [color, setColor] = useState('#4440')
    const [teeth, setTeeth]:any[] = useState([]);
    const teethRefs:any = useRef([]); // Ref array to store references to all teeth
    const currRef:any = useRef(null);

    const getRem = () => {
      return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    const [contWidth, setContWidth] = useState(0)
    const [contHeight, setContHeight] = useState(0)

    const [realWidth, setRealWidth] = useState(0)
    const [realHeight, setRealHeight] = useState(0)

    const addTeeth = () => {
        const lst = [];
        for (let i = 0; i<Math.round((realWidth/3+realHeight/3)/2)*2+2; i++) {
            lst.push(
                <div
                    className="absolute w-16 h-16 -z-10 animate-fade-in"
                    key={i}
                    ref={(el) => (teethRefs.current[i] = el)} // Save the reference
                    onClick={()=>{console.log(i)}}
                >
                    <Tooth />
                </div>
            );
        }
        setTeeth(lst);
    };

    useEffect(()=>{
        if (realWidth!=0 && realHeight!=0){
            addTeeth()
        }
    }, [realWidth, realHeight])

    var dir = false
    if (props.dir){
        dir = true
    }

    useEffect(() => {
        console.log(realHeight, realWidth)
        teethRefs.current.forEach((ref:any, index:any) => {
            if (ref) {
                ref.animate(
                    [
                        { transformOrigin: `${4}rem ${-realHeight+4}rem`, transform: `rotate(0deg) translateX(${2}rem) translateY(${-realHeight-4}rem)`, offset: 0 },
                        { transformOrigin: `${realWidth-4}rem ${-realHeight+4}rem`, transform: `rotate(0deg) translateX(${realWidth-6}rem) translateY(${-realHeight-4}rem)`, offset: (contWidth)/(2*contWidth+2*contHeight+40) },
                        { transformOrigin: `${realWidth-4}rem ${-realHeight+4}rem`, transform: `rotate(90deg) translateX(${realWidth-6}rem) translateY(${-realHeight-4}rem)`, offset: (contWidth+10)/(2*contWidth+2*contHeight+40) },
                        { transformOrigin: `${realWidth-4}rem ${-4}rem`, transform: `rotate(90deg) translateX(${realWidth-6}rem) translateY(${-12}rem)`, offset: (contWidth+contHeight+10)/(2*contWidth+2*contHeight+40) },
                        { transformOrigin: `${realWidth-4}rem ${-4}rem`, transform: `rotate(180deg) translateX(${realWidth-6}rem) translateY(${-12}rem)`, offset: 0.5 },
                        { transformOrigin: `${4}rem ${-4}rem`, transform: `rotate(180deg) translateX(${2}rem) translateY(${-12}rem)`, offset: (2*contWidth+contHeight+20)/(2*contWidth+2*contHeight+40) },
                        { transformOrigin: `${4}rem ${-4}rem`, transform: `rotate(270deg) translateX(${2}rem) translateY(${-12}rem)`, offset: (2*contWidth+contHeight+30)/(2*contWidth+2*contHeight+40) },
                        { transformOrigin: `${4}rem ${-realHeight+4}rem`, transform: `rotate(270deg) translateX(${2}rem) translateY(${-realHeight-4}rem)`, offset: (2*contWidth+2*contHeight+30)/(2*contWidth+2*contHeight+40) },
                        { transformOrigin: `${4}rem ${-realHeight+4}rem`, transform: `rotate(360deg) translateX(${2}rem) translateY(${-realHeight-4}rem)`, offset: 1 },
                        
                    ], // Animation keyframes
                    {
                        duration: (Math.round((realWidth/3+realHeight/3)/2)*2+2)*1000, // Duration in ms
                        iterations: Infinity, // Infinite looping
                        delay: index * -1000 + (dir ? -250 : 0) - (Math.round((realWidth/3+realHeight/3)/2)*2+2)*1000*(1.5*contWidth+2*contHeight+40)/(2*contWidth+2*contHeight+40),
                        direction: dir ? "reverse" : "normal",
                    }
                );
            }
        });
    }, [teeth]); // Trigger animation when teeth are set

    window.onresize = function(){
        setContWidth(Math.round(currRef.current.clientWidth/getRem()))
        setContHeight(Math.round(currRef.current.clientHeight/getRem()))
        setRealWidth(currRef.current.clientWidth/getRem())
        setRealHeight(currRef.current.clientHeight/getRem())
    }

    return (
        <>
            <div onLoad={()=>{
                setTimeout(function(){
                    setContWidth(Math.round(currRef.current.clientWidth/getRem()))
                    setContHeight(Math.round(currRef.current.clientHeight/getRem()))
                    setRealWidth(currRef.current.clientWidth/getRem())
                    setRealHeight(currRef.current.clientHeight/getRem())
                    setColor('#444f')
                }, 3000)
            }} ref={(el) => 
                currRef.current = el
            } style = {{
                borderColor: color,
                transition: "border-color 1s ease",
            }} className="z-50 relative bg-black box-content rounded-[4rem] border-[16px] border-solid">
                <div style = {{
                    outlineColor: color,
                    transition: "outline-color 1s ease",
                }} className="z-50 bg-clip-padding relative box-border rounded-[4rem] bg-black outline-[8px] outline outline-[#444] p-16">
                    {props.children}
                </div>
                {teeth}
            </div>
        </>
    );
}

export default Gears;