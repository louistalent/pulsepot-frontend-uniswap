
import { Link } from "react-router-dom";
import './plsp.css'
import React from 'react'
import buy from "../../../assets/images/Menu icons/Token section/buy.png"
import trade from "../../../assets/images/Menu icons/Token section/trade.png"
import stake from "../../../assets/images/Menu icons/Token section/stake.png"
import tokenomics from "../../../assets/images/Menu icons/Token section/tokenomics.png"
require('dotenv').config()

const REACT_APP_PLSP_SYMBOL = process.env.REACT_APP_PLSP_SYMBOL

export default function Plsp(props) {
    return (

        <div className='MenuContent Plsp'>
            <div className='menuTitle'>
                {REACT_APP_PLSP_SYMBOL}
                <div>
                    ${props.APP_PLSP}
                </div>
            </div>
            <div className='menuItems'>
                <div className='menuItem'>
                     <Link to="/buy">
                    <img src={buy} alt="menu item" />
                    BUY
                    </Link>
                </div>
                <div className='menuItem'>
                    <img src={trade} alt="menu item" />
                    TRADE
                </div>
                <div className='menuItem'>
                    <Link to="/stake">
                        <img src={stake} alt="menu item" />STAKE
                    </Link>
                </div>
                <div className='menuItem'>
                    <Link to="/tokenomics">
                        <img src={tokenomics} alt="menu item" />
                        TOKENOMICS
                    </Link>
                </div>
            </div>
        </div>
    )
}
