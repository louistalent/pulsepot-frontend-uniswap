import './potAI.css'
import SinglePE from '../singlepotentry/SinglePE'
import './potAI.css'

import React from 'react';

export default function PotAI(props) {
    return (
        props.entries.length > 0 ?
            <div className={props.reverse ? "pot-activityinfo__columnreverse" : "pot-activityinfo"} animate={props.animate}>
                {props.entries.map((entry_, index) => {
                    return (
                        <SinglePE entry={entry_} key={index} animate={props.animate} />
                    )
                }
                )}
            </div> :
            <div>
                WAITING FOR PARTICIPANTS...
            </div>
    )
}


