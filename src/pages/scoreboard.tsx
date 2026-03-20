import { useState, useEffect, useRef } from "react";
import Gears from "../components/gears/gears";
import { RankData, RankingsCont, ScoreboardScores } from "../components/scoreboard/scoreboard.types";

function Scoreboard(props:{width:number}) {

    const [names,setNames] = useState<string[]>([]);
    const [games,setGames] = useState<ScoreboardScores>({});
    const [current, setCurrent] = useState<string>("overall");
    const [rankings, setRankings] = useState<RankingsCont>({overall:[]});
    
    const requestFromAPI = async () => {
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
            createRankings(body.content,namebody.content);
            setGames(body.content);
        } else console.log(responseGameScores)
    };
    


    const createRankings = (scores:ScoreboardScores, nms:string[]) => { // scores, names
        // create the rankings data structure from given data
        const rks:RankingsCont = {};
        const teamNames:string[] = Object.keys(scores);

        nms.forEach((name:string)=>{
            rks[name] = [];
        }); 

        teamNames.forEach((tname)=>{ //team name
            nms.forEach((gname)=>{ // game name
                rks[gname].push({rank:-1,name:tname, points:scores[tname][gname]} as RankData);
            });
        });
        // Sort the rankings
        nms.forEach((gname:string)=>{
            rks[gname].sort((T1:any, T2:any) => T1.points - T2.points);
            
            let curRank = 0;
            for ( let i = 0; i<rks[gname].length;i++){
                if (i ==0 || rks[gname][i-1].points != rks[gname][i].points){
                    curRank += 1;
                }
                rks[gname][i].rank = curRank;
                    
            }
        });
        
        setRankings(rks);

    };  

    const setMode = (mode:string) => {
        setCurrent(mode);
    };



    useEffect(()=>{
        requestFromAPI()
        
        setInterval(requestFromAPI,20000);
    },[]);
    
   


    /*
     * Needs to implement rankings data first and foremost.
     */
    return (
        <>
            <Gears key='1'>
                    <div className="cont gap-8 z-50 bg-black box-content rounded-[4rem] flex flex-col text-center items-center -left-[10vw] w-[120vw]">
                        <div className='flex max-w-[96vw]'>

                            {/* Game Selector */}
                            {names.map((name,index:number)=>(
                                <div key={index} className="w-48">
                                    <div onClick={()=>{setMode(name)}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                                        <h2 style={{ color:  (name==current) ? 'white' : '#aaa' }} className="transition-all text-right">{name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                        

                        <div className={`grid grid-cols-3 grid-flow-row items-center justify-start ${(window.innerWidth>800)?"w-fit min-w-[50vw]":"w-[90vw]"} gap-x-16 text-center`}>
                            <h1 className="text-4xl " >Rank</h1>
                            <h1 className="text-4xl">Team</h1>
                            <h1 className="text-4xl">Points</h1> {/* Need to add game settings*/}
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
    );
    }

    export default Scoreboard;
 
