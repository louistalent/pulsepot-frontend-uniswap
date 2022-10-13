import './currentPot.css'
import PotAI from "../../components/potActivityInfo/PotAI"

import React from 'react';

export default function CurrentPot(props) {
    return (
        <div className='currentPotInfo'>
            <div className="currentPotInfo__potentries ">
                <PotAI entries={props.entries} />
            </div>
            <span className="currentPotInfo__potstarted bold-7">Round #{props.round} has started</span>
        </div>
    );
}

