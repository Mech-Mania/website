import Member from './member';
import Wheel from '../../gears/wheel';

// All image files must be png format
const members = [
    'Gavin William Lyle Heatherington',
    'My Lan Tight',
    'Taran Flora',
    'Daniel Li', 
    'Alex Edwards',
    'Yusef Soror',
    'Junpei Ariizumi',
    'Vivienne Hardy',
    'Ali Bagheri',
    'Victor Jiao',
    'Suvethan Ravichandran',
    'Amy Zhang'
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
    // Takes members and automatically finds their images and positions them
    let per_row_count:number = (window.innerWidth >= 1024) ? wideDisplay : smallDisplay
    return (
        <>
        <div className="gap-16 flex-col flex" style={{ maxHeight: "100%" }}>
            {[...Array(Math.ceil(members.length/per_row_count)).keys()].map((e,index)=>(
                <div className="items-center flex flex-row gap-16" key={index}>
                
                {members.slice(index*per_row_count,(members.length+1 > index*per_row_count+per_row_count) ? index*per_row_count+per_row_count: members.length+1).map((member, loc_index) => (

                        <div key={loc_index}>
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
