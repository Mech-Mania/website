
function PastTeam(props:{names:string[], year:number}) {
    return (
        <>
            <div className="flex flex-col gap-1">
                {/* Todo, add images to this */}
                <h3>{props.year}</h3>
                <div className="h-[0.125rem] w-[100%] bg-[#444] "/> 
                
                {props.names.map((name:string)=> (
                    <div className="">
                            <p>{name}</p>
                    </div>
                ))}

            </div>
            
        </>
    )
}

export default PastTeam; 
