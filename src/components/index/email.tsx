import {useState} from 'react';
function Email() {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(<></>)


    const handleKeyPress = (event:any) => {
        if (event){
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(email);
            }
        }
    };

    const submit = async (str: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(str)){
            const response = await fetch(`${__SiteBase__}/emails/submit`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({content: str}),
            })

    
            if (!response.ok) {
                setError(<p className="text-red-600">An error occurred</p>)
                setTimeout(function(){setError(<></>)}, 5000)
                
            }
            else {
                const data = await response.json()
                if ([400,429].includes(data.status)){
                    setError(<p className="text-red-600">{data.message}</p>)
                    setTimeout(function(){setError(<></>)}, 5000)
                    return
                }
                setEmail('')
                setError(<p className="text-lime-400">Success! Please check your email to confirm.</p>)
                setTimeout(function(){setError(<></>)}, 5000)
            }
        } else {
            setError(<p className="text-red-600">Invalid Email</p>)
            setTimeout(function(){setError(<></>)}, 5000)
        }
    }



    return (
        <div>
            <h2>What is MechMania?</h2>
            <br/>
            <p>MechMania is a <strong>robotics competition</strong>, run by high school students for high school students. This coming May, 120+ students from 12 schools across Waterloo Region will join us for <strong>8 hours of workshops, lessons, networking, and exciting robotics challenges</strong>.</p>
            <br/>
            {error}
            <div className="mt-2 flex flex-col lg:flex-row gap-2 rounded-full p-2 overflow-hidden bg-[#aaa]">
                <input onKeyDown = {(e)=>{handleKeyPress(e)}} value={email} onChange = {(e)=>{setEmail(e.target.value)}} placeholder="Enter your email to register!" className="text-center lg:text-left outline-none focus:ring focus:ring-black text-black p-4 rounded-t-full lg:rounded-l-full lg:rounded-r-none grow"></input>
                <button onClick = {()=>{submit(email)}} className="text-black p-4 rounded-b-full lg:rounded-l-none lg:rounded-r-full bg-white outline-none focus:ring focus:ring-black">
                    Submit
                </button>
            </div>
            <br/>
            <hr/>
            <br/>
        </div>
    );
}

export default Email