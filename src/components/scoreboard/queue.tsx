import { useEffect, useState } from "react"
import './rankings.css'


function Queue(props:any) {



    useEffect(()=>{

    },[])
    return (

        <>



            <table className="table-auto items-center justify-start w-full ">
                <thead>
                    <tr className="flex items-center justify-center gap-x-16 text-center">
                        <th>
                            <h1 className="text-4xl ">Position</h1>

                            <p className="text-2xl">1</p>
                        </th>
                        <th>
                            <h1 className="text-4xl">Status</h1>

                            <p className="text-2xl">Queued</p>
                        </th>
                        <th>
                            <h1 className="text-4xl">A1</h1>

                            <p className="text-2xl">Team 1, Team2</p>
                        </th>
                        <th>
                            <h1 className="text-4xl">A2</h1>

                            <p className="text-2xl">Team 3, Team 4</p>
                        </th>
                        <th>
                            <h1 className="text-4xl">Score</h1>

                            <p className="text-2xl">TBD</p>
                        </th>
                    </tr>
                </thead>
            </table>

        </>
    )
}

export default Queue