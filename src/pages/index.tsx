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

    var myBool = true
    useEffect(() => {
        if (myBool){
            newVisit()
            myBool = false
        }
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

    const handleKeyPress = (event:any) => {
        if (event){
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(email);
            }
        }
    };

    const newVisit = async() => {
        const response = await fetch(`${__SiteBase__}/visits`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
      
        if (!response.ok) {
            throw new Error('Failed to increment visits');
        }
    }

    const submit = async (str: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(str)){
            const response = await fetch(`${__SiteBase__}/emails/submit`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({content: str}),
            });

        
            if (!response.ok) {
                throw new Error('Failed to record email');
            }
            setEmail('')
            setError(<p className="text-lime-400">Success! Please check your email to confirm.</p>)
            setTimeout(function(){setError(<></>)}, 5000)
        } else {
            setError(<p className="text-red-600">An error occured - please try again</p>)
            setTimeout(function(){setError(<></>)}, 5000)
        }
    }

    const scrollClick = (ref:any) => {
        if (ref){
            ref.current?.scrollIntoView()
        }
    }


    return (
        <>
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
                    <Gears>
                        <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                            <div className="flex flex-col">
                                <h2>What is MechMania?</h2>
                                <br/>
                                <p>MechMania is a <strong>robotics competition</strong>, run by high school students for high school students. This coming May, 120+ students from 12 schools across Waterloo Region will join us for <strong>8 hours of workshops, lessons, networking, and exciting robotics challenges</strong>.</p>
                                <br/>
                                {error}
                                <div className="mt-2 flex flex-col lg:flex-row gap-2 rounded-full p-2 overflow-hidden bg-[#aaa]">
                                    <input onKeyDown = {(e)=>{handleKeyPress(e)}} value={email} onChange = {(e)=>{setEmail(e.target.value)}} placeholder="Enter your email to register!" className="text-center lg:text-left outline-none focus:ring focus:ring-black text-black p-4 rounded-t-full lg:rounded-l-full lg:rounded-r-none grow"></input>
                                    <button onClick = {()=>{submit(email)}} className="text-black p-4 rounded-b-full lg:rounded-l-none lg:rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                                        Submit
                                    </button>
                                </div>
                                <br/>
                                <hr/>
                                <br/>
                                <Stats/>
                            </div>
                        </div>
                    </Gears>
                    <Gears dir>
                        <div className="-left-[10vw] w-[120vw]">
                            <Carousel/>
                        </div>
                    </Gears>
                    <Wheel>
                        <div className="animate-bounce pt-4 cursor-pointer" onClick={()=>{scrollClick(sponsorRef)}}>
                            <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                                <FaArrowDown/>
                            </IconContext.Provider>
                        </div>
                    </Wheel>
                    <div className="flex flex-col gap-16 w-full items-center justify-center" ref={sponsorRef}>
                        <Gears dir>
                            <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                                <div className="flex flex-col">
                                    <h2>Support us</h2>
                                    <br/>
                                    <p>Sponsoring MechMania is your chance to directly <strong>support local students and their growth in robotics</strong>. Your contribution helps <strong>make our competition accessible</strong> by providing students with <strong>resources, hands on challenges, and workshops</strong> to build their skills. This is more than just a competition; it’s <strong>an opportunity to empower young innovators from all backgrounds</strong>. By sponsoring, you will gain <strong>visibility in the Waterloo Region’s tech and education community</strong>, showing your commitment to supporting the next generation. <strong className="underline">Together, we can make a real impact</strong>.</p>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <h2>Our Sponsors:</h2>
                                    <br/>
                                    <div className="flex flex-row flex-wrap items-center justify-center">
                                        <a href="https://www.solidworks.com/" target="_blank" className="w-fit h-fit">
                                            <div className="bg-white rounded-lg h-24 w-fit p-8 gap-8 cursor-pointer box-content">
                                                <img className="h-24" src="/sponsors/solidworks.svg"></img>
                                            </div>
                                        </a>
                                    </div>
                                    <br/>
                                    <p>Interested? Email us at <a href="mailto:organizers@mechmania.ca" className="underline text-white">organizers@mechmania.ca</a>.</p>
                                </div>
                            </div>
                        </Gears>
                    </div>
                    <div className="flex flex-col gap-16 w-full items-center justify-center">
                        <Gears>
                            <div className="w-full cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                                <div className="flex flex-col w-full">
                                    <h2>FAQ</h2>
                                    <br/>
                                    <h3>Who can attend?</h3>
                                    <hr className="my-2"/>
                                    <p>Anybody in middle or high school! We welcome all skill levels, with workshops to help kickstart beginners.</p>
                                    <br/>
                                    <h3>Must I bring my own parts?</h3>
                                    <hr className="my-2"/>
                                    <p>Nope! Mechmania provides parts and some access to 3d printers, so all teams start on a level playing field. However, teams are encouraged to use all the tools they have at their disposal to engineer amazing robots.</p>
                                    <br/>
                                    <h3>Is there a cost to attend?</h3>
                                    <hr className="my-2"/>
                                    <p>While robotics competitions are expensive, we're committed to delivering an affordable experience. Last year, we we're able to make MechMania free; this year, we are looking to do the same.</p>
                                    <br/>
                                    <h3>Is there a school or team member limit?</h3>
                                    <hr className="my-2"/>
                                    <p>We recommend teams range in size from 5 to 10 people. A school can bring as many teams as they wish.</p>
                                </div>
                            </div>
                        </Gears>
                    </div>
                    <Wheel dir>
                        <div className="animate-bounce pt-4 cursor-pointer" onClick={()=>{scrollClick(teamRef)}}>
                            <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                                <FaArrowDown/>
                            </IconContext.Provider>
                        </div>
                    </Wheel>
                    <div className="flex flex-col gap-16 w-full items-center justify-center" ref={teamRef}>
                        <Gears>
                            <div className="items-center justify-center w-full cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                                <div className="flex flex-col w-full">
                                    <h2>Meet our team!</h2>
                                    <br/>
                                    <div className="h-16"/>
                                        <Team/>
                                    <div className="h-16"/>
                                </div>
                            </div>
                        </Gears>
                    </div>
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
