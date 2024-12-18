import { useEffect, useState, useRef } from "react";
import Tooth from "./tooth";
import Reload from "../reload/reload";

function Gears(props: any) {
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
        console.log(Math.ceil(clientWidth / getRem() / 8) * 8)
        console.log(Math.ceil(clientHeight / getRem() / 8) * 8)
        setCurrWidth(Math.ceil(clientWidth / getRem() / 8) * 8+'rem')
        setCurrHeight(Math.ceil(clientHeight / getRem() / 8) * 8+'rem')
        setUpdated(prev => prev+1)
    };

    const addTeeth = () => {
        const lst = [];
        for (let i = 0; i < (contWidth + contHeight) / 4 + 2; i++) {
            lst.push(
                <div
                    className="absolute w-16 h-16 -z-10"
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

    const dir = props.dir ? true : false;

    useEffect(() => {
        teethRefs.current.forEach((ref: any, index: any) => {
            if (ref) {
                ref.getAnimations().forEach((animation: Animation) => animation.cancel()); // Clear existing animations
                ref.animate(
                    [
                        { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(0deg) translateX(${2}rem) translateY(${-contHeight - 4}rem)`, offset: 0 },
                        { transformOrigin: `${contWidth - 4}rem ${-contHeight + 4}rem`, transform: `rotate(0deg) translateX(${contWidth - 6}rem) translateY(${-contHeight - 4}rem)`, offset: contWidth / (2 * contWidth + 2 * contHeight + 40) },
                        { transformOrigin: `${contWidth - 4}rem ${-contHeight + 4}rem`, transform: `rotate(90deg) translateX(${contWidth - 6}rem) translateY(${-contHeight - 4}rem)`, offset: (contWidth + 10) / (2 * contWidth + 2 * contHeight + 40) },
                        { transformOrigin: `${contWidth - 4}rem ${-4}rem`, transform: `rotate(90deg) translateX(${contWidth - 6}rem) translateY(${-12}rem)`, offset: (contWidth + contHeight + 10) / (2 * contWidth + 2 * contHeight + 40) },
                        { transformOrigin: `${contWidth - 4}rem ${-4}rem`, transform: `rotate(180deg) translateX(${contWidth - 6}rem) translateY(${-12}rem)`, offset: 0.5 },
                        { transformOrigin: `${4}rem ${-4}rem`, transform: `rotate(180deg) translateX(${2}rem) translateY(${-12}rem)`, offset: (2 * contWidth + contHeight + 20) / (2 * contWidth + 2 * contHeight + 40) },
                        { transformOrigin: `${4}rem ${-4}rem`, transform: `rotate(270deg) translateX(${2}rem) translateY(${-12}rem)`, offset: (2 * contWidth + contHeight + 30) / (2 * contWidth + 2 * contHeight + 40) },
                        { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(270deg) translateX(${2}rem) translateY(${-contHeight - 4}rem)`, offset: (2 * contWidth + 2 * contHeight + 30) / (2 * contWidth + 2 * contHeight + 40) },
                        { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(360deg) translateX(${2}rem) translateY(${-contHeight - 4}rem)`, offset: 1 },
                    ],
                    {
                        duration: ((contWidth + contHeight) / 4 + 2) * 1000,
                        iterations: Infinity,
                        delay: ((contWidth + contHeight) / 4 + 2) * -2000 + (dir ? 500 : 0) + index * -1000 + (dir ? -1 : 1) * ((contWidth + contHeight) / 4 + 2) * 1000 * (1.5 * contWidth + 2 * contHeight + 40) / (2 * contWidth + 2 * contHeight + 40),
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