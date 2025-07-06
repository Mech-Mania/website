import { useEffect, useState } from "react"
import './rankings.css'


function Stats() {
    
    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState(null)
    let loading = true

    const getRaw = async () => {
        const response = await (await fetch('api/scoreboard.ts', {
                method: 'POST',
                headers: {
                    "Content-Type": "text/plain",
                },
        })).json();

        const teamPoints = response.team
        setRankings(teamPoints)
        
        return null
    }

    useEffect(()=>{
        getRaw()
        loading = false
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
                {rankings}
            </div>
            }

        </>
    )
}

export default Stats