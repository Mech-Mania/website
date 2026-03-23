import { useEffect, useState } from "react"

function PassField({ value, successFunc, boxName }:{value:any,successFunc:any, boxName:string}) {
    const [inputValue, setInputValue] = useState(value);
    let delayPeriod = false
    // update local when outside value changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // send finished changes to parant state
    const pushChanges = async () => {
        if (delayPeriod) { // This is to fix a bug where upon pressing enter the function would trigger twice and duplicate
            return
        }
        
        
        const response = await fetch(`${__SiteBase__}/password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'password':inputValue}),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        if (data.result != true) return;

        delayPeriod = true
        if (inputValue !== value) {
            successFunc(boxName, inputValue);
        }
        setTimeout(()=>{
            delayPeriod = false
        },1000)
    };

    const handleKeyDown = (e:any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur(); // triggers onBlur
        }
    };

    return (
        <div className="w-full flex justify-center flex-col items-center">
            <div className="flex flex-col lg:flex-row gap-2 rounded-full p-2 overflow-hidden bg-[#aaa]">
                <input 
                    onKeyDown={(e)=>{handleKeyDown(e)}} 
                    type="password" 
                    value={inputValue} 
                    onChange={(e)=>{setInputValue(e.target.value)}} 
                    placeholder="Passkey" 
                    className="text-center lg:text-left outline-none focus:ring focus:ring-black text-black p-4 rounded-t-full lg:rounded-l-full lg:rounded-r-none grow"
                />
                <button onClick={()=>{pushChanges()}} className="text-black p-4 rounded-b-full lg:rounded-l-none lg:rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                    Submit
                </button>
            </div>
        </div>

    );
}
export default PassField 
