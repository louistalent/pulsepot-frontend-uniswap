import React from 'react';
import "./auction.css"
import Faq from './Faq/Faq'
import Info from './Info/Info';
import Land from './Land/Land'


export default function Auction(props) {





    return (
        <div className='sacrifice_phase'>
            <Land />
            <Info />
            <Faq />
        </div>
    )
}
