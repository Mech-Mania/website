import { useEffect, useState } from "react"
import './rankings.css'
import type {rankData} from './overalls.types'
import type { gameSettings } from "./rankings.types"

function Overalls(props:any) {

    //typescript shenanigans
    let x:rankData[] = []
    const [rankings, setRankings] = useState(x)


    const createRankings = async (teams:any) => {


        let ranktemp:rankData[] = []
        for (const team of Object.keys(teams)){
            ranktemp.push({rank:-1, name:team, points:teams[team]})
        }
        
        
        ranktemp.sort((T1:any, T2:any) => T1.points - T2.points);
        ranktemp.reverse()

        let curRank = 0
        for (let i = 0;i<ranktemp.length;i++){
            if (i ==0 || ranktemp[i-1].points != ranktemp[i].points){
                curRank += 1
            }
            ranktemp[i].rank = curRank
                
        }
        
        setRankings(ranktemp)
    }


    useEffect(()=>{
        createRankings(props.teams)

    },[])

    useEffect(()=>{createRankings(props.teams)},[props.teams])
    
        
    return (

        <>



            <div className="grid grid-cols-3 grid-flow-row items-center justify-start w-full gap-x-16 text-center">
                <h1 className="text-4xl " >Rank</h1>
                <h1 className="text-4xl">Team</h1>
                <h1 className="text-4xl">Score</h1>
            </div>

            {rankings.map((team:rankData,index)=>(
            <div className="grid grid-cols-3 grid-flow-row items-center justify-start w-full gap-x-16 text-center">    
                <p className="text-2xl">{team.rank}</p>
                <p className="text-2xl">{team.name}</p>
                <p className="text-2xl">{team.points}</p>
            </div>
            ))}



        </>
    )
}

export default Overalls