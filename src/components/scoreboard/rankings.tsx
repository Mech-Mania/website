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
                        <h1 className="gap-0">
                            Overall Rankings
                        </h1>
                        <Overalls teams={rankings}/>
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
                        <h1 className="gap-0">
                            {(mode!='Global') ? mode: gameContainer['Names'][0]} Game Queue
                        </h1>
                        <Queue gameContainer={gameContainer} game={mode}></Queue>
                    </div>
                </Gears>

            }
            <Outlet/>
            
        </>
    )
}

export default Rankings