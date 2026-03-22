import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import { RankData, RankingsCont, ScoreboardScores, ScoreboardSettings } from "../components/scoreboard/scoreboard.types";
import { createRankings } from "../components/scoreboard/scoreboard.util";

function Scoreboard(props:{width:number}) {

    const [names,setNames] = useState<string[]>([]);
    const [games,setGames] = useState<ScoreboardScores>({});
    const [current, setCurrent] = useState<string>("overall");
    const [rankings, setRankings] = useState<RankingsCont>({overall:[]});
    const [enabled, setEnabled] = useState<boolean>(false);
    const [settings, setSettings] = useState<ScoreboardSettings>({overall:{pointsName:"Points",descending:true}});

    const requestFromAPI = async () => {
        // Keep in mind I may want a universal header to see the latest change from 
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
            
            if (!statusBody.status) return;
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
            `${__SiteBase__}/scoreboard/score`,
            {
                method : 'GET'
            }
        );

        if (responseGameScores.ok){
            const body = await responseGameScores.json();
            setRankings(createRankings(body.content,namebody.content,statusBody.settings));
            setGames(body.content);
        } else console.log(responseGameScores)
    };
    



    const setMode = (mode:string) => {
        setCurrent(mode);
    };



    useEffect(()=>{
        requestFromAPI()
        
        setInterval(requestFromAPI,50000);
    },[]);
    
   


    /*
     * Needs to implement rankings data first and foremost.
     */
    return (
        enabled ? 
        <>
            <Gears key='0'>
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
                                <p className="text-2xl">{team.rank}</p>
                                <p className="text-2xl">{team.name}</p>
                                <p className="text-2xl">{team.points}</p>
                            </div>
                        ))}

                    </div>
            </Gears>
        </>
        :
        <>
            <Gears key='1'>
                <p className="-left-[10vw] w-[120vw] flex justify-center items-center">
                    The scoreboard is not available at this time
                </p>
            </Gears>
        </>
    );
}

export default Scoreboard;
 
