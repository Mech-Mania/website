
const teams:string[][] = [
    [ // 2024
        "Ashwin Rajakrishna",
        "Kohei Ariizumi",
        "Taran Flora", 
        "Khaled Abu Mazen",
        "Declan Reardon",
        "Taha Canturk",
        "Henry Lin",
    ],     
    [ // 2025
        "Taran Flora",
        "Amit Weis",
        "Daniel Li",
        "William Babapulle",
        "My Lan Tight",
        "Gavin Heatherington",
        "Derek Gou",
        "Loukas Juritsch",
    ], 
    [ // 2026
        'Taran Flora',
        'Daniel Li', 
        'Junpei Ariizumi',
        'Vivienne Hardy',
        'Alex Edwards',
        'Suvethan Ravichandran',
        'Yusef Soror',
        'Victor Jiao',
        'Gavin Heatherington',
        'My Lan Tight',
        'Amy Zhang',
        'Ali Bagheri',
    ]
];

export const startYear:number = 2024;
export const currentYear:number = 2026;


export const getTeam = (year:number):string[] => {
    return teams[year-startYear];
};

export const getAllTeams = ():string[][] => {
    return teams;
};
