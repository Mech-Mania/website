import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import Wheel from "../components/gears/wheel";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import Carousel from "../components/index/carousel/carousel";
import Load from "../components/load/load";
import Team from "../components/index/team/team";
import Stats from "../components/index/stats/stats";
import Initial from "../components/layout/initial";
import Line from "../components/gears/line"

function TeamPage() {





    return (
        <>  

        <Gears>
            <div className="items-center justify-center w-full cont gap-8 z-50 relative box-content rounded-[4rem] flex flex-col">
                <div className="flex flex-col w-full">
                    <h2>Meet our team!</h2>
                    <br/>
                    <div className="h-16"/>
                        <Team/>
                    <div className="h-16"/>
                </div>
            </div>
        </Gears>

        </>
    );
    }

    export default TeamPage;