import { useEffect, useState } from "react"
import Gears from "../../gears/gears"
import Rankings from "./editablerankings"
function Admin(props:any) {

    //typescript shenanigans
    const [pw, setPW] = useState('')
    const [displayPW, setDisplayPW] = useState('flex')
    const [error, setError] = useState(<></>)
    const [displayMode, setDisplayMode] = useState('Locked')

    const submit = async (str:string) => {
        const response = await fetch('/api/password', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'password':str}),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json()
        if (data.result != true){
            setError(<p className="text-red-600">Wrong password - Please try again</p>)
        } else {
            setDisplayMode('Open')
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

    const onSave = async (teams:any, gameContainer:any,enabled:boolean) => {
        const response = await fetch('/api/scoreboard', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teams: teams,
                games: gameContainer,
                enabled:enabled,
                password: pw
            }),
        });
    }
        
    return (
        (displayMode=='Locked')?
       <>
       <Gears>
            <div className="-left-[10vw] w-[120vw] flex justify-center flex-col items-center">
                
                    <>
                        {error}
                        <div style={{ display: displayPW }} className="flex-col lg:flex-row gap-2 rounded-full p-2 overflow-hidden bg-[#aaa]">
                            <input onKeyDown={(e)=>{handleKeyPress(e)}} type="password" value={pw} onChange={(e)=>{setPW(e.target.value)}} placeholder="Passkey" className="text-center lg:text-left outline-none focus:ring focus:ring-black text-black p-4 rounded-t-full lg:rounded-l-full lg:rounded-r-none grow"></input>
                            <button onClick={()=>{submit(pw)}} className="text-black p-4 rounded-b-full lg:rounded-l-none lg:rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                                Submit
                            </button>
                        </div>
                    </>
            </div>
        </Gears>
       </>
       :
       <>
       <Rankings enabled={true} onSave={onSave}/>
       </>
    )
}

export default Admin