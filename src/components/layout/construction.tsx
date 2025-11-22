import Gears from "../gears/gears";
import { useState, useEffect, useRef } from "react";
function PageUnderConstruction() {


    return (
        <>  

        <Gears>
            <div className="items-center justify-center w-full cont gap-8 z-50 relative box-content rounded-[4rem] flex flex-col">
                <div className="flex flex-col w-full">
                    <h2>Oops!</h2>
                    <p>This page is still very under construction!</p>
                </div>
            </div>
        </Gears>

        </>
    );
    }

    export default PageUnderConstruction;