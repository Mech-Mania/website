import { useEffect, useState } from "react"
import '../rankings.css'
import EditableOveralls from "./editableoveralls"
import Gears from "../../gears/gears"
import Queue from "./editablequeue"
import type { gameCont } from "../rankings.types"
import { Outlet } from "react-router-dom"
import EditableInput from "./editabletext"
import EditableTextarea from "./editablebigtext"
import { rankData } from "../overalls.types"

function Rankings({enabled, onSave}:{enabled:boolean, onSave:any}) {
    // This should work just make props.enabled a state. too tired to do any more

    const defaults = ['Overall']
    const [games, setGames] = useState(0)
    const [rankings, setRankings] = useState<{[key:string]:number}>({})
    const [loading, setStatus] = useState(true)
    const [mode, setMode] = useState('Global')
    const [gameContainer, setgameContainer] = useState<gameCont>({Data:{},Names:[],Points:{},Settings:{}})
    const [publicStatus, setPublicStatus] = useState<boolean>(false)

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
        setPublicStatus(body.enabled)
        // i think it works it just throws a formatting error with the jsx work on this again later
        setRankings(teamPoints)
        setgameContainer(body.games)



        setStatus(false)
        return null
    }

    useEffect(()=>{
        getRaw()
    },[])

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
                ...filterObj([name],prevState.Settings),
                [value] : {
                    ...prevState.Settings[name],
                }
            },
            Data: {
                ...filterObj([name],prevState.Data),
                [value] : {
                    ...prevState.Data[name],
                }
            }
        }));
        setMode(value)
    }

    const onQueueChange = (name:string, value:any) => {
        setgameContainer(prevState => ({
            ...prevState,
            Data: {
                ...prevState.Data,
                [mode] : {...prevState.Data[mode],[name]:value}
            }
        }));
    }

    const onGamesChange = (name:string, value:string) => {
         value.replace('\n',' ')
        value.replace('\t',' ')
        
        const filterGameNames:any = (OrigObj:any, names:string[], defaults:any) => {
            let filtered = {...OrigObj}
            for (const mode of Object.keys(OrigObj)) {
                if (!names.includes(mode)) {
                    delete filtered[mode]
                }
            }
            for (const name of names){
                if (!Object.keys(OrigObj).includes(name)){
                    filtered[name] = defaults
                }
            }
            return filtered
        }

        const gameNames = value.split(' ')
        let pointsDefault:any = {}
        for (const item of Object.keys(rankings)) {
            pointsDefault[item] = 0
        }
        setgameContainer(prevState => ({
            ...prevState,
            Names: gameNames,
            Points: filterGameNames(prevState.Points, gameNames, {...pointsDefault}),
            Data: filterGameNames(prevState.Data, gameNames, {A1:'',A2:''}),
            Settings: filterGameNames(prevState.Settings, gameNames, {descending:false, pointsName:'Points'})
        }));
        setMode('Global')
    }

    const onTeamsChange = (name:string, value:string) => {
        value.replace('\n',' ')
        value.replace('\t',' ')
        
        const filterPointSection:any = (Points:gameCont['Points'], names:string[]) => {
            let filteredPoints = {...Points}
            for (const mode of Object.keys(Points)){
                const keyNames = Object.keys(Points[mode])
                for (const name of keyNames){
                    if (!names.includes(name)){
                        // If names is not in the current filter
                        delete filteredPoints[mode][name]
                    }
                }
                for (const name of names){
                    if (!keyNames.includes(name)){
                        filteredPoints[mode][name] = 0
                    }
                }
            }
            return filteredPoints
        }

        const filterOveralls:any = (ladder:{[key:string]:number},names:string[]) => {
            let filteredLadder = {...ladder}
            const keyNames = Object.keys(ladder)
            for (const name of keyNames){
                if (!names.includes(name)){
                    // If names is not in the current filter
                    delete filteredLadder[name]
                }
            }
            for (const name of names){
                if (!keyNames.includes(name)){
                    filteredLadder[name] = 0
                }
            }
            return filteredLadder
        }

        const teamNames = value.split(' ')
        setgameContainer(prevState => ({
            ...prevState,
            Points: filterPointSection(prevState.Points, teamNames),
        }));
        setRankings(prevState => (filterOveralls(prevState,teamNames)))
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
                <Gears key='0'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-row text-center w-[20vw]">
                        <div onClick={()=>{onSave(rankings,gameContainer,enabled)}} className="hover:brightness-110 transition-all rounded-sm w-full pentagon-left p-4 cursor-pointer bg-white">
                            <h2 style={{ color: 'black'}} className="transition-all text-right">Save</h2>
                        </div>
                        <h2>Enable public scoreboard:</h2>
                        <input type='checkbox' checked={publicStatus} name={'descending'} onChange={()=>{setPublicStatus((publicStatus == true) ? false:true)}}/>
                    </div>
                </Gears>

                {/* Next Games */}
                <Gears dir key='1'>
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
                        <Queue gameContainer={gameContainer} game={(mode == 'Global') ? gameContainer['Names'][0]: mode} onQueueChange={onQueueChange}></Queue>
                    </div>
                </Gears>
                
                {/* Games */}
                <Gears key='1'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center -left-[10vw] w-[120vw]">
                        <h1>Enter game names</h1>
                        <EditableTextarea value={gameContainer.Names.join(' ')} boxName='Games' commitFunc={onGamesChange}/>
                    </div>
                </Gears>
                
                {/* Teams */}
                <Gears dir key='2'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center -left-[10vw] w-[120vw]">
                        <h1>Enter team names</h1>
                        <EditableTextarea value={Object.keys(rankings).join(' ')} boxName='Names' commitFunc={onTeamsChange}/>
                    </div>
                </Gears>


                {/* Rankings */}
                <Gears key='4'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center -left-[10vw] w-[120vw]">
                        <div className='flex max-w-[96vw]'>
                            {/* Overall */}
                            <div key={0} className="w-48">
                                    <div onClick={()=>{setMode('Global')}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer overflow-visible">
                                        <h2 style={{ color:  ('Global'==mode) ? 'white' : '#aaa' }} className="transition-all text-right text-nowrap">Overall</h2>
                                    </div>
                                </div>

                            {/* Dynamic by game */}
                            {gameContainer['Names'].map((name,index:number)=>(
                                <div key={index+1} className="w-48">
                                    <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer overflow-visible">
                                        <h2 style={{ color:  (name==mode) ? 'white' : '#aaa' }} className="transition-all text-right text-nowrap">{name}</h2>
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