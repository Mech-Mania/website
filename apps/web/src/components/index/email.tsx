import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
function Email() {

    const navigate = useNavigate()




    return (
        <div className="cont max-w-[95vw] pl-4 lg:pl-0">
            <h2>What is MechMania?</h2>
            <br/>
            <p>MechMania is a <strong>robotics competition</strong>, run by high school students for high school students. This coming May, 120+ students from 12 schools across Waterloo Region will join us for <strong>8 hours of workshops, lessons, networking, and exciting robotics challenges</strong>.</p>
            <br/>
            <br/>
            <p>Interested in participating? Please contact us at <a className="text-m-accent underline " href="mailto:organizers@mechmania.ca">organizers@mechmania.ca</a>, and join our <a className="text-m-accent underline" target="_blank" href="https://discord.gg/z5pcMevHpK">Discord</a>.</p>
            <br/>
            <hr/>
            <br/>
        </div>
    );
}

export default Email
