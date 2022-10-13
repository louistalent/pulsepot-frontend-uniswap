import './lastPWI.css'
import React from 'react';
import trophy from '../../assets/images/trophy.png'
import plsp from "../../assets/images/logo.png"
import burn from "../../assets/images/burn.png"
require('dotenv').config()

const REACT_APP_NATIVE_TOKEN = process.env.REACT_APP_NATIVE_TOKEN
const REACT_APP_PLSP_SYMBOL = process.env.REACT_APP_PLSP_SYMBOL
export default function LastPWI(props) {
    let ratio = 0.006
    return (
        props.winner.returnValues ?
            <div className='lastpwi'>
                <div className='lastpwi-info'>
                    <div className='lastpwi-info__crown'>

                        <span>< img src={burn} style={{ "width": "10px" }} alt='burn icon' />{((((props.winner.returnValues.potValue)) / (props.tokens.filter((token) => { return token.name === REACT_APP_NATIVE_TOKEN }).map((token) => { return token.price })) * ratio).toFixed(4))} {REACT_APP_PLSP_SYMBOL}</span>
                        < img src={trophy} alt='trophy icon' />
                        <span style={{ "paddingRight": "5px" }}>< img src={plsp} style={{ "width": "10px" }} alt='plsp icon' />{parseFloat((1 + parseFloat(props.winner.returnValues.potValue) / (10 ** 12)).toFixed(1))} {REACT_APP_PLSP_SYMBOL}</span>
                    </div>
                    <div className='lastpwi-info__congrat'>Congratulations <span>{(props.winner.returnValues.winner).toString().substring(0, 5) + "..." + (props.winner.returnValues.winner).toString().slice(-5)}</span></div>
                    <div className='lastpwi-info__won'>Won {((props.winner.returnValues.amountWon) / 10000000000).toFixed(1)}$ with {(((props.winner.returnValues.amount) / (props.winner.returnValues.potValue)) * 100).toFixed(1)}% chance</div>
                    <div className='lastpwi-info__txlink'><a href={"https://rinkeby.etherscan.io/tx/" + props.winner.transactionHash} target={"_blank"}> Transaction link</a></div>
                </div>
            </div > :
            <div className='lastpwi'>
                <div className='lastpwi-info'>
                    <div className='lastpwi-info__crown'>
                        <img src={trophy} alt='trophy icon' />
                    </div>
                    <div className='lastpwi-info__congrat'>Unable to get lalest winner <span>0x000...00000</span></div>
                    <div className='lastpwi-info__won'>Unable to get latest winner</div>
                    <div className='lastpwi-info__txlink'><a href="/#"> Transaction link</a></div>
                </div>
            </div >
    );
}
