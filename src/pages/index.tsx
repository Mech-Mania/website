import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import Wheel from "../components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Carousel from "../components/index/carousel/carousel";
import Load from "../components/load/load";
import Team from "../components/index/team/team";
import Stats from "../components/index/stats/stats";
import Initial from "../components/initial";
import Line from "../components/gears/line"

function Home() {
    const [marginTop, setMarginTop] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState([0, 0])
    const [width, setWidth] = useState(0)
    const [email, setEmail] = useState('')
    const [error, setError] = useState(<></>)
    const scrollRef = useRef<HTMLDivElement>(null);
    const sponsorRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);

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

    /////////////////////////// HTML ////////////////



    const scrollClick = (ref:any) => {
        if (ref){
            ref.current?.scrollIntoView()
        }
    }


    return (
        <>
            <div className="w-[120vw] h-screen fixed top-5 left-[-10vw] loaded z-[100]">
                <Line></Line>
            </div>

            <div className="w-screen h-screen fixed top-0 left-0 loaded z-[100] animate-loaded pointer-events-none"><Load/></div>
            <div style={{ width: width+'px' }} className="gap-16 flex flex-col items-center justify-center bg-black">
                <div ref={divRef} style={{ marginTop: `${marginTop}px` }}>
                    <Initial/>
                </div>
                <div ref={scrollRef} className="gap-16 flex flex-col items-center justify-start w-full bg-black lg:px-32 box-border">
                    <Wheel dir>
                        <div className="animate-bounce pt-4 cursor-pointer" onClick={()=>{scrollClick(scrollRef)}}>
                            <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                                <FaArrowDown/>
                            </IconContext.Provider>
                        </div>
                    </Wheel>
                    
                    
                </div>
                
            </div>
        </>
    );
    }

    export default Home;
