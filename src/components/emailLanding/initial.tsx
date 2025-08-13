import Gears from "../gears/gears"
function Initial() {
    return (
        <Gears>
            <div className="w-[50vw] cont h-full flex flex-col lg:flex-row items-center justify-center">
                <img id="loaderShadow" className="" src="/mechmania.svg"></img>
                <div className={"box-border w-fit overflow-hidden flex flex-row items-start justify-start"}>
                    <div className="pt-8 pl-0 lg:pt-0 lg:pl-16 lg:w-auto flex flex-col items-start justify-center">
                        <h2 className="text-white">Thanks for signing up!</h2><p className="w-full text-center lg:text-left"> <br/> If you would like to register a team, please fill out <a target="_blank" className="text-blue-400" href="https://docs.google.com/forms/d/1y7HCRmqyI9NbTK-SGDF0p1iFNeYG5clBJTr6lruMvDE">
                        this form </a> and/or send it to your club leaders and teachers. <br /> <br/>We have also sent you an email containing this information.
                        If you would like to contact us for any reason please shoot us an email at organizers@mechmania.ca (via the newly opened email chain). Have a great day!</p>
                    </div>
                </div>
            </div>
        </Gears>
    )
}

export default Initial