import { useEffect, useState } from "react"
import './rankings.css'
import Overalls from "./overalls"
import Gears from "../gears/gears"
import Wheel from "../gears/wheel"
import Queue from "./queue"
import type { gameCont } from "./rankings.types"
import { Outlet } from "react-router-dom"

function Rankings(props:any) {
    // This should work just make props.enabled a state. too tired to do any more

    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState(null)
    const [loading, setStatus] = useState(true)
    const [mode, setMode] = useState('Global')
    const [gameContainer, setgameContainer] = useState<gameCont>({Data:{},Names:[],Points:{},Settings:{}})
    const [enabled, setEnabled] = useState(props.enabled)

    const getRaw = async () => {
        const response = await fetch('/api/scoreboard.js', {
                method: 'POST',
                headers: {
                    "Content-Type": "text/plain",
                },
        });


        if (response.status != 200){
            return null
        }


        const body = await response.json()
        const teamPoints = body.teams
        // i think it works it just throws a formatting error with the jsx work on this again later
        setRankings(teamPoints)
        setgameContainer(body.games)
        return null
    }

    useEffect(()=>{
        getRaw()
        const intervalId = setInterval(getRaw,15000)
        return () => {
            // Clear interval using intervalId
            // This function run when component unmount
        clearInterval(intervalId)
        }
    },[])

    useEffect(()=>{
        setEnabled(props.enabled)
    },[props.enabled])

    return (
        //It still fails a teensy bit on first load, with the gear animation being off, but much less than before, so I'll call it a win.
        loading ? 
                <Gears key='0'>
                    <h1 className="-left-[10vw] w-[120vw] flex justify-center items-center">
                        Loading...
                    </h1>
                </Gears>
        :
        enabled ? 
        <>
            
            
                <Gears key='1'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center -left-[10vw] w-[120vw]">
                        <div className='flex'>
                        {gameContainer['Names'].map((name,index:number)=>(
                            <div key={index} className="w-48">
                                <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer overflow-visible">
                                    <h2 style={{ color:  (name==mode) ? 'white' : '#aaa' }} className="transition-all text-right text-nowrap">{name}</h2>
                                </div>
                            </div>
                        ))}
                        </div>


                        <h1 className="gap-0">
                            {(mode!='Global') ? mode: gameContainer['Names'][0]} Next Game
                        </h1>
                        <Queue gameContainer={gameContainer} game={mode}></Queue>
                    </div>
                </Gears>

            
                <Gears dir key='2'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center -left-[10vw] w-[120vw]">
                        <div className='flex max-w-[96vw]'>
                            {/* Overall */}
                            <div key={0} className="w-48">
                                    <div onClick={()=>{setMode('Global')}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer overflow-visible">
                                        <h2 style={{ color:  ('Global'==mode) ? 'white' : '#aaa' }} className="transition-all text-right text-nowrap">Overall</h2>
                                    </div>
                                </div>

                            {/* Dynamic by game */}
                            {gameContainer['Names'].map((name,index:number)=>(
                                <div key={index+1} className="w-48">
                                    <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                        <h2 style={{ color:  (name==mode) ? 'white' : '#aaa' }} className="transition-all text-right">{name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h1 className="gap-0">
                            {(mode!='Global') ? mode: 'Overall'} Rankings
                        </h1>
                        <Overalls teams={(mode=='Global') ? rankings : gameContainer.Points[mode]} settings={(mode=='Global') ? {descending:true, pointsName:'Score'} : gameContainer.Settings[mode]}/>
                    </div>
                </Gears>

                
        
            <Outlet/>
            
        </>
    :
    <>
            
                <Gears key='0'>
                    <p className="-left-[10vw] w-[120vw] flex justify-center items-center">
                        The scoreboard is not available at this time
                    </p>
                </Gears>
        
    </>
    )
}

export default Rankings