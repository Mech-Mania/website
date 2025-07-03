import { useEffect, useState } from "react"


const contents = [
        ['5 hours', '5 schools', '7 teams', '80+ students', '0$ entry fee'],
        ['8 hours', '10 schools', '12 teams', '120+ students', '1 champion'],
        ['8 hours', '12 schools']
    ]
const years = ['2024','2025','2026']

function Stats() {
    let last_idx = years.length-1
    let current = last_idx

    const [active, setActive] = useState(true)
    const [content, setContent] = useState(contents[1])
    const buttonClick = (val:Boolean) => {
        if (val!=active){
            setActive(!active)
        }
    }
    useEffect(()=>{
        setContent(contents[active ? 1 : 0])
    }, [active])
    return (
        <>
            <div className="flex flex-row items-center justify-center">
                {
                (current == last_idx) ? 
                // make a browser to switch between. Maybe like a Chronological scale thing. try to make better than this
                    <div className="w-1/2 pr-3">
                    <div style={{ backgroundColor: active ? '#999' : '#555' }} onClick={()=>{buttonClick(true)}} className="hover:brightness-110 transition-all w-full pentagon-left p-8 cursor-pointer">
                        <h2 style={{ color:  active ? 'white' : '#aaa' }} className="transition-all text-right">2025</h2>
                    </div>
                    </div>
                    :
                    // 
                    <div className="w-1/ pl-3">
                    <div style={{ backgroundColor: active ? '#555' : '#999' }} onClick={()=>{buttonClick(false)}} className="hover:brightness-110 transition-all w-full pentagon-right p-8 cursor-pointer">
                        <h2 style={{ color:  active ? '#aaa' : 'white' }} className="transition-all">2024</h2>
                    </div>
                    </div>
                }

            </div>
            <br/>





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