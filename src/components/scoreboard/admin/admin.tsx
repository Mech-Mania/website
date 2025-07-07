import { useEffect, useState } from "react"
import Gears from "../../gears/gears"

function Admin(props:any) {

    //typescript shenanigans
    const [pw, setPW] = useState('')
    const [displayPW, setDisplayPW] = useState('flex')
    const [error, setError] = useState(<></>)

    const submit = async (str:string) => {
        const response = await fetch('/api/scoreboard/pw.js', {
            method: 'POST',
            headers: {
                "Content-Type": "text/plain",
            },
            body: str,
        });

    
        if (!response.ok) {
            setError(<p className="text-red-600">Wrong password - Please try again</p>)
            throw new Error('Failed to login');
        } else {
            setError(<></>)
        }
        

    }
    const handleKeyPress = (event:any) => {
        if (event){
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(pw);
            }
        }
    };

    useEffect(()=>{

    },[])
        
    return (

       <>

        <Gears>
            <div className='flex flex-row'>
            {error}
            <div style={{ display: displayPW }} className="flex-col lg:flex-row gap-2 rounded-full p-2 overflow-hidden bg-[#aaa]">
                <input onKeyDown={(e)=>{handleKeyPress(e)}} type="password" value={pw} onChange={(e)=>{setPW(e.target.value)}} placeholder="Passkey" className="text-center lg:text-left outline-none focus:ring focus:ring-black text-black p-4 rounded-t-full lg:rounded-l-full lg:rounded-r-none grow"></input>
                <button onClick={()=>{submit(pw)}} className="text-black p-4 rounded-b-full lg:rounded-l-none lg:rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                    Submit
                </button>
            </div>
            </div>
        </Gears>

       </>
    )
}

export default Admin