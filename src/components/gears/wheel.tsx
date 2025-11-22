import { useEffect, useState, useRef } from "react";
import Tooth from "./tooth";
import {
    useLocation
} from "react-router-dom";

function Wheel(props: any) {
    const location = useLocation(); // resets animation on link change so that everything is nice and synced
    const [color, setColor] = useState("0");
    const [teeth, setTeeth]: any[] = useState([]);
    const [set, setSet] = useState(0);
    const teethRefs: any = useRef([]); // Ref array to store references to all teeth
    const currRef: any = useRef(null);

    const getRem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

    const [contWidth, setContWidth] = useState(0);
    const [contHeight, setContHeight] = useState(0);
    const [realWidth, setRealWidth] = useState(0);
    const [realHeight, setRealHeight] = useState(0);

    const updateDimensions = () => {
        const clientWidth = currRef.current.clientWidth;
        const clientHeight = currRef.current.clientHeight;
        setContWidth(Math.round(clientWidth / getRem()));
        setContHeight(Math.round(clientHeight / getRem()));
        setRealWidth(clientWidth / getRem());
        setRealHeight(clientHeight / getRem());
    };

    const addTeeth = () => {
        const lst = [];
        for (let i = 0; i < 6; i++) {
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
        if (realWidth !== 0 && realHeight !== 0) {
            addTeeth();
        }
    }, [realWidth, realHeight]);

    const dir = props.dir ? true : false;

    useEffect(() => {
        teethRefs.current.forEach((ref: any, index: any) => {
            if (ref) {
                ref.getAnimations().forEach((animation: Animation) => animation.cancel()); // Clear existing animations
                let anim:any = ref.animate(
                    [
                        { transformOrigin: `${4}rem ${-realHeight + 4}rem`, transform: `rotate(0deg) translateX(${2}rem) translateY(${-realHeight - 4}rem)`, offset: 0 },
                        { transformOrigin: `${4}rem ${-realHeight + 4}rem`, transform: `rotate(360deg) translateX(${2}rem) translateY(${-realHeight - 4}rem)`, offset: 1 },
                    ],
                    {
                        duration: 6 * 1000,
                        iterations: Infinity,
                        delay: (dir ? -500 : 0 ) + (index * -1000),
                        direction: dir ? "reverse" : "normal",
                    }
                );
                if (props.freeze){anim.pause();} 
            }
        });
    }, [teeth, realWidth, realHeight, contWidth, contHeight, set, location]);

    var resize = 0
    var size = 0
    useEffect(() => {
        setTimeout(function(){
            updateDimensions();
        }, 10)
        setColor("1");
        size = window.innerWidth
        window.addEventListener("resize", function(){
            if (size!=window.innerWidth){
                let num = resize
                resize+=1
                setTimeout(function(){
                    if (resize==num+1){
                        addTeeth()
                        resize = 0
                    }
                }, 10);
            }
            size = window.innerWidth
        });
        document.addEventListener("visibilitychange", () => {
            addTeeth()
        });
        window.addEventListener('focus', () => {
            addTeeth()
        });
    }, []);

    return (
        <div
            ref={(el) => (currRef.current = el)}
            style={{
                opacity: color,
                transition: "opacity 1s ease",
            }}
            className="z-50 relative bg-black box-content border-[#444] rounded-full border-[16px] border-solid"
        >
            <div
                className="overflow-hidden z-50 bg-clip-padding relative outline-[#444] box-border rounded-full bg-black outline-[8px] outline outline-[#444] w-32 h-32 flex items-center justify-center"
            >
                {props.children}
            </div>
            {teeth}
        </div>
    );
}

export default Wheel;