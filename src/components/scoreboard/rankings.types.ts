// This is how data is set up in the firebase
export type matchData = {
    A1: string,
    A2: string
}
export type Settings = {
    descending:boolean,
    pointsName:string
}

export type gameCont = {
    Data: {
        [key:string]:matchData
    },
    Names: string[],
    Points: {
        [key:string]:{
            [key:string]:number
        }
    },
    Settings: {
        [key:string]: Settings
    }

}
