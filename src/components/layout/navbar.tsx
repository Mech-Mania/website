import { useState, useEffect, useRef, Ref } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import Footer from './footer';
import { FiMenu, FiX } from "react-icons/fi";

function Navbar(props:{scrollRef:any,marginTop:number,unformatted?:boolean}) {
    // I am going to have to think about the mobile version of the navbar
    const navigate = useNavigate();
    const pages: string[] = ["Home","Team","Sponsor","Scoreboard"];
    const location = useLocation()
    let prev = location.pathname;
    const [show, setShow] = useState(true);
    const [mobileShow, setMobileShow] = useState(true)
    let lastScrollY = document.body.scrollTop
    let scrollPoint = document.body.scrollTop;
    let scrollDisabled = false;


    const switchPage = (page:string) =>{
        
        if (page == "Home"){
            // Handle exceptions where it's on the same page
            if ('/' !== prev){
                navigate('/');
                setShow(true)
            }
        } else {
            if ('/'+page.toLowerCase() !==prev){
                navigate('/'+page.toLowerCase());
                setShow(true)
            }
        } 
        // Could split the up and below into two different useeffect stuff to have the scroll happen first and *then* the page transition
        if (props.scrollRef.current){
            if (document.body.scrollTop<props.marginTop || '/'+((page=="Home")?"":page.toLowerCase()) !== prev){
                scrollDisabled = true
                props.scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                prev = location.pathname
                setTimeout(()=>{
                    scrollDisabled = false
                },200)
            }
        
        }
        
    }
    
    
    const controlNavbar = () => {

        if (scrollDisabled || lastScrollY > document.body.scrollTop){ // now just need to add in and out animations
            scrollPoint = document.body.scrollTop
            if (!show){

                setShow(true)
            }
        }
        if (lastScrollY-scrollPoint > 500 && show){
            setShow(false)
            
        }

        lastScrollY = document.body.scrollTop;

        // remember current page location to use in the next move
    };
    
    useEffect(() => {
        document.body.addEventListener('scroll', controlNavbar);

        // cleanup function
        return () => {
            document.body.removeEventListener('scroll', controlNavbar);
            };
    }, [show]);
    // Need to make the navbar vertical instead of horizontal
    
    const setMbInverse = () => {
        setMobileShow((mobileShow)?false:true);
    }

    useEffect(()=>{ // When a navigation happens on mobile, close the navbar
        setMobileShow(false)
    },[location]);

    if (props.unformatted)
        return ( 
        <>
            {pages.map((page,index)=>(
                <div id={`${index}`} className="cursor-pointer" >
                    <div onClick={()=>{switchPage(page)}}><p className="ease-out hover:brightness-[25%] duration-200 cursor-pointer">{page}</p></div>
                </div>
            ))}
        </>
        );
    else if (window.innerWidth>600) {
        return ( 
         <div className={` transition ease-out duration-300 ${(show)?"":"opacity-0 pointer-events-none"} h-40 items-center w-[100vw] fixed top-0 left-0 bg-gradient-to-b from-black to-transparent`}>
            <div className="fixed w-[100vw] top-0 left-0 h-20  flex flex-row items-center ">
                <div className="mx-10 flex flex-row items-center">
                    <img
                        className="w-12 h-12 rounded-2xl" src="/mechmania.svg" //Placeholder image will get someone to make a proper thing
                        style={{filter: "blur(0px) brightness(0%) invert(100%) opacity(100%)"}} // Invert logo
                        // I'm not a fan of the ont being used. I think that i can change it later though
                    />
                    
                    <div className="flex flex-row text-2xl">  
                        {pages.map((page,index)=>(
                            <div id={`${index}`} className="mx-5 cursor-pointer" >
                                <div onClick={()=>{switchPage(page)}}><h3 className="ease-out hover:brightness-[25%] duration-200 cursor-pointer">{page}</h3></div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                
            </div>
        </div>
        );
    } else {
        return ( // need to get auto-close and the built-in close button working and also open button but this is good start
            <>
            <div className="absolute right-[2.5rem] top-[2.5rem] z-10 w-fit h-fit hover:brightness-50 ease-in-out duration-100" onClick={()=>{setMbInverse()}}>
                {(mobileShow)?
                <><FiX size={"3rem"}/></>
                    :
                <><FiMenu size={"3rem"}/> </>
                }    
            </div>

            <div className={`transition ease-out duration-300 ${(mobileShow)?"":"opacity-0 pointer-events-none"} items-center w-screen h-screen fixed top-0 left-0 bg-black`}>
                <div className="w-full h-full flex items-center justify-center align-middle relative z-0">
                    <Footer scrollRef={props.scrollRef} marginTop={props.marginTop}/>    
                </div>
            </div>
            </>
        )
    }
}

    export default Navbar;
