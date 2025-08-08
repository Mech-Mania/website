import { useEffect, useState } from "react"
import '../rankings.css'

function EditableInput({ value, commitFunc, boxName }:{value:any,commitFunc:any, boxName:string}) {
  const [inputValue, setInputValue] = useState(value);

  // update local when outside value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // send finished changes to parant state
  const pushChanges = () => {
    if (inputValue !== value) {
      commitFunc(boxName, inputValue);
    }
  };

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur(); // triggers onBlur
    }
  };

  return (
    <input
      className='text-2xl text-black'
      type="text"
      value={inputValue}
      name={boxName}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={pushChanges}
      onKeyDown={handleKeyDown}
    />
  );
}
export default EditableInput