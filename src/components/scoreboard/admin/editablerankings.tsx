import { useEffect, useState } from "react"
import '../rankings.css'
import EditableOveralls from "./editableoveralls"
import Gears from "../../gears/gears"
import Queue from "../queue"
import type { gameCont } from "../rankings.types"
import { Outlet } from "react-router-dom"
import EditableInput from "./editabletext"

function Rankings(props:any) {
    // This should work just make props.enabled a state. too tired to do any more

    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState<{[key:string]:number}>({})
    const [loading, setStatus] = useState(true)
    const [mode, setMode] = useState('Global')
    const [gameContainer, setgameContainer] = useState<gameCont>({Data:{},Names:[],Points:{},Settings:{}})
    const [enabled, setEnabled] = useState(props.enabled)

    const getRaw = async () => {
        const response = await fetch('/api/scoreboard.js', {
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
        console.log(body)



        setStatus(false)
        return null
    }

    useEffect(()=>{
        getRaw()
    },[])

    useEffect(()=>{
        console.log(gameContainer)
    },[gameContainer])
    useEffect(()=>{
        setEnabled(props.enabled)
    },[props.enabled])



    const onSettingsChange = (name:string, value:any) => {
        if (mode == 'Global') {
            // Do nothing we don't want to edit global stuff
            // this never happens and doesnt happen while testing i already made sure of that
        } else {
            setgameContainer(prevState => ({
                ...prevState,
                Settings: {
                    ...prevState.Settings,
                    [mode] : {...prevState.Settings[mode],[name]:value}
                }
            }));
        }
    }

    const onScoreChange = (name:string, value:any) => {
        if (value == ''){
            value = '0'
        }
        if (Number.isNaN(parseInt(value))){
            value = '0'
        }
        if (mode == 'Global') {
            setRankings(prevState => ({
                ...prevState,
                [name]:parseInt(value)
            }));
        } else {
            setgameContainer(prevState => ({
                ...prevState,
                Points: {
                    ...prevState.Points,
                    [mode] : {
                        ...prevState.Points[mode],
                        [name]:parseInt(value)
                    }
                }
            }));
        }
    }

    const onGameNameChange = (name:string, value:any) => {
        //Some error checking to stop default names from being overwritten
        if (gameContainer.Names.includes(value) || ['','Overall','Global'].includes(value)|| name == 'Overall'){
            return
        }
        // FilterObj function removes any keys at top level which match a string in exclude. Returns new object
        const filterObj:any = (exclude:string[], origObject:any) => {
            
            let filteredObj = {...origObject}
            for (const key of Object.keys(origObject)){
                if (exclude.includes(key)){
                    delete filteredObj[key]
                }
            }

            return filteredObj
        }
        // Yall I dont think this works
        // My issue is with filterobj
        setgameContainer(prevState => ({
            ...prevState,
            Names: [...prevState.Names.filter((TestName)=>TestName != name),value],
            // Making heavy use of filterobj here
            // See types in rankings.types.ts 
            Points: {
                ...filterObj([name],prevState.Points),
                [value] : {
                    ...prevState.Points[name],
                }
            },
            Settings: {
                ...filterObj([name],prevState.Points),
                [value] : {
                    ...prevState.Points[name],
                }
            },
            Data: {
                ...filterObj([name],prevState.Points),
                [value] : {
                    ...prevState.Points[name],
                }
            }
        }));
        setMode(value)
    }



    return (
        // use callback functions in the editableprops areas to send things back upstream.
        loading ? 
                <Gears key='0'>
                    <h1 className="-left-[10vw] w-[120vw] flex justify-center items-center">
                        Loading...
                    </h1>
                </Gears>
        :
        enabled ? 
        <>
            
            
                <Gears key='1'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center -left-[10vw] w-[120vw]">
                        <div className='flex'>
                        {gameContainer['Names'].map((name,index:number)=>(
                            <div key={index} className="w-48">
                                <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                    <h2 style={{ color:  (name==mode) ? 'white' : '#aaa' }} className="transition-all text-right">{name}</h2>
                                </div>
                            </div>
                        ))}
                        </div>


                        <h1 className="gap-0">
                            {(mode!='Global') ? mode: gameContainer['Names'][0]} Next Game
                        </h1>
                        <Queue gameContainer={gameContainer} game={mode}></Queue>
                    </div>
                </Gears>

            
                <Gears dir key='2'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center -left-[10vw] w-[120vw]">
                        <div className='flex max-w-[96vw]'>
                            {/* Overall */}
                            <div key={0} className="w-48">
                                    <div onClick={()=>{setMode('Global')}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                        <h2 style={{ color:  ('Global'==mode) ? 'white' : '#aaa' }} className="transition-all text-right">Overall</h2>
                                    </div>
                                </div>

                            {/* Dynamic by game */}
                            {gameContainer['Names'].map((name,index:number)=>(
                                <div key={index+1} className="w-48">
                                    <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                        <h2 style={{ color:  (name==mode) ? 'white' : '#aaa' }} className="transition-all text-right">{name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h1 className="gap-0">
                            <EditableInput value={(mode!='Global') ? mode: 'Overall'} commitFunc={onGameNameChange} boxName={(mode!='Global') ? mode: 'Overall'}/> Rankings
                        </h1>
                        <EditableOveralls onSettingsChange={onSettingsChange} onScoreChange={onScoreChange} teams={(mode=='Global') ? rankings : gameContainer.Points[mode]} settings={(mode=='Global') ? {descending:true, pointsName:'Score'} : gameContainer.Settings[mode]}/>
                    </div>
                </Gears>

                
        
            <Outlet/>
            
        </>
    :
    <>
            
                <Gears key='0'>
                    <p className="-left-[10vw] w-[120vw] flex justify-center items-center">
                        The scoreboard is not available at this time
                    </p>
                </Gears>
        
    </>
    )
}

export default Rankings