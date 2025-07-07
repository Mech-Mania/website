import { useEffect, useState } from "react"
import './rankings.css'
import Overalls from "./overalls"
import Gears from "../gears/gears"
import Wheel from "../gears/wheel"
import Queue from "./queue"
function Stats() {
    
    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState(null)
    const [loading, setStatus] = useState(true)
    const [mode, setMode] = useState('Global')
    const [gameContainer, setgameContainer] = useState(null)

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





        return null
    }

    useEffect(()=>{
        getRaw()
        setStatus(false)
    },[])
    return (

        <>


            {/* {(loading) ? 
            
                <h1>
                    Loading...
                </h1>
            :
            
         s

            
            } */}
            <Gears>
                <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center">
                    <h1 className="gap-0">
                        Overall Rankings
                    </h1>
                    <Overalls teams={rankings}/>
                
                </div>
            </Gears>
            <Gears dir>
                <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center">
                    <h1 className="gap-0">
                        Game Queue
                    </h1>
                    <Queue gameContainer={gameContainer} game={mode}></Queue>
                </div>
            </Gears>

            
        </>
    )
}

export default Stats