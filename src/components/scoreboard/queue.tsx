import { useEffect, useState } from "react"
import './rankings.css'
import type { matchData } from "./queue.types"
import { gameCont, gameSettings } from "./rankings.types"
function Queue(props:any) {

    const [curGame, setCurGame] = useState((props.game == 'Global') ? props.gameContainer['Names'][0]: props.game)
    const [gameCont, setGameCont] = useState<gameCont>(props.gameContainer)
    const [filterMode, setFilterMode] = useState(props.filter)
    useEffect(()=>{
        setFilterMode(props.filter)

    },[props.filter])

    

    useEffect(()=>{
        if (props.game == 'Global') {
            setCurGame(props.gameContainer['Names'][0])
        } else {
            setCurGame(props.game)
        }
        setGameCont(props.gameContainer)
    },[props.game, props.gameContainer])

    const queueFilter = (match:matchData) => {
        ['All','Queued', 'Finished']

        if (filterMode == 'All') return true
        else if (filterMode == match.Status) return true
        else if (filterMode == 'Queued' && ['Queued','Ongoing'].includes(match.Status)) return true
        else if (filterMode == 'Finished' && ['A1 Win', 'A2 Win','Tie'].includes(match.Status))
        return false
        
    }

    return (

        <>



            <div className="grid grid-cols-5 grid-flow-row items-center justify-start w-full gap-x-16 text-center">
                <h1 className="text-4xl " >Index</h1>
                <h1 className="text-4xl">Status</h1>
                <h1 className="text-4xl">A1</h1>
                <h1 className="text-4xl">A2</h1>
                <h1 className="text-4xl">{gameCont.Data[gameCont.Names.indexOf((curGame != 'Global') ? curGame: props.gameContainer['Names'][0])].Settings.PointsName}</h1>
            </div>
            
            {/* Iterator */}
            {gameCont.Data[
                gameCont.Names.indexOf(
                    (curGame != 'Global') ? curGame: props.gameContainer['Names'][0]
                )
            ].Matches.filter(queueFilter).map((match:matchData,index:number)=>(
            // repeatable lines
            <div className="grid grid-cols-5 grid-flow-row items-center justify-start w-full gap-x-16 text-center">    
                <p className="text-2xl">{index+1}</p>
                <p className="text-2xl">{match.Status}</p>
                <p className="text-2xl">{match.A1.join(', ')}</p>
                <p className="text-2xl">{match.A2.join(', ')}</p> 
                <p className="text-2xl">{`${match.Points.A1}-${match.Points.A2}`}</p>
            </div>
            ))}

        </>
    )
}

export default Queue