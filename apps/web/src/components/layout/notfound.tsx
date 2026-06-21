import Gears from "../gears/gears";
import { useState, useEffect, useRef } from "react";
function PageNotFound() {

    return (
        <>  

        <Gears>
            <div className="items-center justify-center w-full cont gap-8 z-50 relative box-content rounded-[4rem] flex flex-col">
                <div className="flex flex-col w-full">
                    <h2>Page not found</h2>
                </div>
            </div>
        </Gears>

        </>
    );
    }

    export default PageNotFound;