import { Link } from "react-router-dom";
import './info.css'
import React from 'react'
import rules from "../../../assets/images/Menu icons/Info section/rules.png"
import checked from "../../../assets/images/Menu icons/Info section/checked.png"
import referral from "../../../assets/images/Menu icons/Info section/referral.png"
// import faucet from "../../../assets/images/Menu icons/Info section/faucet.png"
import faq from "../../../assets/images/Menu icons/Info section/faq.png"

export default function Info() {
    return (
        <div className="MenuContent Info">
            <div className='menuTitle'>
                INFO
            </div>
            <div className='menuItems'>
                <div className='menuItem_a'>
                    <Link to="/rules">
                        <img src={rules} alt="menu item" />
                        RULES
                    </Link>
                </div>
                <div className='menuItem_a'>
                    <Link to="/tokens">
                        <img src={checked} alt="menu item" />
                        ACCEPTED TOKENS
                    </Link>
                </div>
                <div className='menuItem_a'>
                    <Link to="/referral">
                        <img src={referral} alt="menu item" />
                        REFERRAL
                    </Link>
                </div>
                {/* <div className='menuItem_a'>
                    <Link to="/faucet">
                        <img src={faucet} alt="menu item" />
                        BNB FAUCET
                    </Link>
                </div> */}
                <div className='menuItem_a'>
                    <Link to="/faqs">
                        <img src={faq} alt="menu item" />
                        FAQS
                    </Link>
                </div>
            </div>
        </div>
    )
}
