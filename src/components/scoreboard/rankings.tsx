import { useEffect, useState } from "react"
import './rankings.css'
import Overalls from "./overalls"
import Gears from "../gears/gears"
import Wheel from "../gears/wheel"
import Queue from "./queue"
import type { gameCont, gameType } from "./rankings.types"
import { Outlet } from "react-router-dom"

function Rankings() {
    
    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState(null)
    const [loading, setStatus] = useState(true)
    const [mode, setMode] = useState('Global')
    const [gameContainer, setgameContainer] = useState<gameCont>({Data:[],Names:[]})
    const [filterMode, setFilterMode] = useState('Queued')

    const getRaw = async () => {
        const response = await fetch('api/scoreboard.js', {
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
        console.log(body.games)



        setStatus(false)
        return null
    }

    useEffect(()=>{
        getRaw()
    },[])


    return (

        <>



            
            {(loading) ?
                <Gears>
                    <h1>
                        Loading...
                    </h1>
                </Gears>
            :
                <Gears>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center">
                        <div className='flex flex-row'>
                            {/* Overall */}
                            <div key={0} className="w-48">
                                    <div onClick={()=>{setMode('Global')}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                        <h2 style={{ color:  ('Global'==mode) ? 'white' : '#aaa' }} className="transition-all text-right">Overall</h2>
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
                        <Overalls teams={(mode=='Global') ? rankings : gameContainer.Data[gameContainer.Names.indexOf(mode)].Points}/>
                    </div>
                </Gears>
            }

                
            {(loading) ? 
                <Gears dir>
                    <h1>
                        Loading...
                    </h1>
                </Gears>
                :

                <Gears dir>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center">
                        <div className='flex flex-row'>
                        {gameContainer['Names'].map((name,index:number)=>(
                            <div key={index} className="w-48">
                                <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                    <h2 style={{ color:  (name==mode) ? 'white' : '#aaa' }} className="transition-all text-right">{name}</h2>
                                </div>
                            </div>
                        ))}
                        </div>


                        <div className='flex flex-row'>
                            {['All','Queued', 'Finished'].map((name,index:number)=>(
                                <div key={index} className="w-48">
                                    <div onClick={()=>{setFilterMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                        <h2 style={{ color:  (name==filterMode) ? 'white' : '#aaa' }} className="transition-all text-right">{name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h1 className="gap-0">
                            {(mode!='Global') ? mode: gameContainer['Names'][0]} Game Queue
                        </h1>
                        <Queue gameContainer={gameContainer} game={mode} filter={filterMode}></Queue>
                    </div>
                </Gears>

            }
            <Outlet/>
            
        </>
    )
}

export default Rankings