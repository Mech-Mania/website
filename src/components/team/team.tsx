function Team(props:any) {
    return (
        <>
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src={'/team'+props.src}></img>
            </div>
            <div className="opacity-0 hover:opacity-100 transition-all p-8 flex items-center justify-center bg-[#000a] absolute w-full h-full">
                <p className="pointer-events-none text-center text-[0.8rem] text-white">{props.name}</p>
            </div>
        </>
    )
}

export default Team