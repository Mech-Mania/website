import { useEffect, useState } from "react"
import '../rankings.css'
import { gameCont} from "../rankings.types"
import EditableInput from "./editabletext"

function Queue({game, gameContainer, onQueueChange}:{game:string, gameContainer:gameCont, onQueueChange:any}) {


    return (
        

        <>
        <div className="grid grid-cols-2 grid-flow-row items-center justify-start w-full gap-x-16 text-center">
                <h1 className="text-4xl">T1</h1>
                <h1 className="text-4xl">T2</h1>
            </div>
            
            {/* Iterator */}
            <div className="grid grid-cols-2 grid-flow-row items-center justify-start w-full gap-x-16 text-center">    
                <EditableInput value={gameContainer.Data[game].A1} boxName={'A1'} commitFunc={onQueueChange}/>
                <EditableInput value={gameContainer.Data[game].A2} boxName={'A2'} commitFunc={onQueueChange}/>
            </div>
        </>
    )
}

export default Queue