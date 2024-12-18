import { useState, useEffect, useRef } from "react";
import Load from "./components/load/load";
import Gears from "./components/gears/gears";
import Wheel from "./components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Carousel from "./components/carousel/carousel";

function App() {
  const [marginTop, setMarginTop] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState([0, 0])
  const [width, setWidth] = useState(0)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(<></>)

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
    setWidth(window.innerWidth + (window.innerWidth>=1024 ? 0 : 14*parseFloat(getComputedStyle(document.documentElement).fontSize)))
    window.addEventListener("resize", function(){
      updateMarginTop();
      setSize([window.innerWidth, window.innerHeight])
      setWidth(window.innerWidth + (window.innerWidth>=1024 ? 0 : 14*parseFloat(getComputedStyle(document.documentElement).fontSize)))
    });
    setTimeout(function(){
      updateMarginTop()
      window.scrollTo(0, 0)
    }, 1000)
  }, []);

  const submit = async (str: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(str)){
      const response = await fetch('api/emails.js', {
        method: 'POST',
        headers: {
          "Content-Type": "text/plain",
        },
        body: str,
      });

    
      if (!response.ok) {
        throw new Error('Failed to record email');
      }
      const data = await response.json();
      setEmail('')
      setError(<p className="text-lime-400">Success!</p>)
      setTimeout(function(){setError(<></>)}, 5000)
    } else {
      setError(<p className="text-red-600">An error occured - please try again</p>)
      setTimeout(function(){setError(<></>)}, 5000)
    }
  }

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 loaded z-[100] animate-loaded pointer-events-none"><Load/></div>
      <div style={{ width: width+'px' }} className="gap-16 flex flex-col items-center justify-center bg-black">
        <div ref={divRef} style={{ marginTop: `${marginTop}px` }}>
          <Gears>
            <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
              <img id="loaderShadow" className="" src="mechmania.svg"></img>
              <div className={"box-border w-fit overflow-hidden flex flex-row items-start justify-start"}>
                <div className="pt-8 pl-0 lg:pt-0 lg:pl-16 lg:w-auto flex flex-col items-start justify-center">
                  <p className="w-full text-center lg:text-left">May 12 - More Info Coming Soon</p>
                  <h1 className="w-full text-center lg:text-left">MechMania</h1>
                  <h2 className="w-full text-center lg:text-left">Where Metal Meets Mind </h2>
                </div>
              </div>
            </div>
          </Gears>
        </div>
        <div className="gap-16 flex flex-col items-center justify-start w-full bg-black lg:px-32 box-border">
          <Wheel dir>
            <div className="animate-bounce pt-4">
              <IconContext.Provider value={{ color: "#444", size: "4rem" }}>
                <FaArrowDown />
              </IconContext.Provider>
            </div>
          </Wheel>
          <Gears>
            <div className="gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
              <div className="flex flex-col">
                <h2>What is MechMania?</h2>
                <br/>
                <p>MechMania is a <strong>robotics competition</strong>, run by high school students for high school students. This coming May, 120+ students from 12 schools across Waterloo Region will join us for <strong>8 hours of workshops, lessons, networking, and exciting robotics challenges</strong>.</p>
                <br/>
                {error}
                <div className="mt-2 flex flex-row gap-2 rounded-full p-2 overflow-hidden bg-[#aaa]">
                  <input value={email} onChange = {(e)=>{setEmail(e.target.value)}} placeholder="Join our emailing list" className="outline-none focus:ring focus:ring-black text-black p-4 rounded-l-full grow"></input>
                  <button onClick = {()=>{submit(email)}} className="text-black p-4 rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Gears>
          <Gears dir nopad>
            <div className="-left-[50vw] w-[200vw]">
              <Carousel/>
            </div>
          </Gears>
        </div>
      </div>
    </>
  );
}

export default App;