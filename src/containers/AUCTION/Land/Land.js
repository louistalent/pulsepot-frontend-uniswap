import React from 'react'
import './land.css'
import plsplogo from '../../../assets/images/plsp_bb.png'
import pls from '../../../assets/images/pls.png'
import key from '../../../assets/images/key.png'
import warning from '../../../assets/images/warning.png'
import live from '../../../assets/images/live.png'
import { useState } from 'react'
import TokenImage from '../../../components/TokenImage'

export default function Land() {
    function getgradient(token) {
        var gradient;
        switch (token) {
            case "PLS":
                gradient = "linear-gradient(to left, #00d8ff 0%, #3a2fef 28%, #e018e7 64%, #fd0616";
                break;
            case "LINK":
                gradient = "linear-gradient(to left, rgba(0, 219, 255, 1) 0%, rgba(124, 2, 255, 1) 28%, rgba(255, 43, 222, 1) 64%, rgba(253, 2, 19, 1) 100%)";
                break;
            case "USDT":
                gradient = "linear-gradient(to left, rgba(0, 219, 255, 1) 0%, rgba(124, 2, 255, 1) 28%, rgba(255, 43, 222, 1) 64%, rgba(253, 2, 19, 1) 100%)";
                break;
            case "SHIBA":
                gradient = "linear-gradient(to left, rgba(0, 219, 255, 1) 0%, rgba(124, 2, 255, 1) 28%, rgba(255, 43, 222, 1) 64%, rgba(253, 2, 19, 1) 100%)";
                break;
            case "HEX":
                gradient = "linear-gradient(to top,  #ff0036 0%, #ffff00 28%, #ffff00 64%,#ff6d00 100%)";
                break;
            case "PLSX":
                gradient = "linear-gradient(to left, #00ff84 0%, #ff0004";
                break;
            case "MATIC":
                gradient = "linear-gradient(to left, rgba(0, 219, 255, 1) 0%, rgba(124, 2, 255, 1) 28%, rgba(255, 43, 222, 1) 64%, rgba(253, 2, 19, 1) 100%)";
                break;
            case "PLSP":
                gradient = "linear-gradient(22deg, rgb(246, 3, 42) 0%, rgb(0, 0, 0) 28%, rgb(7 0 111) 70%, rgb(0, 216, 255) 100%)";
                break;
            case "PLSD":
                gradient = "linear-gradient(45deg, #ef0e82 0%, #488af9 28%, #488af9 64%, #ef0e82 100%)";
                break;
            case "LOAN":
                gradient = "linear-gradient(to left, rgba(0, 219, 255, 1) 0%, rgba(124, 2, 255, 1) 28%, rgba(255, 43, 222, 1) 64%, rgba(253, 2, 19, 1) 100%)";
                break;
            case "HDRN":
                gradient = "linear-gradient(to left,#d5cec7 0%, #908b84 28%, #c9c2b7 64%, #fffdfa 100%)";
                break;
            case "MAXI":
                gradient = "linear-gradient(65deg, #0f00b4 0%, #0f00b4 28%, #fbd402 64%, #fbd402 100%)";
                break;
            case "USDL":
                gradient = "linear-gradient(45deg, #3652cc 0%, #3652cc 28%, #d2d2d2 64%, #d2d2d2 100%)";
                break;
            default:
                gradient = "linear-gradient(to left, rgba(0, 219, 255, 1) 0%, rgba(124, 2, 255, 1) 28%, rgba(255, 43, 222, 1) 64%, rgba(253, 2, 19, 1) 100%)";
                break;
        }
        return gradient
    }


    const [roulettes] = useState([
        {
            "token": "PLS",
            "maxbet": 25000,
            "style": "European",
            "fee": 3,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "startin": 0//days before auctioning starts
        },
        {
            "token": "PLSX",
            "maxbet": 20000,
            "style": "European",
            "fee": 2.75,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "startin": 3//days before auctioning starts
        },
        {
            "token": "HEX",
            "maxbet": 15000,
            "style": "European",
            "fee": 2.5,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "startin": 6//days before auctioning starts
        },
        {
            "token": "PLSP",
            "maxbet": 10000,
            "style": "European",
            "fee": 2.25,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "startin": 9//days before auctioning starts
        },
        {
            "token": "HDRN",
            "maxbet": 5000,
            "style": "European",
            "fee": 2,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "startin": 12//days before auctioning starts
        },
        {
            "token": "PLSD",
            "maxbet": 2500,
            "style": "European",
            "fee": 1.75,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "startin": 15//days before auctioning starts
        },
        {
            "token": "MAXI",
            "maxbet": 1000,
            "style": "European",
            "fee": 1.5,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "startin": 18//days before auctioning starts
        },
        {
            "token": "USDL",
            "maxbet": 500,
            "style": "European",
            "fee": 1.25,
            "bid": "https://www.linktoopensea",
            "highestbid": 0,
            "soldout": true,
            "startin": 4//days before auctioning starts
        }
    ])
    return (
        <div className='Land'>
            <div>
                <img className='Land_logo' src={plsplogo} alt="plsp icon" />
                <div className='land_heading1'>
                    Worlds first decentralized Roulette PvP
                </div>
                <div className='land_heading2'>
                    Bid on the NFTs to become a table owner. Total of 8 tables available
                </div>
                <div className='land_heading3'>
                    <img src={pls} alt="plsp icon" />
                    PulseChain
                    <img src={key} alt="plsp icon" />
                    OWNED BY #NFT
                </div>
            </div>

            <div className='Roulettes'>
                {
                    roulettes.map((roulette, index) => {
                        return (

                            <div className='Roulette' key={index} style={{ background: getgradient(roulette.token) }}>
                                <div className='Roulette_inner'>
                                    {
                                        roulette.startin === 0 ?

                                            <div className='roulettes_warning'>
                                                <img style={{ animation: "opacitychange .9s ease-in-out infinite alternate" }} src={warning} alt="warning icon" />
                                                <div>Auction is live</div>
                                                <div>Ending in 2 days and 8 hours</div>
                                            </div>
                                            :
                                            ""
                                    }
                                    {
                                        roulette.startin === 0 ?
                                            <div className='roulette_live'><img src={live} alt="live" /></div>
                                            :
                                            ""
                                    }
                                    <div className='roulette_index'>#0{index + 1}</div>
                                    <div className='roulette_img'><TokenImage token={roulette.token} /></div>
                                    <div className='roulette_title'>{roulette.token} Roulette</div>
                                    <div className='roulette_info'>
                                        <div>Max bet: ${roulette.maxbet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                        <div>{roulette.style} style</div>
                                        <div>{roulette.fee}% fee</div>
                                    </div>
                                    {
                                        roulette.startin === 0 ?
                                            <div className='roulette_bidnow'>
                                                BID NOW
                                            </div>
                                            :
                                            <div className={roulette.soldout ? 'roulette_soldout' : 'roulette_inspect'}>
                                                {roulette.soldout ? 'SOLD' : 'INSPECT'}
                                            </div>
                                    }

                                    {
                                        roulette.startin === 0 ?
                                            <div className='roulette_highestbid'>
                                                <span>Highest bid: </span>32.4 ETH
                                            </div>
                                            :

                                            <div className='roulette_highestbid'>
                                                {
                                                    roulette.soldout ?
                                                        <span>view owner </span>
                                                        :
                                                        <span>Starts in {roulette.startin} days </span>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
