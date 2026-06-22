
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
        'Alex Edwards',
        'Junpei Ariizumi',
        'Vivienne Hardy',
        'Suvethan Ravichandran',
        'Victor Jiao',
        'Gavin Heatherington',
        'My Lan Tight',
        'Ali Bagheri',
        'Yusef Soror',
    ],
    [ //2027
        'Alex Edwards',
        'Vivienne Hardy',
        'Victor Jiao',
        'Weston Lalonde',
        'Edward Zhang',
        'Kush Suthar',
        'Yaning Zhu',
        'Ibrahim Nasfi',
        'Yusef Soror'

    ]
];

export const startYear:number = 2024;
export const currentYear:number = 2027;


export const getTeam = (year:number):string[] => {
    return teams[year-startYear];
};

export const getAllTeams = ():string[][] => {
    return [...teams].reverse();
};
