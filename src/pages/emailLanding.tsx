import { useState, useEffect, useRef } from "react";
import Initial from "../components/email/landingSuccess.tsx";
import Invalid from "../components/email/landingFailure.tsx";
import Load from "../components/load/load";
import { useLocation } from "react-router-dom";
import Gears from "../components/gears/gears";

function emailLanding() {
    const [marginTop, setMarginTop] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState([0, 0])
    const [width, setWidth] = useState(0)
    const [verified, setVerified] = useState(false)
    const location = useLocation()
    const searchPararms = new URLSearchParams(location.search)
    const [ID, setID] = useState<string>(searchPararms.get('ID') || '')
    const [loadStatus, setLoadStatus] = useState<boolean>(false)

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
        checkId()
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

    const checkId = async () => {
        const response = await fetch(`${__SiteBase__}/checkID?ID=${ID}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if (response.ok){
        const data = await response.json()
        setVerified(data.verified)
        setLoadStatus(true)
      }
    }

    return ( 
            <> 
                    
                <div className="w-screen h-screen fixed top-0 left-0 loaded z-[100] animate-loaded pointer-events-none"><Load/> </div>
                {loadStatus ? 

                    verified ?

                        <div style={{ width: width+'px' }} className="gap-16 flex flex-col items-center justify-center bg-black">
                            <div ref={divRef} style={{ marginTop: `${marginTop}px` }}>
                                <Initial/>
                            </div>
                        </div>
                    :
                        <div style={{ width: width+'px' }} className="gap-16 flex flex-col items-center justify-center bg-black">
                            <div ref={divRef} style={{ marginTop: `${marginTop}px` }}>
                                <Invalid/>
                            </div>
                        </div>


                    :
                    <div style={{ width: width+'px' }} className="gap-16 flex flex-col items-center justify-center bg-black">
                        <div ref={divRef} style={{ marginTop: `${marginTop}px` }}>
                            <Gears><h2>Loading...</h2></Gears>
                        </div>
                    </div>
                }
                
            </> 
    )
}
export default emailLanding
