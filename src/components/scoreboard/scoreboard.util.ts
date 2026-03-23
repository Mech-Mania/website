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

// Use localstorage to cache data so that reads from db don't need to happen as often

export const cacheData = (scores:ScoreboardScores, settings:ScoreboardSettings, enabled:boolean, genCount:number, gameNames:string[]) => {
    localStorage.setItem("sb_scores",JSON.stringify(scores));
    localStorage.setItem("sb_settings", JSON.stringify(settings));
    localStorage.setItem("sb_enabled", `${enabled}`);
    localStorage.setItem("sb_genCount", `${genCount}`); 
    localStorage.setItem("sb_gnames",JSON.stringify(gameNames));
};


export const verifyGenCount = async (passedGenCount:number):Promise<boolean> => {
    const genCount = Number.parseInt(localStorage.getItem("sb_genCount") || '-1');
    
    if (genCount === passedGenCount) return true;
    
    localStorage.setItem("sb_genCount", `${passedGenCount}`);

    return false;
};

export const loadCache = (
    setScore: (value: ScoreboardScores) => void,
    setSettings: (value: ScoreboardSettings) => void,
    setEnabled: (value: boolean) => void,
    setRankings: (value: RankingsCont) => void,
    setNames: (value: string[]) => void,
) => {
    
    // Will throw error downstream if these conditions are null. Handled elsewhere
    const scores:ScoreboardScores = JSON.parse(localStorage.getItem("sb_scores")||"{}");     
    const settings:ScoreboardSettings = JSON.parse(localStorage.getItem("sb_settings")||"{}"); 
    const enabled:boolean = (localStorage.getItem("sb_enabled")||"false")==="true"; 
    const gameNames:string[] = JSON.parse(localStorage.getItem("sb_gnames")||"[\"overall\"]"); 
    const rks:RankingsCont = createRankings(scores,gameNames,settings);

    setScore(scores);
    setSettings(settings);
    setEnabled(enabled);
    setNames(gameNames);
    setRankings(rks);
};
