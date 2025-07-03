import Member from './member';
import Wheel from '../gears/wheel';
function Team(props:any) {
    return (
        window.innerWidth >= 1024 ? 
        <>
        <div className="gap-16 flex-col flex" style={{ maxHeight: "100%" }}>
            <div className="items-center justify-center flex flex-row gap-16">
                <Wheel>
                    <Member name="Loukas Juritsch" src="/loukas.png"/>
                </Wheel>
                <Wheel dir>
                    <Member name="Gavin William Lyle Heatherington" src="/gavin.png"/>
                </Wheel>
                <Wheel>
                    <Member name="My Lan Tight" src="/mylan.png"/>
                </Wheel>
                <Wheel dir>
                    <Member name="Amit Weis" src="/amit.png"/>
                </Wheel>
            </div>
            <div className="items-center justify-center flex flex-row gap-16">
                <Wheel dir>
                    <Member name="Taran Flora" src="/taran.png"/>
                </Wheel>
                <Wheel>
                    <Member name="William Babapulle" src="/william.png"/>
                </Wheel>
                <Wheel dir>
                    <Member name="Daniel Li" src="/daniel.png"/>
                </Wheel>
                <Wheel>
                    <Member name="Derek Gou" src="/derek.png"/>
                </Wheel>
            </div>
        </div>
        </>

        :

        <>
        <div className="gap-16 flex-col flex" style={{ maxHeight: "100%" }}>
            <div className="items-center justify-center flex flex-row gap-16">
                <Wheel>
                    <Member name="Loukas Juritsch" src="/loukas.png"/>
                </Wheel>
                <Wheel dir>
                    <Member name="Gavin William Lyle Heatherington" src="/gavin.png"/>
                </Wheel>
            </div>
            <div className="items-center justify-center flex flex-row gap-16">
                <Wheel dir>
                    <Member name="My Lan Tight" src="/mylan.png"/>
                </Wheel>
                <Wheel>
                    <Member name="Amit Weis" src="/amit.png"/>
                </Wheel>
            </div>
            <div className="items-center justify-center flex flex-row gap-16">
                <Wheel>
                    <Member name="Taran Flora" src="/taran.png"/>
                </Wheel>
                <Wheel dir>
                    <Member name="William Babapulle" src="/william.png"/>
                </Wheel>
            </div>
            <div className="items-center justify-center flex flex-row gap-16">
                <Wheel dir>
                    <Member name="Daniel Li" src="/daniel.png"/>
                </Wheel>
                <Wheel>
                    <Member name="Derek Gou" src="/derek.png"/>
                </Wheel>
            </div>
        </div>
        </>
    )
}
export default Team