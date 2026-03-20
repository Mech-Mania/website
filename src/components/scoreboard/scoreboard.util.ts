import { ScoreboardScores, RankingsCont, RankData, ScoreboardSettings } from "./scoreboard.types";


/*
    * Used to create a more easily parseable rankings structure from the raw score data
    * */
export const createRankings = (scores:ScoreboardScores, gameNames:string[], settings:ScoreboardSettings):RankingsCont => {
    // create the rankings data structure from given data
    const rks:RankingsCont = {};
    const teamNames:string[] = Object.keys(scores);

    gameNames.forEach((name:string)=>{
        rks[name] = [];
    }); 

    teamNames.forEach((tname)=>{ //team name
        gameNames.forEach((gname)=>{ // game name
            rks[gname].push({rank:-1,name:tname, points:scores[tname][gname]} as RankData);
        });
    });
    // Sort the rankings
    gameNames.forEach((gname:string)=>{
        rks[gname].sort((T1:any, T2:any) => T1.points - T2.points);
        
        if (settings[gname].descending) rks[gname].reverse();

        let curRank = 0;
        for ( let i = 0; i<rks[gname].length;i++){
            if (i ==0 || rks[gname][i-1].points != rks[gname][i].points){
                curRank += 1;
            }
            rks[gname][i].rank = curRank;
                
        }
    });
    
    return rks;

};  
