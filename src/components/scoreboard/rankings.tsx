import { useEffect, useState } from "react"
import './rankings.css'


function Stats() {
    
    const defaults = ['Overall']
    const [games, setGames] = useState(0)

    const getGlobal = async () => {
        const response = await fetch('api/pw.js', {
                method: 'POST',
                headers: {
                    "Content-Type": "text/plain",
                },
        });
        console.log(await response.json())
    }

    return (

        <>
            <button onClick={()=>{getGlobal()}} className="text-black p-4 rounded-b-full lg:rounded-l-none lg:rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                        Submit
                    </button>

        </>
    )
}

export default Stats