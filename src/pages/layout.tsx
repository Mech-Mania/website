import { useState, useEffect, useRef, Ref } from "react";
import Gears from "../components/gears/gears";
import Wheel from "../components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Load from "../components/load/load";
import Initial from "../components/layout/initial";
import Line from "../components/gears/line"
import PageNotFound from "../components/layout/notfound";
import PageUnderConstruction from "../components/layout/construction";
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "./main";
import Nav from "../components/layout/navbar";
import Sponsor from "./sponsor.tsx"
import Footer from "../components/layout/footer";
import TeamPage from "./team";

function Layout() {
    const [marginTop, setMarginTop] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState([0, 0])
    const [width, setWidth] = useState(0)
    const [normalTime, setNormalTime] = useState((new Date()).getMilliseconds());
    const scrollRef:Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);


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
            <div className="z-[10]">
                <Nav scrollRef={scrollRef} marginTop={marginTop}/>
            </div>
            
            <div className="fixed w-screen h-full top-0 left-0 flex flex-row items-center align-middle z-[-1] pointer-events-none">
                <div className="flex flex-row items-center justify-center w-full">
                    <Initial/>
                    {/* Todo, add some blinking lights or something indicated the user to scroll down that appear after a few seconds */}
                </div>
            </div>

            {/* Initial screen cover, email, + navbar & router */}
            <div style={{ width: width+'px',marginTop: `${marginTop}px` }} className="gap-16 flex flex-col min-h-[120vh] items-center bg-black" ref={scrollRef}>
               
                <div className="gap-16 flex flex-col items-center justify-start w-full max-h-fit bg-black lg:px-32 box-border z-[0] relative top-0">
                
                    
                    {/* <div style={{borderColor: "#444f",transition: "border-color 1s ease", marginBottom:`0rem`}} className="z-50 bg-black box-content border-[8px] border-solid h-0 -left-[10vw] w-[120vw] flex flex-row items-center  justify-center align-middle">
                    </div>
                    

                    <div style={{marginBottom:`0rem`}} className={`flex flex-row flex-wrap items-center justify-evenly w-[90%] h-10 translate-y-[-1.5rem]`}>
                        <Nav></Nav>
                    </div> */}

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

                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/team" element={<TeamPage/>}/>
                        <Route path="/sponsor" element={<Sponsor/>}/>
                        <Route path="/scoreboard" element={<PageUnderConstruction/>}/>
                        <Route path="/*" element={<PageNotFound/>}/>
                    </Routes>


 
                </div>
                
                <Footer scrollRef={scrollRef} marginTop={marginTop}></Footer>
                
            </div>
        </>
    );
    }

    export default Layout;
