// This is how data is set up in the firebase

export type ScoreboardScores = {
    [key:string] : {
        [key:string] : number
    }
}

export type RankData = {
    rank:number,
    name:string,
    points:number
}

export type RankingsCont = {
    [key:string] : RankData[]
}

export type Setting = {
    pointsName:string,
    descending:boolean
}

export type ScoreboardSettings = {
    [key:string] : Setting
}
