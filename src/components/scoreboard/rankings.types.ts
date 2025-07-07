export type matchData = {
    A1:string[],
    A2:string[],
    Points:{
        A1:number,
        A2:number
    },
    Status:string,
}

export type gameType = {
    Matches: matchData[],
    Name:string
    Points:{
        [key: string]: number;
    }
}

export type gameCont = {
    Data:gameType[],
    Names:string[],
}