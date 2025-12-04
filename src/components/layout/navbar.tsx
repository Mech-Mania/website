import { useState, useEffect, useRef } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const pages: string[] = ["Home","Team","Sponsor","Scoreboard"];


    const switchPage = (page:string) =>{
        if (page == "Home"){
            navigate('/');
        } else {
            navigate('/'+page.toLowerCase());
        }
        
    }
    // Need to make the navbar vertical instead of horizontal
    return ( // This is for stuff > 1024 pixels wide
        <>
        <div className="fixed w-[100vw] top-0 left-0 h-20  flex flex-row items-center ">
            <div className="mx-10 flex flex-row items-center">
                <img
                    className="w-12 h-12 rounded-2xl" src="/mechmania.svg" //Placeholder image will get someone to make a proper thing
                    style={{filter: "blur(0px) brightness(0%) invert(100%) opacity(100%)"}} // Invert logo
                    // I'm not a fan of the ont being used. I think that i can change it later though
                />
                
                <div className="flex flex-row text-2xl">  
                      {pages.map((page,index)=>(
                        <div id={`${index}`} className="mx-5">
                            <h3>{page}</h3>
                        </div>
                      ))
                     }
                </div>
            </div>
            
            
            
   

        </div>
        </>
        // <div className="flex items-center justify-evenly w-[70vw]" id='bar'>
                
        //     {pages.map((page,index)=>(
        //         <div key={index} className="w-fit">
        //             <div onClick={()=>{switchPage(page)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
        //                 <h2  className="transition-all text-right">{page}</h2>
        //             </div>
        //         </div>
        //     ))}
            
        
    );
    }

    export default Navbar;