import { useState } from "react";
import { IconContext } from "react-icons";
import { FaCopy } from "react-icons/fa";
import VisitsLineChart from "../components/graph/graph";

function Dash() {
    const [pw, setPW] = useState('')
    const [emails, setEmails] = useState([])
    const [visits, setVisits] = useState({})
    const [displayPW, setDisplayPW] = useState('flex')

    const submit = async (str:string) => {
        const emailData = await fetch('api/emails', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password:str}),
        });

    
        if (!emailData.ok) {
            throw new Error('Failed to login');
        }
        const emails = (await emailData.json()).emails;



        const visitData = await fetch('api/visits',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({password:str})
        })


        if (!visitData.ok) {
            throw new Error('Failed to login');
        }
        const visits = (await visitData.json()).visits;

        let filteredVisits:{[key:string]:number} = {}
        for (const visit of Object.keys(visits)){
            const num:number = visits[visit]
            filteredVisits[visit.slice(1)] = num
        }

        setEmails(emails)
        setVisits(filteredVisits)
        setDisplayPW('none')
        setPW('')
    }
    const handleKeyPress = (event:any) => {
        if (event){
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(pw);
            }
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(emails.join(' '));
    }

    return (
        <>
         {/* Password */}
            <div className="min-h-screen w-screen flex flex-col gap-8 items-center justify-center p-16 items-start justify-center">
                <div style={{ display: displayPW }} className="flex-col lg:flex-row gap-2 rounded-full p-2 overflow-hidden bg-[#aaa]">
                    <input onKeyDown={(e)=>{handleKeyPress(e)}} type="password" value={pw} onChange={(e)=>{setPW(e.target.value)}} placeholder="Passkey" className="text-center lg:text-left outline-none focus:ring focus:ring-black text-black p-4 rounded-t-full lg:rounded-l-full lg:rounded-r-none grow"></input>
                    <button onClick={()=>{submit(pw)}} className="text-black p-4 rounded-b-full lg:rounded-l-none lg:rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                        Submit
                    </button>
                </div>

            {/* Emails */}
                <div className="flex w-full flex-col gap-8 items-center justify-center grow gap-4 p-8">
                    <div className="flex w-full flex-col border-8 border-solid border-[#444]">
                        <div className="w-full p-4 gap-8 flex flex-row items-center justify-center">
                            <h3 className="grow">{"Emails: "+emails.length}</h3>
                            <div onClick={()=>{copy()}} className="bg-[#444] p-2 hover:bg-[#666] transition-all cursor-pointer">
                                <IconContext.Provider value={{ color: "#999", size: "2rem" }}>
                                    <FaCopy/>
                                </IconContext.Provider>
                            </div>
                        </div>
                        <hr/>
                    </div>

            {/*  */}
                    <div className="grow w-full border-8 border-solid border-[#444] p-8 gap-4 flex flex-col">
                        <h3>{"Visits: "+Object.values(visits as Record<string, number>).reduce((partialSum, a) => partialSum + a,0)}</h3>
                        <hr/>
                        <VisitsLineChart visits={visits}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dash;