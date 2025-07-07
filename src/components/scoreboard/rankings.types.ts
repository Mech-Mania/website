// This is how data is set up in the firebase
export type matchData = {
    A1: string[],
    A2: string[],
    Points:{
        A1: number,
        A2: number
    },
    Status: string,
}

export type gameSettings = {
    PointsName: string,
    Descending: boolean
}

export type gameType = {
    Matches: matchData[],
    Name: string
    Points:{
        [key: string]: number;
    },
    Settings: gameSettings
}

export type gameCont = {
    Data: gameType[],
    Names: string[],
}