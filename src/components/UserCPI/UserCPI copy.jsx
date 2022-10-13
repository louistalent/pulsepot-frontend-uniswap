
import './userCPI.css'
import React from 'react';
import Account from '../account/Account';
import Blocky from '../blocky/Blocky';

export default function UserCPI(props) {
    return (props.account.length > 0 ?
        <div className='user-cpi card'>
            <Account accounts={props.account} />
            <div className='user-cpi__entry'>
                You've sent {(props.userTotalusd / 10 ** 10).toFixed(2)}$ to round #{(props.potRound).toString()} of Pulsepot
            </div>
            <div className='user-cpi__percentagechance'>
                <Blocky address={props.account} scale_={16} size_={1} bgColor_={props.account} spotColor_={props.account} className_={"round-identicon"} />
                You have <span>{(props.userTotalusd / props.potTotalUsdValue * 100).toFixed(2)}%</span> chance to win.
            </div>
        </div>
        :
        <div className='user-cpi card'>
            <Account account={props.account} />
            <div className='user-cpi__entry'>
                Please connect your wallet to see your pot information
            </div>
            <div className='user-cpi__percentagechance'>
                You have <span>unknown%</span> chance to win.
            </div>
        </div>
    );
}
