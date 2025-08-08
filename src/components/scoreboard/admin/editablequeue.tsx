import { useEffect, useState } from "react"
import './rankings.css'
import { gameCont} from "../rankings.types"
import EditableInput from "./editabletext"
function Queue(props:any) {

    const [curGame, setCurGame] = useState((props.game == 'Global') ? props.gameContainer['Names'][0]: props.game)
    const [gameContainer, setGameCont] = useState<gameCont>(props.gameContainer)
    

    useEffect(()=>{
        if (props.game == 'Global') {
            setCurGame(props.gameContainer['Names'][0])
        } else {
            setCurGame(props.game)
        }
        setGameCont(props.gameContainer)
    },[props.game, props.gameContainer])


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

            </div>
        </>
    )
}

export default Queue