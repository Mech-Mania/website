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
    return (
        
        <div className="flex items-center justify-evenly w-[70vw]" id='bar'>
                
            {pages.map((page,index)=>(
                <div key={index} className="w-fit">
                    <div onClick={()=>{switchPage(page)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                        <h2  className="transition-all text-right">{page}</h2>
                    </div>
                </div>
            ))}
            
            
            
        </div>
    );
    }

    export default Navbar;