import { useEffect, useState } from "react"
import './rankings.css'


function Stats() {
    
    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState(null)
    const [loading, setStatus] = useState(true)

    const getRaw = async () => {
        const response = await fetch('api/scoreboard.ts', {
                method: 'POST',
                headers: {
                    "Content-Type": "text/plain",
                },
        });


        if (response.status != 200){
            return null
        }


        const body = await response.json()
        const teamPoints = body.team
        setRankings(teamPoints)
        console.log(rankings)
        return null
    }

    useEffect(()=>{
        getRaw()
        setStatus(false)
    },[])
    return (

        <>
            {(loading) ? 
            <div>
                <h1>
                    Loading...
                </h1>
            </div>
            :
            <div>
                <p>
                {rankings}
                </p>
            </div>
            }

        </>
    )
}

export default Stats