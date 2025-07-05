import { useState, useEffect, useRef } from "react";
import Load from "../components/load/load";
import Gears from "../components/gears/gears";
import Wheel from "../components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";


function Scoreboard() {
    // Variable sizing controller states
    const [marginTop, setMarginTop] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState([0, 0])
    const [width, setWidth] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null);


    const updateMarginTop = () => {
        if (window.innerHeight!=size[1]){
            if (divRef.current) {
                const divHeight = divRef.current.clientHeight; // Get the height of the <div>
                const offset = (window.innerHeight - divHeight) / 2; // Calculate the marginTop
                setMarginTop(offset);
            }
        }
    };

    useEffect(() => {
        // Generic stuff copied from index to use gears
        setSize([window.innerWidth, window.innerHeight])
        setWidth(window.innerWidth)
        setWidth(window.innerWidth + (window.innerWidth>=1024 ? 0 : 12*parseFloat(getComputedStyle(document.documentElement).fontSize)))
        window.addEventListener("resize", function(){
            updateMarginTop();
            setSize([window.innerWidth, window.innerHeight])
            setWidth(window.innerWidth + (window.innerWidth>=1024 ? 0 : 12*parseFloat(getComputedStyle(document.documentElement).fontSize)))
        });
        document.body.style.overflow = 'hidden';
        setTimeout(function(){
            updateMarginTop()
            window.scrollTo(0, 0)
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 1500);
        }, 1000)
    }, []);

    const scrollClick = (ref:any) => {
        if (ref){
            ref.current?.scrollIntoView()
        }
    }


    return (
        <>
            {/* Load */}
           <div className="w-screen h-screen fixed top-0 left-0 loaded z-[100] animate-loaded pointer-events-none"><Load/></div>


            <div style={{ width: width+'px' }} className="gap-16 flex flex-col items-center justify-center bg-black">
                <div ref={divRef} style={{ marginTop: `${marginTop}px` }}>
                    <Gears>
                        {/* Initial */}
                        <div className="w-full cont h-full flex flex-col lg:flex-row items-center justify-center">
                            <img id="loaderShadow" className="" src="mechmania.svg"></img>
                            <div className={"box-border w-fit overflow-hidden flex flex-row items-start justify-start"}>
                                <div className="pt-8 pl-0 lg:pt-0 lg:pl-16 lg:w-auto flex flex-col items-start justify-center">
                                    <p className="w-full text-center lg:text-left">May 12 - E5/E7 @UW</p>
                                    <h1 className="w-full text-center lg:text-left">MechMania</h1>
                                    <h2 className="w-full text-center lg:text-left">Where Metal Meets Mind </h2>
                                </div>
                            </div>
                        </div>
                    </Gears>
                </div>
            
                <div ref={scrollRef} className="gap-16 flex flex-col items-center justify-start w-full bg-black lg:px-32 box-border">
                    {/* All content of site under this div */}
                        <Wheel dir>
                            <div className="animate-bounce pt-4 cursor-pointer" onClick={()=>{scrollClick(scrollRef)}}>
                                <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                                    <FaArrowDown/>
                                </IconContext.Provider>
                            </div>
                        </Wheel>
                        <Gears>
                            
                        </Gears>
     
                </div>
            </div>
        </>
    )
}
export default Scoreboard;