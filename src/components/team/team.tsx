import Member from './member';
import Wheel from '../gears/wheel';

const members = [
    'Loukas Juritsch',
    'Gavin William Lyle Heatherington',
    'My Lan Tight',
    'Amit Weis',
    'Taran Flora',
    'William Babapulle',
    'Daniel Li',
]
const wideDisplay = 4; // Amount of members shown in each row
const smallDisplay = 2;

//2
//0 4 
//

function create_member(index:number, member:string){

    return (
        index % 2 == 0 ?
        <Wheel>
           <Member name={member} src={'/' + member.split(' ')[0] + '.png'}/>
        </Wheel>
        :
        <Wheel dir>
           <Member name={member} src={'/' + member.split(' ')[0] + '.png'}/>
        </Wheel>
    )
}

function Team(props:any) {
    
    return (
        window.innerWidth >= 1024 ? 
        <>
        <div className="gap-16 flex-col flex" style={{ maxHeight: "100%" }}>
            {[...Array(Math.ceil(members.length/wideDisplay)).keys()].map((e,index)=>(
                <div className="items-center justify-center flex flex-row gap-16">
                {members.slice(index*4,(members.length+1 > index*4+4) ? index*4+4: members.length+1).map((member, loc_index) => (

                        <div>
                            {create_member(index+loc_index, member)}
                        </div>
                ))}
                </div>
            ))}
            
            {/* <div className="items-center justify-center flex flex-row gap-16">
                <Wheel>
                    <Member name="Loukas Juritsch" src="/loukas.png"/>
                </Wheel>
                <Wheel dir>
                    <Member name="Gavin William Lyle Heatherington" src="/gavin.png"/>
                </Wheel>
                <Wheel>
                    <Member name="My Lan Tight" src="/my.png"/>
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
            </div> */}
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
                    <Member name="My Lan Tight" src="/my.png"/>
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