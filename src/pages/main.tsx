import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import Wheel from "../components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Carousel from "../components/index/carousel/carousel";
import Load from "../components/load/load";
import Stats from "../components/index/stats/stats";
import Initial from "../components/layout/initial";
import Line from "../components/gears/line"
import Email from "../components/index/email";

function Main() {





    return (
        <>  
            <Gears>
                <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                    <Email></Email>
                    <Stats></Stats>
                </div>
            </Gears>
            
            <Wheel dir >
                <div className="animate-bounce pt-4 cursor-pointer">
                    <IconContext.Provider value={{ color: "#999", size: "4rem" }}>
                        <FaArrowDown/>
                    </IconContext.Provider>
                </div>
            </Wheel>

            <Gears>
                <div className="flex flex-col w-[100vw] items-center">
                    <div className="cont gap-8 z-50 relative bg-black box-content rounded-[4rem] flex flex-col">
                            <div className="flex flex-col max-w-[75vw]">
                                <h2>Who are we?</h2>
                                <p>
                                    We are a group of passionate highschool students based out of <strong>Waterloo Collegiate Institute</strong> who believe in a world where engineering and robotics opportunities are <strong>accessible</strong> and not blocked by <strong>cost</strong>. 
                                    In <strong>2023</strong>, our robotics club looked to rebuild the competitive team that had existed before the COVID-19 pandemic, and unfortunately we <strong>couldn't get the funds we needed</strong> to run it.
                                    Facing this dilemma, we decided to <strong>build our own</strong> competition, <strong>smaller and more localized</strong>, that would give valuable engineering experiences to students across the region.
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
                            <h2>FAQ</h2>
                            <div className="flex flex-col gap-2 max-w-[75vw]">
                                <h3>How do I participate?</h3>
                                <hr/>
                                <p>
                                    To participate in Mechmania, you need to be a highschool student at a school in the Waterloo Region and surrounding areas. If your school already has a contact point with us, register a team through them. Otherwise find a willing teacher and at least one team, then join our emailing list and reach out to us at organizers@mechmania.ca. It is preferred that you are the president and/or executive of an engineering-related club at your school to make the process easier. 
                                </p>


                                <h3>What is the format?</h3>
                                <hr/>
                                <p>
                                    Every year shortly after the winter break, we send out the details of the year's competition, including the specifications of the year's game and game pieces, the rulebook, and the code of conduct. Every team then has until the day of the competition to build their robot according to the guidelines, and to ask questions/submit concerns to our email.                                
                                </p>


                                <br />
                                <h3>
                                    Is there a cost to attend?
                                </h3>
                                <hr/>
                                <p>
                                Mechmania strives to be an affordable option for students who would otherwise be unable to access similar robotics and engineering experiences, and we are happy to say that for the 25/26 year, we will be once again able to have a $0 entry fee (with optional costs for food and merch).
                                </p>
                            </div>
                    </div>
                </div>
            </Gears>

        </>
    );
    }

    export default Main;
