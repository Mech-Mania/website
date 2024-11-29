import Load from "./components/load/load"
import Gears from "./components/gears/gears"
import { useState } from "react";
import Wheel from "./components/gears/wheel";

function App() {
  const getRem = () => {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  const gearDimensions = [4*Math.floor(window.innerWidth/getRem()/4)-16, 4*Math.floor(window.innerHeight/getRem()/4)-16]
  window.addEventListener('resize', function(){
    location.reload();
  })
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-black">
        <Gears width={gearDimensions[0]} height={gearDimensions[1]}>
          <Load/>
        </Gears>
      </div>
    </>
  )
}

export default App