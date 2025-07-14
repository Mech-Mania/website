import { useState, useEffect, useRef } from "react";
import Load from "../components/load/load";
import Wheel from "../components/gears/wheel";
import Rankings from '../components/scoreboard/rankings'
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Initial from "../components/initial";
import { Route, Routes } from "react-router-dom";
import Gears from "../components/gears/gears";
import Admin from "../components/scoreboard/admin/admin";

function Scoreboard(props:any) {
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
                    <Initial/>
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
                        {/* Router to render admin panel on same page */}
                        <Routes>
                            <Route index element={(props.pageStatus.scoreboard) ? <Rankings/> : <></>} />
                            <Route path='/admin' element={<Admin/>}/> 
                            <Route path='/*' element={<Gears><h1>404 - Page Not Found</h1></Gears>}/>
                        </Routes>
                        

                </div>
            </div>
        </>
    )
}
export default Scoreboard;