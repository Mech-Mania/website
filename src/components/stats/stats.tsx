import { useEffect, useState } from "react"
import './stats.css'
import { eventNames } from "process"

const contents = [
        ['5 hours', '5 schools', '7 teams', '80+ students', '0$ entry fee'],
        ['8 hours', '10 schools', '12 teams', '120+ students', '1 champion'],
        ['8 hours', '10+ schools', 'TBD teams', 'TBD students', '1 champion']
    ]
const years = ['2024','2025','2026']

function Stats() {
    let last_idx = years.length-1
    let current = last_idx

    const [active, setActive] = useState(current)
    const [content, setContent] = useState(contents[1])
    const buttonClick = (val:number) => {
        setActive(val)
    }
    useEffect(()=>{
        setContent(contents[active])
    }, [active])

    // Will need to make a better system for storing the stats from each year but I don't feel like it, so If I don't get to it good luck next website guy! - 2025/26 website guy

    return (

        <>
            {/* Year box, iterates and displays each year. Will break after 2030 so if this is still around, good luck */}
            <div className="flex items-center justify-center" id='bar'>
                
                {years.map((year,index)=>(
                    <div className="w-32">
                    <div  onClick={()=>{buttonClick(years.indexOf(year))}} className="hover:brightness-110 transition-all w-full pentagon-left p-4 cursor-pointer">
                        <h2 style={{ color:  (years.indexOf(year)==active) ? 'white' : '#aaa' }} className="transition-all text-right">{year}</h2>
                    </div>
                    </div>
                ))}
                
                
                
            </div>
            <br/>
            {/* This is where the stats live */}

            <div className="flex flex-row flex-wrap gap-4">
                {[...Array(content.length).keys()].map((e,index)=>(
                    <div key={index} className="bg-white rounded-lg p-8 flex flex-col items-center justify-center grow">
                        <h2 className="text-black">{content[index]}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Stats