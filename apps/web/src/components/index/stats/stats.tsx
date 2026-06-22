import { useEffect, useState } from "react"
import './stats.css'

const contents = [
        ['5 hours', '5 schools', '7 teams', '80+ students', '0$ entry fee'],
        ['8 hours', '10 schools', '12 teams', '120+ students', '1 champion'],
        ['10 hours', '9 schools', '13 teams', '150+ students']
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


    return (

        <>
            {/* Year box, iterates and displays each year. Will break after 2030 so if this is still around, good luck */}
            <div className="flex items-center justify-center" id='bar'>
                
                {years.map((year,index)=>(
                    <div key={index} className="w-32">
                        <div onClick={()=>{buttonClick(years.indexOf(year))}} className="hover:brightness-110 transition-all w-full p-4 cursor-pointer">
                            <h2 style={{ color:  (years.indexOf(year)==active) ? 'white' : '#aaa' }} className="transition-all text-right">{year}</h2>
                        </div>
                    </div>
                ))}
                
                
                
            </div>
            <br/>
            {/* This is where the stats live */}

            <div className="flex flex-row flex-wrap gap-4">
                {[...Array(content.length).keys()].map((e,index)=>(
                    <div key={index} className="bg-m-gray-1 rounded-lg p-8 flex flex-col items-center justify-center grow">
                        <h2 className="text-m-black">{content[index]}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Stats
