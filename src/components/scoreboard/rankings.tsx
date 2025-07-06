import { useEffect, useState } from "react"
import './rankings.css'


function Stats() {
    
    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState(null)
    const [loading, setStatus] = useState(true)

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
            <div>
            {(loading) ? 
            
                <h1>
                    Loading...
                </h1>
            :
            
                <p>
                {JSON.stringify(rankings)}
                </p>
            
            }
            </div>

        </>
    )
}

export default Stats