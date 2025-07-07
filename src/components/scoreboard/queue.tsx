import { useEffect, useState } from "react"
import './rankings.css'
import type { matchData } from "./queue.types"
import { gameCont, gameSettings } from "./rankings.types"
function Queue(props:any) {

    const [curGame, setCurGame] = useState((props.game == 'Global') ? props.gameContainer['Names'][0]: props.game)
    const [gameCont, setGameCont] = useState<gameCont>(props.gameContainer)
    const [settings, setSettings] = useState<gameSettings>(props.settings)
    useEffect(()=>{


    },[])

 

    useEffect(()=>{
        if (props.game == 'Global') {
            setCurGame(props.gameContainer['Names'][0])
        } else {
            setCurGame(props.game)
        }
        setGameCont(props.gameContainer)
        setSettings(props.gameContainer.Data[props.gameContainer.Names.indexOf(props.game)].Settings)
    },[props.game, props.gameContainer])

    return (

        <>



            <div className="grid grid-cols-5 grid-flow-row items-center justify-start w-full gap-x-16 text-center">
                <h1 className="text-4xl " >Index</h1>
                <h1 className="text-4xl">Status</h1>
                <h1 className="text-4xl">A1</h1>
                <h1 className="text-4xl">A2</h1>
                <h1 className="text-4xl">{(settings.PointsName!=undefined&&settings.PointsName!=null) ? settings.PointsName: 'Score'}</h1>
            </div>
            
            {/* Iterator */}
            {gameCont.Data[
                gameCont.Names.indexOf(
                    (curGame != 'Global') ? curGame: props.gameContainer['Names'][0]
                )
            ].Matches.map((match:matchData,index:number)=>(
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