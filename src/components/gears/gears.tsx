import { useEffect, useState, useRef } from "react";
import Tooth from "./tooth";
import Reload from "../load/reload/reload";
import path from "path";

function Gears(props: any) {
    // Ok so just a note to any future people working on this after me, I just inherited this code from the previous guy, and touching just about anything breaks the entire website, so leave it alone it should work fine.
    const [color, setColor] = useState("#4440");
    const [teeth, setTeeth]: any[] = useState([]);
    const [set, setSet] = useState(0);
    const teethRefs: any = useRef([]); // Ref array to store references to all teeth
    const currRef: any = useRef(null);
    const [loader, setLoader] = useState(<></>)

    const getRem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

    const [contWidth, setContWidth] = useState(0);
    const [contHeight, setContHeight] = useState(0);
    const [currWidth, setCurrWidth] = useState<any>('auto')
    const [currHeight, setCurrHeight] = useState<any>('auto')

    const [updated, setUpdated] = useState(0)
    const updateDimensions = () => {
        const clientWidth = currRef.current.clientWidth;
        const clientHeight = currRef.current.clientHeight;
        setContWidth(Math.ceil(clientWidth / getRem() / 8) * 8);
        setContHeight(Math.ceil(clientHeight / getRem() / 8) * 8);
        setCurrWidth(Math.ceil(clientWidth / getRem() / 8) * 8+'rem')
        setCurrHeight(Math.ceil(clientHeight / getRem() / 8) * 8+'rem')
        setUpdated(prev => prev+1)
    };

    const addTeeth = () => {
        const lst = [];
        const cornerRad = 4; // rem
        const pathLength = 2*(contHeight+contWidth)
        const teethCount = pathLength / 8; //4rem gap

        for (let i = 0; i < teethCount; i++) {
            lst.push(
                <div
                    className="absolute w-16 h-16 -z-10 pointer-events-none"
                    key={i}
                    ref={(el) => (teethRefs.current[i] = el)} // Save the reference
                >
                    <Tooth />
                </div>
            );
        }
        setTeeth(lst);
        setSet((prev) => prev + 1);
    };

    useEffect(() => {
        if (contWidth !== 0 && contHeight !== 0) {
            addTeeth();
        }
    }, [updated]);


    const normalize = () =>{
        return -new Date().getMilliseconds();
    }

    useEffect(() => {
        
        const dir = props.dir ? true : false;
        const cornerRad = 4; // rem
        // ///Pathlength calc: 
        const cornerLength = (Math.PI*cornerRad) / 2 // arc of individual corner

        const pathLength =  2*Math.PI*cornerRad +  //Perimeter of all 4 corners = 2*pi*cornerRadius
                            2*(contHeight-2*cornerRad) + // We take the width in REM, then remove the width of the corners because they covered above
                            2*(contWidth-2*cornerRad); // same as above but for height

        const teethCount = Math.ceil(((contHeight+contWidth) / 4));

        // At this point just find a way to make it so that pathlength/teethcount is 8
        const delay = 1000
        const duration = pathLength/8 * delay
        
        // console.log(duration,pathLength,duration/pathLength)
        // console.log(pathLength, teethCount, pathLength/teethCount)

        // Now to get how much percent each element of the animation takes up the the entire animation time so that I can calculate offsets required to make this happen
        const cornerPercent = cornerLength/pathLength;
        const widthPercent = (contWidth-2*cornerRad)/pathLength;
        const heightPercent = (contHeight-2*cornerRad)/pathLength;
        
        // calculates the percentage through as a digit between 0 and 1 of each section
        const order = [widthPercent,cornerPercent,heightPercent,cornerPercent,widthPercent,cornerPercent,heightPercent]
        const offsetList:number[] = [
            0, // at start
        ];
        for (let i = 1;i<8;i++){
            offsetList.push(
                offsetList[i-1]+order[i-1]
            )
        }

        offsetList.push(1)

        

        // const pathLength = 2*(contHeight+contWidth);
        // const teethCount = pathLength / 8;
        // const delay = 1000;
        // const duration = teethCount*delay;

        


        // I need to dig into this animate function because how everything works isn't right
        // The things have different speeds on different sides
        teethRefs.current.forEach((ref: any, index: any) => {
            if (ref) {
                ref.getAnimations().forEach((animation: Animation) => animation.cancel()); // Clear existing animations
                let anim:any = ref.animate(
                    [
                        // Top left point
                        { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(0deg) translateX(${2}rem) translateY(${-contHeight - 4}rem)`,offset:0}, //loops from end
                        
                        
                        // Top right point
                        {transformOrigin: `${contWidth - 4}rem ${-contHeight + 4}rem`, transform: `rotate(0deg) translateX(${contWidth-6}rem) translateY(${-contHeight-4}rem)`,offset: offsetList[1]},
                        // Right top point
                        {transformOrigin: `${contWidth - 4}rem ${-contHeight + 4}rem`,transform: `rotate(90deg) translateX(${contWidth-6}rem) translateY(${-contHeight-4}rem)`, offset: offsetList[2]},

                        
                        //Right bottom point
                        {transformOrigin: `${contWidth - 4}rem ${-4}rem`, transform: `rotate(90deg) translateX(${contWidth-6}rem) translateY(${-12}rem)`, offset: offsetList[3]},
                        // Bottom right point
                        { transformOrigin: `${contWidth - 4}rem ${-4}rem`, transform: `rotate(180deg) translateX(${contWidth - 6}rem) translateY(${-12}rem)`, offset: offsetList[4]},


                        // Bottom left point
                        { transformOrigin: `${4}rem ${-4}rem`, transform: `rotate(180deg) translateX(${2}rem) translateY(${-12}rem)`, offset: offsetList[5]},
                        // left bottom point
                        { transformOrigin: `${4}rem ${-4}rem`, transform: `rotate(270deg) translateX(${2}rem) translateY(${-12}rem)`, offset: offsetList[6]},
                        

                        // left top point
                        { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(270deg) translateX(${2}rem) translateY(${-contHeight - 4}rem)`, offset: offsetList[7]},
                        //top left point
                        { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(360deg) translateX(${2}rem) translateY(${-contHeight - 4}rem)`, offset:1}, // this last one loops to start

                    ],
                    {
                        duration: duration,
                        iterations: Infinity,
                        delay: -delay*index,
                        direction: dir ? "reverse" : "normal",
                    }
                );
            }
        });
    }, [teeth, contWidth, contHeight, set]);
    
    var resize = 0
    var size = -
    useEffect(() => {
        setTimeout(function(){
            updateDimensions();
        }, 1000)
        setColor("#444f");
        size = window.innerWidth
        window.addEventListener("resize", function(){
            if (size!=window.innerWidth){
                setLoader(<Reload/>)
                setCurrWidth('auto')
                setCurrHeight('auto')
                let num = resize
                resize+=1
                setTimeout(function(){
                    if (resize==num+1){
                        updateDimensions()
                        resize = 0
                        setLoader(<></>)
                    }
                }, 1000);
                size = window.innerWidth
            }
        });
        document.addEventListener("visibilitychange", () => {
            updateDimensions()
        });
        window.addEventListener('focus', () => {
            updateDimensions()
        });
    }, []);

    return (
        <>
            <div
                ref={(el) => (currRef.current = el)}
                style={{
                    borderColor: color,
                    transition: "border-color 1s ease",
                    width: currWidth,
                    height: currHeight,
                }}
                className="z-50 relative bg-black box-content rounded-[4rem] border-[16px] border-solid"
            >
                <div
                    style={{
                        outlineColor: color,
                        transition: "outline-color 1s ease",
                    }}
                    className={`flex h-full w-full items-center justify-center z-50 ${props.nopad ? "" : "px-24 py-12 lg:py-16"} bg-clip-padding relative box-border rounded-[4rem] bg-black outline-[8px] outline outline-[#444]`}
                >
                    {props.children}
                </div>
                {teeth}
            </div>
            {loader}
        </>
    );
}

export default Gears;