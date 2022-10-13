import './account.css'
import React from 'react';
import Blocky from '../blocky/Blocky';

export default function Account(props) {
    let address__ = props.accounts
    return (
        props.accounts ?
            (<div className="user-address">
                <span>
                    <Blocky address={(address__.toLowerCase().toString())} size={""} />
                    {/* <Blocky address={address__.toLowerCase().toString()} scale_={16} size_={1} bgColor_={address__} spotColor_={address__.toLowerCase().toString()} className_={"round-identicon"} /> */}
                </span>
                <span className="playeraddress">{(props.accounts.toString().substring(0, 5)) + "..." + props.accounts.toString().slice(-5)}</span>
            </div>)
            :
            (<div style={{ color: "red" }}>
                Not connected
            </div>)
    )
}
