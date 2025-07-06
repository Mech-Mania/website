import { useEffect, useState } from "react"
import './rankings.css'


function Overalls(props:any) {



    useEffect(()=>{

    },[])
    return (

        <>



            <div>
                <p>
                    {JSON.stringify(props.teams)}
                </p>
            </div>

        </>
    )
}

export default Overalls