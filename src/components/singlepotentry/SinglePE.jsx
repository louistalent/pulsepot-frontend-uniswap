import './singlePE.css'
import React from 'react';
import Web3 from 'web3';
import Blocky from '../blocky/Blocky';
import TokenImage from '../../components/TokenImage';
export default function SinglePE(props) {
    if (!props.entry.returnValues) {
        return (<div>Loading</div>)
    }
    var address__ = props.entry.returnValues["userAddress"];
    return (
        <div className={props.animate !== undefined ? props.animate + " singlepe" : "singlepe"}>
            <span>
                <Blocky address={(props.entry.returnValues["userAddress"]).toLowerCase().toString()} size={""} />
                <Blocky address={address__.toLowerCase().toString()} scale_={16} size_={1} bgColor_={address__.toLowerCase().toString()} spotColor_={address__.toLowerCase().toString()} className_={"round-identicon"} />
            </span>
            <span>{(props.entry.returnValues["userAddress"]).toString().substring(0, 5) + "..." + (props.entry.returnValues["userAddress"]).toString().slice(-5)}
            </span>
            <span className='singlepe-price  bold-7'>${(props.entry.returnValues["usdValue"] / 10000000000).toFixed(2)}
            </span>
            <span className='singlepe-amount'>{parseFloat(parseFloat(Web3.utils.fromWei(props.entry.returnValues["amount"], "ether")).toFixed(5))}</span>
            <TokenImage token={props.entry.returnValues["tokenName"].toString()} class_name={'single-pe__tokenimage'} />
        </div>
    );
}
