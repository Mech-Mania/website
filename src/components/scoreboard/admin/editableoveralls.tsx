import { useEffect, useState } from "react"
import '../rankings.css'
import type {rankData} from '../overalls.types'
import { Settings } from "../rankings.types"
function EditableOveralls({onSettingsChange, onScoreChange, teams, settings}:{onSettingsChange:any,onScoreChange:any, teams:any, settings:any}) {
    //typescript shenanigans
    let x:rankData[] = []
    const [rankings, setRankings] = useState(x)


    const handleScoreChange = (e:any) => {
        const { name, value } = e.target;

        onSettingsChange(name, value); // Pass the field name and new value to the parent
    };
    const handleSettingsChange = (e:any) => {
        const { name, value } = e.target;
        console.log('Stage 1', name, value)
        onScoreChange(name, value); // Pass the field name and new value to the parent
    };

    const createRankings = async (teams:any) => {


        let ranktemp:rankData[] = []
        for (const team of Object.keys(teams)){
            ranktemp.push({rank:-1, name:team, points:teams[team]})
        }
        
        
        ranktemp.sort((T1:any, T2:any) => T1.points - T2.points);
        if (settings.descending){
            ranktemp.reverse()
        }

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
        createRankings(teams)
    },[teams])
    useEffect(()=>{
        console.log('initiate editable')
        console.log(settings.pointsName)
    })
    useEffect(()=>{createRankings(teams)},[teams])
    
    return (

        <>



            <div className="grid grid-cols-3 grid-flow-row items-center justify-start w-full gap-x-16 text-center">
                <h1 className="text-4xl " >Rank</h1>
                
                <h1 className="text-4xl">Team</h1>
                <input type="text" className='text-4xl text-black' defaultValue={settings.pointsName} name={'pointsName'} onChange={handleSettingsChange}/>
            </div>

            {rankings.map((team:rankData,index)=>(
            <div className="grid grid-cols-3 grid-flow-row items-center justify-start w-full gap-x-16 text-center">    
                <p className="text-2xl">{team.rank}</p>
                <p className="text-2xl">{team.name}</p>
                <input type="text" className='text-2xl text-black' defaultValue={team.points} name={team.name}  onChange={handleScoreChange}/>
            </div>
            ))}



        </>
    )
}

export default EditableOveralls