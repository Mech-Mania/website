import { useEffect, useState, useRef } from "react";
import Tooth from "./tooth";
import Reload from "../reload/reload";

function Line(props: any) {
    // Ok so just a note to any future people working on this after me, I just inherited this code from the previous guy, and touching just about anything breaks the entire website, so leave it alone it should work fine.
    const [color, setColor] = useState("#4440");
    const [teeth, setTeeth]: any[] = useState([]);
    const [set, setSet] = useState(0);
    const teethRefs: any = useRef([]); // Ref array to store references to all teeth
    const currRef: any = useRef(null);
    const [loader, setLoader] = useState(<></>)

    const getRem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

    const [contWidth, setContWidth] = useState(0);

    const [updated, setUpdated] = useState(0)
    const updateDimensions = () => {
        const clientWidth = currRef.current.clientWidth;
        setContWidth(Math.ceil(clientWidth / getRem() / 8) * 8);
        setUpdated(prev => prev+1)
    };

    const addTeeth = () => {
        const lst = [];
        for (let i = 0; i < (contWidth) / 8 + 2; i++) {
            lst.push(
                <div
                    className="rotate-180 absolute w-16 h-16 -z-10 pointer-events-none"
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
        if (contWidth !== 0) {
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
                        { transformOrigin: ``, transform: `rotate(180deg) translateX(${-contWidth}rem)`, offset: 0 },
                    ],
                    {
                        duration: ((contWidth) / 8 + 2) * 1000,
                        iterations: Infinity,
                        delay: ((contWidth) / 4 + 2) * -2000 + (dir ? 500 : 0) + index * -1000 + (dir ? -1 : 1) * ((contWidth) / 4 + 2) * 1000 * (1.5 * contWidth) / (2 * contWidth),
                        direction: dir ? "reverse" : "normal",
                    }
                );
            }
        });
    }, [teeth, contWidth, set]);

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
                }}
                className="z-50 relative bg-black box-content border-[16px] border-solid w-full"
            >

                {teeth}
            </div>
            {loader}
        </>
    );
}

export default Line;