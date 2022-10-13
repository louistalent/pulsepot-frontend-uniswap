import './previousPot.css'
import LastPWI from "../../components/lastpotwinnerinfo/LastPWI"
import PotAI from "../../components/potActivityInfo/PotAI"

import React from 'react';

export default function PreviousPot(props) {
    return (
        <div className='PreviousPot'>
            <LastPWI winner={props.winner} tokens={props.tokens} />
            <div className="leftside-potinfo__potentries">
                <PotAI entries={props.entries} reverse={true} />
            </div>
            <span className="leftside-potinfo__potstarted bold-7">Round #{props.winner.returnValues.potRound} has ended</span>
        </div>
    );
}

