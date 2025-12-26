import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";



function Sponsor() {

    return (
        <> 
            <Gears>
                <div className="flex flex-col">
                                    <h2>Support us</h2>
                                    <br/>
                                    <p>Sponsoring MechMania is your chance to directly <strong>support local students and their growth in robotics</strong>. Your contribution helps <strong>make our competition accessible</strong> by providing students with <strong>resources, hands on challenges, and workshops</strong> to build their skills. This is more than just a competition; it’s <strong>an opportunity to empower young innovators from all backgrounds</strong>. By sponsoring, you will gain <strong>visibility in the Waterloo Region’s tech and education community</strong>, showing your commitment to supporting the next generation.</p>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <h2>Our Sponsors:</h2>
                                    <br/>
                                    <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
                                        <a href="https://uwaterloo.ca/robohub/" target="_blank" className="w-fit h-fit">
                                            <div className="bg-white rounded-lg h-24 w-fit p-8 gap-8 cursor-pointer box-content">
                                                <img className="h-24" src="/sponsors/robohub-logo-square.jpg"></img>
                                            </div>
                                        </a>
                                        <br/>
                                        
                                        <a href="https://www.bepwr.ca/" target="_blank" className="w-fit h-fit">
                                            <div className="bg-white rounded-lg h-24 w-fit p-8 gap-8 cursor-pointer box-content">
                                                <img className="h-24" src="/sponsors/BEP_logo.png"></img>
                                            </div>
                                            </a>
                                        <br/>

                                         <a href="https://www.solidworks.com/" target="_blank" className="w-fit h-fit">
                                            <div className="bg-white rounded-lg h-24 w-fit p-8 gap-8 cursor-pointer box-content">
                                                <img className="h-24" src="/sponsors/solidworks.svg"></img>
                                            </div>
                                            </a>
                                        <br/>  
                                        
                                        <a href="https://www.7pcb.com/" target="_blank" className="w-fit h-fit">
                                            <div className="bg-white rounded-lg h-24 w-fit p-8 gap-8 cursor-pointer box-content">
                                                <img className="h-24" src="/sponsors/BITTELE-LOGO.png"></img>
                                            </div>
                                            </a>
                            
                                        <br/> 
                                    
                                        </div>

                                    <br/>


                                    <div className="flex flex-col items-center">
                                           <p>Interested? Take a look at our <a href="/sponsorPackage.pdf" className="underline text-blue-400" target="_blank">sponsorship package</a> and email us at <a href="mailto:organizers@mechmania.ca" className="underline text-blue-400">organizers@mechmania.ca</a>.</p>
                                            <br/>
                                    </div>
                                    <br/>
                    
                                </div>
            </Gears> 
        </>
    );
}

export default Sponsor;

