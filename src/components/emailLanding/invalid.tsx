import Gears from "../gears/gears"
function Invalid() {
    return (
        <Gears>
            <div className="w-[50vw] cont h-full flex flex-col lg:flex-row items-center justify-center">
                <img id="loaderShadow" className="" src="/mechmania.svg"></img>
                <div className={"box-border w-fit overflow-hidden flex flex-row items-start justify-start"}>
                    <div className="pt-8 pl-0 lg:pt-0 lg:pl-16 lg:w-auto flex flex-col items-start justify-center">
                        <h2 className="text-white">Hello!</h2><p className="w-full text-center lg:text-left"><br/>Unfortunately your access link seems to be either invalid or outdated. Please sign up for the emailing list or, if you have done that, check the email that was sent to you as it contains all the data that was here.</p>
                    </div>
                </div>
            </div>
        </Gears>
    )
}

export default Invalid