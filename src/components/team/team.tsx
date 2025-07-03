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
    let per_row_count:number = (window.innerWidth >= 1024) ? wideDisplay : smallDisplay
    return (
        <>
        <div className="gap-16 flex-col flex" style={{ maxHeight: "100%" }}>
            {[...Array(Math.ceil(members.length/per_row_count)).keys()].map((e,index)=>(
                <div className="items-center flex flex-row gap-16">
                
                {members.slice(index*per_row_count,(members.length+1 > index*per_row_count+per_row_count) ? index*per_row_count+per_row_count: members.length+1).map((member, loc_index) => (

                        <div>
                            {create_member(index+loc_index, member)}
                        </div>
                ))}
                </div>
            ))}
        </div>

        </>

        
    )
}
export default Team