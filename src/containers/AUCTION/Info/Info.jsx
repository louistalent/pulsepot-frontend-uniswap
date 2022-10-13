import React from 'react'
import './info.css'
import roulettetable from '../../../assets/images/roulettetable.png'
import infographic from '../../../assets/images/infographic.png'

export default function Info() {
    return (
        <div className='Auction_Info'>
            <div className='Auction_Info_title'>
                What is this ?
            </div>
            <div className='Auction_Info_intro'>
                A unique utility NFT that gives you access to control the funds behind a roulette table. You can become the owner of the first ever decentralized roulette table. A total of 8 tables will be available per chain. All tables operate at 97.3% RTP. Each table will pay a small percentage of their profits to burn PLSP
            </div>
            <div className='roulettetable_image'>
                <img alt="roulettetable icon" src={roulettetable} />
            </div>
            <div className='Auction_Info_tech_intro'>
                <div className='Auction_Info_tech_intro_title'>
                    Technical Infographic
                </div>
                <div className='Auction_Infography_img'>
                    <img alt='Auction_Infography icon' src={infographic} />
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}
