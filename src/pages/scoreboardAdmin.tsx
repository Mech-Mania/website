import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import { RankData, RankingsCont, ScoreboardScores, ScoreboardSettings } from "../components/scoreboard/scoreboard.types";
import { createRankings } from "../components/scoreboard/scoreboard.util";
import FieldSM from "../components/scoreboard/fieldsm";
import PassField from "../components/layout/passwordField";

function ScoreboardAdmin(props:{width:number}) {

    const [names,setNames] = useState<string[]>([]);
    const [scores,setScores] = useState<ScoreboardScores>({});
    const [current, setCurrent] = useState<string>("overall");
    const [rankings, setRankings] = useState<RankingsCont>({overall:[]});
    const [enabled, setEnabled] = useState<boolean>(false);
    const [settings, setSettings] = useState<ScoreboardSettings>({overall:{pointsName:"Points",descending:true}});
    
    const [locked, setLocked] = useState<boolean>(true);
    const [pw, setPW] = useState<string>('');
    const [RRHandle,refreshRankings] = useState<number>(0);

    const requestFromAPI = async () => {
        
        const responseStatus = await fetch(
            `${__SiteBase__}/scoreboard/status`,
            {
                method : 'GET'
            }
        );

        let statusBody:any;
        if (responseStatus.ok){
            statusBody = await responseStatus.json();
            setEnabled(statusBody.status); 
            setSettings(statusBody.settings);
        } else {
            console.log(responseStatus);
            return;
        }

        // Main request func
        const responseGameName = await fetch(
            `${__SiteBase__}/scoreboard/game/names`,
            {
                method : 'GET'
            }
        );

        let namebody:any;
        if (responseGameName.ok){
            namebody = await responseGameName.json();
            setNames(namebody.content);
        } else console.log(responseGameName);


        const responseGameScores = await fetch(
            `${__SiteBase__}/scoreboard/game`,
            {
                method : 'GET'
            }
        );

        if (responseGameScores.ok){
            const body = await responseGameScores.json();
            setRankings(createRankings(body.content,namebody.content,statusBody.settings));
            setScores(body.content);
        } else console.log(responseGameScores)
    }; 

    const setMode = (mode:string) => {
        setCurrent(mode);
    };

    const unlock = (name:string, value:string) => {
        setLocked(false);
        setPW(value); // set the PW to what was given as it is correct
    }

    const updateScore = (name:string, value:string) => {
        setScores(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                [current]: parseInt(value)
            }
        }));    

        refreshRankings(prev=>((prev == 0)?1:0));
    }

    const onSave = async () => {
        let response = await fetch(
            `${__SiteBase__}/scoreboard/game/score`,
            {
                method : 'POST',
                body : JSON.stringify({
                    data:scores,
                    password:pw
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) console.log(response);

        response = await fetch(
            `${__SiteBase__}/scoreboard/status`,
            {
                method : 'POST',
                body : JSON.stringify({
                    data: enabled,
                    password:pw
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) console.log(response);

    }


    useEffect(()=>{
        setRankings(createRankings(scores,names,settings))
    },[RRHandle])


    useEffect(()=>{
        requestFromAPI()
    },[]);


    /*
     * Needs to implement rankings data first and foremost.
     */
    return (
        locked ?
        <>
            <Gears key='0'>
                <div className="-left-[10vw] w-[120vw] flex justify-center items-center">
                    <PassField value={''} successFunc={unlock} boxName={"passfield"}/>
                </div>    
            </Gears>

        </>
        :
        <>
            <Gears key='0'>
                <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center w-[20vw]">
                    <div onClick={()=>{onSave()}} className="hover:brightness-110 transition-all rounded-sm w-full pentagon-left p-4 cursor-pointer bg-white">
                        <h2 style={{ color: 'black'}} className="transition-all text-right">Save</h2>
                    </div>
                    <h2>Enable public scoreboard:</h2>
                    <input type='checkbox' checked={enabled} onChange={()=>{setEnabled(enabled ? false:true)}}/>
                </div>
            </Gears>

            <Gears dir key='1'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center items-center -left-[10vw] w-[120vw]">
                        <div className='flex max-w-[96vw] gap-8'>

                            {/* Game Selector */}
                            {names.map((name,index:number)=>(
                                <div key={index} className="w-60 text-center flex items-center">
                                    <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left flex justify-center text-center p-4 cursor-pointer">
                                        <h2 style={{ color:  (name==current) ? 'white' : '#aaa' }} className="transition-all text-right">{name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                        

                        <div className={`grid grid-cols-3 grid-flow-row items-center justify-start ${(window.innerWidth>800)?"w-fit min-w-[50vw]":"w-[90vw]"} gap-x-16 text-center`}>
                            <h1 className="text-4xl " >Rank</h1>
                            <h1 className="text-4xl">Team</h1>
                            <h1 className="text-4xl">{settings[current].pointsName}</h1> {/* Need to add game settings*/}
                        </div>

                        {rankings[current].map((team:RankData,index)=>(
                            <div key={team.name} className={`grid grid-cols-3 grid-flow-row items-center justify-start ${(window.innerWidth>800)?"w-fit min-w-[50vw]":"w-[90vw]"} gap-x-16 text-center`}>    
                                <p  className="text-2xl">{team.rank}</p>
                                <p className="text-2xl">{team.name}</p>
                                <FieldSM value={team.points} commitFunc={updateScore} boxName={team.name}/>
                            </div>
                        ))}

                    </div>
            </Gears>
        </>
    );
}

export default ScoreboardAdmin;
