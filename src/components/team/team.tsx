function Team(props:any) {
    return (
        <>
            <div className="w-full h-full aspect-square">
                <img className="min-w-full min-h-full" src={'/team'+props.src}></img>
            </div>
        </>
    )
}

export default Team