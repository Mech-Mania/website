import Navbar from "./navbar"
function Footer(props:{scrollRef:any,marginTop:number}) {


    return (
        <>
        {/* To all future website people: Add your name to this 'by' section. Keep making it better as you go */}
        <div className="my-20 flex flex-col gap-8 justify-items-center items-center flex-wrap">

            {/* <div className="h-[0.125rem] w-[70vw] bg-[#444]"/> */}
            {/* todo: Add the real links */}
            
            <div className={`flex ${(window.innerWidth > 1024) ? "flex-row gap-32" : "flex-col gap-16"} justify-center items-center`}>

                <div className="flex flex-col w-48">
                    <p>
                        Made with love by the Mechmania Team
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <h3>Pages</h3>
                    <div className="h-[0.125rem] w-[100%] bg-gradient-to-r from-[#444] to-[#444]"/>
                    <Navbar scrollRef={props.scrollRef} marginTop={props.marginTop} unformatted={true}/> 
                    {/* Unformatted navbar */}
                </div>

                <div className="flex flex-col gap-1">
                    {/* Todo, add images to this */}
                    <h3>Contact</h3>
                    <div className="h-[0.125rem] w-[100%] bg-gradient-to-r from-[#444] to-[#444]"/>


                    <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzCbZtZTTMCLGpkFmvFpBNVkdZZJNmbSfshSkxKGfrBNSFnLhTHWkMslthLwvSzctQJFwJF" target="_blank" className="flex flex-row gap-2 align-middle ease-out hover:brightness-[25%] duration-200 cursor-pointer group">
                        <img src="/icons/emailLogo.svg" className="w-6 h-6 group-hover:scale-110 ease-out duration-200"/>
                        <p>organizers@mechmania.ca</p>
                    </a>
                    
                    {/* insta */}
                    <a href="https://www.instagram.com/mechmaniakw/" target="_blank" className="flex flex-row gap-2 align-middle ease-out hover:brightness-[25%] duration-200 cursor-pointer group">
                        <img src="/icons/instagramLogo.svg" className="w-6 h-6 group-hover:scale-110 ease-out duration-200"/>
                        <p>mechmaniakw</p>
                    </a>

                    {/* github */}
                    <a href="https://github.com/Mech-Mania" target="_blank" className="flex flex-row gap-2 align-middle ease-out hover:brightness-[25%] duration-200 cursor-pointer group">
                        <img src="/icons/githubLogo.svg" className="w-6 h-6 group-hover:scale-110 ease-out duration-200"/>
                        <p>mech-mania</p>
                    </a>

                    {/* youtube */}
                    <a href="https://www.youtube.com/@MechMania-KW" target="_blank" className="flex flex-row gap-2 align-middle ease-out hover:brightness-[25%] duration-200 cursor-pointer group">
                        <img src="/icons/youtubeLogo.svg" className="w-6 h-6 group-hover:scale-110 ease-out duration-200"/>
                        <p>mechmania-kw</p> 
                    </a>
                    
                    {/* discord */}
                    <a href="https://discord.gg/z5pcMevHpK" target="_blank" className="flex flex-row gap-2 align-middle ease-out hover:brightness-[25%] duration-200 cursor-pointer group">
                        <img src="/icons/discordLogo.svg" className="w-6 h-6 group-hover:scale-110 ease-out duration-200"/>
                        <p>our discord server!</p> 
                    </a>
                </div>
                
            </div>

            <div className="">
                <p>mechmania 2025</p>
            </div>

        </div>
        </>
    )
}

export default Footer
