import Gears from "../components/gears/gears";
import PastTeam from "../components/index/team/pastTeam";
import Team from "../components/index/team/teamComp";
import { getAllTeams, getTeam, startYear } from "../components/index/team/team.names";

function TeamPage() {

    



    return (
        <>  

        <Gears>
            <div className="items-center justify-center w-full cont gap-8 z-50 relative box-content rounded-[4rem] flex flex-col">
                <div className="flex flex-col w-full">
                    <h2>Meet our team!</h2>
                    <br/>
                    <div className="h-16"/>
                        <Team/>
                    <div className="h-16"/>
                </div>
            </div>
        </Gears>

        <Gears dir>
            <div className="flex flex-col gap-8 justify-items-center flex-wrap">
                <div className={`flex ${(window.innerWidth > 1024) ? "flex-row gap-32" : "flex-col gap-16"} justify-center items-start`}>
            
                    {getAllTeams().map((team:string[], index:number)=>(
                        <PastTeam names={team} year={startYear+index}/>
                    ))}
                </div>
            </div>
        </Gears>

        </>
    );
    }

    export default TeamPage;
