import { useEffect, useState } from "react"
import '../rankings.css'

function EditableTextarea({ value, commitFunc, boxName,kr }:{value:any,commitFunc:any, boxName:string,kr:any}) {
    const [inputValue, setInputValue] = useState(value);
    let delayPeriod = false
    // update local when outside value changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // send finished changes to parant state
    const pushChanges = () => {
        if (delayPeriod) { // This is to fix a bug where upon pressing enter the function would trigger twice and duplicate
            return
        }
        
        delayPeriod = true
        if (inputValue !== value) {
            commitFunc(boxName, inputValue);
        }
        setTimeout(()=>{
            delayPeriod = false
        },100)
    };

    const handleKeyDown = (e:any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.target.blur(); // triggers onBlur
        }
    };
    return (

        <textarea 
            key={boxName} 
            className='text-2xl text-black' 
            name={boxName} 
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={pushChanges}
            onKeyDown={handleKeyDown}
        >

            {inputValue}
        </textarea>
    );
}
export default EditableTextarea