import { useEffect, useState } from "react"
import './rankings.css'
import { gameCont} from "../rankings.types"
import EditableInput from "./editabletext"
function Queue({game, gameContainer, onQueueChange}:{game:string, gameContainer:gameCont, onQueueChange:any}) {

    const [curGame, setCurGame] = useState((game == 'Global') ? gameContainer['Names'][0]: game)
    

    useEffect(()=>{
        if (game == 'Global') {
            setCurGame(gameContainer['Names'][0])
        } else {
            setCurGame(game)
        }
    },[game])


    return (
        

        <>
        <div className="grid grid-cols-2 grid-flow-row items-center justify-start w-full gap-x-16 text-center">
                <h1 className="text-4xl">T1</h1>
                <h1 className="text-4xl">T2</h1>
            </div>
            
            {/* Iterator */}
            <div className="grid grid-cols-2 grid-flow-row items-center justify-start w-full gap-x-16 text-center">    
                <p className="text-2xl">{gameContainer.Data[curGame].A1}</p>
                <p className="text-2xl">{gameContainer.Data[curGame].A2}</p> 
                <EditableInput value={gameContainer.Data[curGame].A1} boxName={'A1'} commitFunc={onQueueChange}/>
                <EditableInput value={gameContainer.Data[curGame].A1} boxName={'A2'} commitFunc={onQueueChange}/>
            </div>
        </>
    )
}

export default Queue