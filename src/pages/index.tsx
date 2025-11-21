import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import Wheel from "../components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Load from "../components/load/load";
import Initial from "../components/index/initial";
import Line from "../components/gears/line"
import Email from "../components/index/email";
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "./main";

function Home() {
    const [marginTop, setMarginTop] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState([0, 0])
    const [width, setWidth] = useState(0)
    const [normalTime, setNormalTime] = useState((new Date()).getMilliseconds());


    useEffect(() => {

        setSize([window.innerWidth, window.innerHeight])
        setWidth(window.innerWidth)
        setWidth(window.innerWidth + (window.innerWidth>=1024 ? 0 : 12*parseFloat(getComputedStyle(document.documentElement).fontSize)))
        window.addEventListener("resize", function(){
            setMarginTop(window.innerHeight*1.1);
            setSize([window.innerWidth, window.innerHeight])
            setWidth(window.innerWidth + (window.innerWidth>=1024 ? 0 : 12*parseFloat(getComputedStyle(document.documentElement).fontSize)))
            setNormalTime((new Date()).getMilliseconds());
        });
        document.body.style.overflow = 'hidden';
        setTimeout(function(){
            setMarginTop(window.innerHeight*1.1);
            window.scrollTo(0, 0)
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 1500);
        }, 1000)
    }, []);





    return (
        <>
        {/* Mechmania logo load + intial screen */}
            <div className="w-screen h-screen fixed top-0 left-0 loaded z-[100] animate-loaded pointer-events-none"><Load/></div>
            <div className="fixed w-screen h-full top-0 left-0 flex flex-row items-center align-middle z-[-1] pointer-events-none">
                <div className="flex flex-row items-center justify-center w-full">
                    <Initial/>
                    {/* Todo, add some blinking lights or something indicated the user to scroll down that appear after a few seconds */}
                </div>
            </div>

            {/* Initial screen cover, email, + navbar & router */}
            <div style={{ width: width+'px',marginTop: `${marginTop}px` }} className="gap-16 flex flex-col items-center justify-center bg-black" >
               
                <div className="gap-16 flex flex-col items-center justify-start w-full max-h-fit bg-black lg:px-32 box-border z-[0]">
                
                    <div style={{marginBottom:`4rem`}}>
                        <Line dir down/>
                    </div>

                    <Wheel dir >
                        <div className="animate-bounce pt-4 cursor-pointer">
                            <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                                <FaArrowDown/>
                            </IconContext.Provider>
                        </div>
                    </Wheel>

                    <Gears>
                        <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                            <Email></Email>
                            <p>Navbar here</p>
                        </div>
                    </Gears>
                    
                    <Wheel dir >
                        <div className="animate-bounce pt-4 cursor-pointer">
                            <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                                <FaArrowDown/>
                            </IconContext.Provider>
                        </div>
                    </Wheel>


                    <Routes>
                        <Route path="/" element={<Main/>}/>
                    </Routes>

 
                </div>
                
                {/* To all future website people: Add your name to this 'by' section. Keep making it better as you go */}
                <div className="my-20 flex gap-8 justify-center items-center">

                    <p className="text-center text-2xl text-zinc-600">By</p>
                    <p className="text-center text-zinc-700"> <b>Derek Gou,</b> <br/> <b>Alexander Edwards</b></p>
                </div>
            </div>
        </>
    );
    }

    export default Home;