import './stats.css'
import React from 'react'
import airdrop from "../../../assets/images/Menu icons/Stats section/airdrop.png"
import timeLeft from "../../../assets/images/Menu icons/Stats section/time-left.png"
import lottery from "../../../assets/images/Menu icons/Stats section/lottery.png"
import burn from "../../../assets/images/Menu icons/Stats section/burn.png"
import stake from "../../../assets/images/Menu icons/Stats section/stake.png"
import logo from "../../../assets/images/logo.png"



export default function Stats(props) {
    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }
    return (
        <div className='MenuContent Stats'>
            <div className='menuTitle'>
                STATS
                <div>
                    09:06:31
                    <img src={timeLeft} alt='clock icon' />
                </div>
            </div>
            <div className='menuItems'>
                <div className='menuItem'>
                    <img src={airdrop} alt="menu item" />
                    AIRDROP
                    <div>
                        {kFormatter(props.potInfo.airdrop.toFixed(1))}
                        <img src={logo} alt='clock icon' />
                    </div>
                </div>
                <div className='menuItem'>
                    <img src={lottery} alt="menu item" />
                    LOTTERY
                    <div>
                        {kFormatter(props.potInfo.lottery.toFixed(1))}
                        <img src={logo} alt='clock icon' />
                    </div>
                </div>
                <div className='menuItem'>
                    <img src={burn} alt="menu item" />
                    BURN
                    <div>
                        {kFormatter(props.potInfo.burn.toFixed(1))}
                        <img src={logo} alt='clock icon' />
                    </div>
                </div>
                <div className='menuItem'>
                    <img src={stake} alt="menu item" />
                    STAKED
                    <div>
                        {kFormatter(props.potInfo.lottery.toFixed(1))}%
                        <img src={logo} alt='clock icon' />
                    </div>
                </div>
            </div>
        </div>
    )
}
