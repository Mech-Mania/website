import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import Wheel from "../components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Carousel from "../components/index/carousel/carousel";
import Load from "../components/load/load";
import Team from "../components/index/team/team";
import Stats from "../components/index/stats/stats";
import Initial from "../components/index/initial";
import Line from "../components/gears/line"

function Main() {





    return (
        <>  

            <Gears>
                <div className="flex flex-col w-[100vw] items-center">
                    <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                            <div className="flex flex-col max-w-[75vw]">
                                <h2>Who are we?</h2>
                                <p>
                                    We are a group of passionate highschool students who believe in a world where engineering and robotics opportunities are accessible and not blocked by cost. 
                                </p>
                                
                
                            </div>
                    </div>
                    <br/>
                    <br/>
                        <Carousel></Carousel>
                </div>
            </Gears>


            <Gears dir>
                <div className="flex flex-col items-center">
                    <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                            <div className="flex flex-col max-w-[75vw]">
                                <h2>What to expect</h2>
                                <p>
                                    Insert text here
                                </p>
                                
                
                            </div>
                    </div>
                </div>
            </Gears>

            <Wheel>
                <div className="animate-bounce pt-4 cursor-pointer">
                    <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                        <FaArrowDown/>
                    </IconContext.Provider>
                </div>
            </Wheel>


            <Gears dir>
                <div className="flex flex-col items-center">
                    <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                            <div className="flex flex-col max-w-[75vw]">
                                <h2>Why you should sponsor us</h2>
                                <p>
                                    Insert text here. Also could replace this with an "our sponsors list" and move the "Why us" Question to the sponsors page when i get to it
                                </p>
                                
                
                            </div>
                    </div>
                </div>
            </Gears>

        </>
    );
    }

    export default Main;