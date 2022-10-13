import './lastPWI.css'
import React from 'react';
import trophy from '../../assets/images/trophy.png'

export default function LastPWI(props) {
    return (
        props.latestWinner.returnValues ?
            <div className='lastpwi'>
                <div className='lastpwi-info'>
                    <div className='lastpwi-info__crown'>
                        <img src={trophy} />
                    </div>
                    <div className='lastpwi-info__congrat'>Congratulations <span>{(props.latestWinner.returnValues.winner).toString().substring(0, 5) + "..." + (props.latestWinner.returnValues.winner).toString().slice(-5)}</span></div>
                    <div className='lastpwi-info__won'>Won {((props.latestWinner.returnValues.amount) / 100).toFixed(1)}$ with {(((props.latestWinner.returnValues.amount) / (props.latestWinner.returnValues.potValue)) * 100).toFixed(1)}% chance</div>
                    <div className='lastpwi-info__txlink'><a href="#"> Transaction link</a></div>
                </div>
            </div > :
            <div className='lastpwi'>
                <div className='lastpwi-info'>
                    <div className='lastpwi-info__crown'>
                        <img src={trophy} />
                    </div>
                    <div className='lastpwi-info__congrat'>Unable to get lalest winner <span>0x000...00000</span></div>
                    <div className='lastpwi-info__won'>Unable to get latest winner</div>
                    <div className='lastpwi-info__txlink'><a href="#"> Transaction link</a></div>
                </div>
            </div >

    );
}
