import Gears from "../gears/gears"
function Initial() {
    return (
        <Gears>
            <div className="w-full cont h-full flex flex-col lg:flex-row items-center justify-center">
                <img id="loaderShadow" className="" src="/mechmania.svg"></img>
                <div className={"box-border w-fit overflow-hidden flex flex-row items-start justify-start"}>
                    <div className="pt-8 pl-0 lg:pt-0 lg:pl-16 lg:w-auto flex flex-col items-start justify-center">
                        <p className="w-full text-center lg:text-left">2026 - May 8th - UW @ Robohub</p>
                        <h1 className="w-full text-center lg:text-left">MechMania</h1>
                        <h2 className="w-full text-center lg:text-left">Where Metal Meets Mind </h2>

                    </div>
                </div>
                 <div className={`${(window.innerWidth < 1024) ? 'w-[120vw]' : ''}`}></div>
            </div>
        </Gears>
    )
}

export default Initial
