import { Link } from "react-router-dom";
import React from 'react'
import './navbar.css'
import Blocky from '../blocky/Blocky';
import chain from '../../assets/images/bsc.png'
import logo from '../../assets/images/logo.png'
import arrowDown from '../../assets/images/arrow-down-sign-to-navigate.png'
// import bell from '../../assets/images/Frame icons/bell.png'
// import bell_dark from '../../assets/images/Frame icons/bell-dark.png'
// import messenger from '../../assets/images/Frame icons/messenger.png'
// import messenger_dark from '../../assets/images/Frame icons/messenger-dark.png'
require('dotenv').config()

const REACT_APP_PLSP_SYMBOL = process.env.REACT_APP_PLSP_SYMBOL
// const REACT_APP_NATIVE_TOKEN = process.env.REACT_APP_NATIVE_TOKEN
export default function Navbar(props) {
    return (

        <div className='Navbar'>
            <div className='nbContent1'>
                <div className='card'>
                    1 {REACT_APP_PLSP_SYMBOL} = ${(parseFloat(props.APP_PLSP) / (10 ** 10).toFixed(2))}
                </div>
                <div className='card hover'>
                    <img src={chain} alt='chain logo' />
                    <img src={arrowDown} alt='navigation logo' />
                </div>
            </div>
            <div >
                <div className='nbContent2'>

                    <Link to="/pphase" >
                        <div className='nbContent2-pphase card hover'>
                            <div>P-PHASE</div>
                            <img src={logo} alt="alarm clock" />
                            <div>382.32</div>

                        </div>
                    </Link>
                    <div className={props.isDarkMode ? 'nbContent2-connect-dark hover card ' : 'nbContent2-connect hover'} onClick={() => {
                        props.connectWallet()
                    }}>
                        {props.userInfo.account ?
                            <div>
                                <Blocky address={(props.userInfo.account.toLowerCase().toString())} size={""} />
                                {(props.userInfo.account.toString().substring(0, 5)) + "..." + props.userInfo.account.toString().slice(-5)}
                            </div>
                            :
                            <div>
                                Connect
                            </div>
                        }
                    </div>
                    {/* <img src={props.isDarkMode ? bell_dark : bell} alt="alarm icon" className='hover' />
                    <img src={props.isDarkMode ? messenger_dark : messenger} alt="message icon" className='hover' /> */}
                </div>
            </div>
        </div>
    )
}
