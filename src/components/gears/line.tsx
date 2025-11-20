import { useEffect, useState, useRef } from "react";
import Tooth from "./tooth";

function Line(props: {dir?:any, nopad?:any, down?:any, freeze?:any}) {
    // I've tried for so long to understand what the hell is happening here. I made some progress on reverse engineering it but honestly it's probably a waste of time.
    // I've put some line comments around to hopefully help anyone else who tries to refactor this because before there were none
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

        for (let i = 0; i < (contWidth-8)/8+2; i++) {
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
        if (contWidth !== 0) {
            addTeeth();
        }
    }, [updated]);

    const dir = props.dir ? true : false;

    useEffect(() => {
        
        const toothCount = (contWidth-8)/8+2;

        teethRefs.current.forEach((ref: any, index: any) => {
            if (ref) {
                ref.getAnimations().forEach((animation: Animation) => animation.cancel()); // Clear existing animations
                // For the ref.animate below, each of the groups represents 1 point, and it's translations from the base location.
                // The ref will animate from the position of group A to B, then from B to C, then finally from C to A. etc.
                // transformOrigin is for rotations. It just transforms where the tooth rotates around
                // transform is pretty self-explanatory
                // offset represents the % complete that the animation is once it reaches this point
                let anim:any = ref.animate(
                    (props.down)?
                    [   
                            { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(180deg) translateX(${-2}rem) translateY(${-contHeight + 4}rem)`},
                            { transformOrigin: `${contWidth - 4}rem ${-contHeight + 4}rem`, transform: `rotate(180deg) translateX(${contWidth - 12}rem) translateY(${-contHeight + 4}rem)` },
                    ]:
                    [   
                        { transformOrigin: `${4}rem ${-contHeight + 4}rem`, transform: `rotate(0deg) translateX(${2}rem) translateY(${-contHeight - 4}rem)`},
                        { transformOrigin: `${contWidth - 4}rem ${-contHeight + 4}rem`, transform: `rotate(0deg) translateX(${contWidth -6}rem) translateY(${-contHeight - 4}rem)` },
                        // for 60vw its -3, -6
                        
                        
                    ],
                    {
                        duration: toothCount * 1000,
                        iterations: Infinity,
                        delay: index * -1000 + // since each tooth should have a 1s gap between it and the next, we do this
                                (dir ? 0 : 500) +  // to make it so that opposite dir things can mesh with current
                                toothCount * -2000 + // assuming this one counterbalances the line below
                                // I'm assuming the line below here, what it does is adjust the starting delay so that the 
                                // not entire sure how it works other than that it does
                                (dir ? -1 : 1) * toothCount * 1000 * (1.5 * (contWidth-8) + 40) / (2 * (contWidth-8) + 40),

                        direction: dir ? "reverse" : "normal",
                    }
                );
                if (props.freeze){anim.pause();} 
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

                }}
                className="z-50 relative bg-black box-content rounded-[4rem] border-[8px] border-solid h-0 -left-[10vw] w-[120vw]"
            >
                
                {teeth}
            </div>
            {loader}
        </>
    );
}

export default Line;