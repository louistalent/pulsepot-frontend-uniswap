import React from 'react'
import './referral.css'
import copy from "../../assets/images/copy.png"
import person from "../../assets/images/user-ref.png"
import logo from "../../assets/images/logo.png"

require('dotenv').config()

const REACT_APP_PLSP = process.env.REACT_APP_PLSP
export default function Referral(props) {
    return (
        <div className='card Referral Page'>

            <div className='page_title'>
                Referral Page
            </div>
            < div className="page_content">

                <div className='Ref_page_content'>
                    <div className="">
                        Share your pulsepot referral link to get a bonus of 10% from all PLSP winnings
                        your referrer accumulates during the participation phase
                    </div>
                    <div className="ref_page_copy card">
                        <span className="">https://pulsepot.io/r/{props.userInfo.code} </span>

                        < div className="hover" onClick={(e) => {
                            navigator.clipboard.writeText('https://pulsepot.io/r/' + props.userInfo.code);
                            (e.target.parentElement.style.background = "#edf8d8")
                            setTimeout(() => {
                                (e.target.parentElement.style.background = "")
                            }, 500)
                        }}> <img src={copy} alt="copy icon" /></div>
                    </div >

                    <div className="">
                        <span>Active Referral users:</span>
                        <div>
                            <img src={person} alt="referral_image" />
                            {props.userInfo.act_ref_users}
                        </div>

                    </div>
                    <div className="">
                        <span>Active Referral earnings:</span>
                        <div>
                            <img src={logo} alt="referral_image" style={{ width: "50px" }} />
                            {props.userInfo["p_phase" + REACT_APP_PLSP]}
                        </div>

                    </div>
                    <span>(Est {parseFloat(parseFloat(props.userInfo["p_phase" + REACT_APP_PLSP]) * parseFloat(props.APP_PLSP / 10 ** 10)).toFixed(1)} USD) </span>
                    {/* <span>(Est {props.userPLSP.referrerEarnings * 30} USD) </span> */}

                </div>

            </div>
        </div >

    )
}
