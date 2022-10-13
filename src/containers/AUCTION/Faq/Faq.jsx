import './faq.css'
import React, { useState } from 'react'
import arrow_down from '../../../assets/images/down-arrow.png'
import arrow_left from '../../../assets/images/left-arrow.png'
import twitter from '../../../assets/images/twitter.png'
import telegram from '../../../assets/images/telegram.png'
import roulette from '../../../assets/images/roulette.png'
import pricecalls from '../../../assets/images/pricecalls.png'
import sportmarket from '../../../assets/images/sports.png'
import slots from '../../../assets/images/slots.png'

export default function FAQ() {
    const [faqs, setFaqs] = useState(
        {
            1:
            {
                question: "How is Decentralized PvP Roulette possible ?",
                answer: "Three components combine to create this unique experience",
                subansw: [" 1) NFT Owner ", " 2) Liquidity Pool ", "3) Smart Contract", "1) The NFT owner ‘hosts’ the specific game within the chain-specific site", "2) The NFT owner creates a Liquidity Pool that acts as a bank to take bets and payout winnings. The NFT acts as a special KEY to the LP giving ONLY the owner of the NFT access and therefore ONLY the owner is able to deposit or withdraw funds. The NFT owner is solely responsible for funding the LP.", "3) When a player plays a game, they will interact with a specialized smart contract. The player will select an amount they’d like to bet and select an outcome they think will occur. If the player is correct the LP will payout their winnings according to the predetermined odds, otherwise the bet value moves into the LP."],
                opened: true
            },

            2:
            {
                question: "How can I get ownership of a Roulette NFT ?",
                answer: "You need to win an NFT by bidding for it in an auction. There are a finite number of NFT’s available, it will be different for each game (see ’Game Details’). All NFT’s that can be bid on at auction will be listed on the site and the highest bidder will get ownership of the NFT. Each NFT will have a starting bid price of 10 ETH.",
                subansw: [],
                opened: false
            },
            3:
            {
                question: "How does the contract decide the winning number ?",
                answer: "The contract uses 4 different data points to compile a random number between 0 and 36.",
                subansw: ["The contract uses following data types: block height, hash, timestamp and price of native token. These are metrics which nobody can control or predict, when combined into a single value. "],
                opened: false
            },
            4:
            {
                question: "Can I bet any type of crypto ?",
                answer: "No. Each Table will be token specific",
                subansw: [],
                opened: false
            },
            5:
            {
                question: "Can I be sure to get my payout when I win ?",
                answer: "A: Yes! That’s the beauty of everything we do. Its decentralized and transparent. The smart contract will prevent any Gaming Table from accepting a bet which it cannot honor should it be a winning bet. The Table owner cannot prevent you from betting against available liquidity, and the owner cannot prevent you from being paid. Nobody can.",
                subansw: [],
                opened: false
            },
            6: {
                question: "Can I sell my Roulette NFT ?",
                answer: "Yes. The owner of the wallet holding the Gaming NFT has exclusive access to the liquidity pool bound to the contract. You can sell your NFT at any time and transfer access to the LP just as you would any other NFT.",
                subansw: [],
                opened: false
            },
            7:
            {
                question: "Are there any fees associated with playing? ",
                answer: "The player NEVER pays any fees except gas to play on the Gaming Tables. The NFT owner will pay a small fee ONLY from the profit generated.",
                subansw: [],
                opened: false
            },
            8:
            {
                question: "How does the maximum bet work ?",
                answer: "Each NFT will have a different maximum bet associated. From 500 USD to 25,000 USD. This is the upper limit value a single bet can have. The maximum bet will always be dynamically adjusted based on the available liquidity from the NFT owner. If the liquidity is running low, and the owner does not add more to the LP, you might see a reduced maximum bet, even if the Table has a higher upper limit. This prevents a bet from being placed that, if won, cannot be paid out - The contract will never accept a bet which it cannot honor.",
                subansw: [],
                opened: false
            },
            9:
            {
                question: "What happens if there is no liquidity in the pool ?",
                answer: "The game is paused. The game cannot accept bets if there is no liquidity to cover for potential user winnings. The owner of the NFT might be out of funds, and cannot add more liquidity to the pool. In this case it’s expected that the owner will list the NFT on the market for sale so someone with available funds can take over the operation of the Table.",
                subansw: [],
                opened: false
            },
            10:
            {
                question: "How does this benefit PLSP ?",
                answer: "The owner of the NFT is taxed between 1.25% and 3% of the profits every 24 hours. This sum will be used to buy PLSP off the market and burn it. The contract will ONLY tax the NFT owner if there is a profit. If the Table is at a loss, the player or the owner will not pay any fees.",
                subansw: [],
                opened: false
            },
            11:
            {
                question: "Is it possible to select multiple outcomes ?",
                answer: "Yes. You can combine as many outcomes as you want in a single bet. Just the same way you can on a regular centralized roulette.",
                subansw: [],
                opened: false
            },
            12:
            {
                question: "What kind of roulette table is used ?",
                answer: "The contract is based on the European Roulette model, which only contains a single zero. This gives the player an estimated RTP of 97.3%",
                subansw: [],
                opened: false
            },
            13:
            {
                question: "Do NFT owners get a copy on all chains ?",
                answer: "No. Each Gaming Table is token specific, we cannot offer these NFT ownerships across DIFFERENT chains. Each chain will most likely have different NFT owners.",
                subansw: [],
                opened: false
            }
        }
    )


    return (
        <div className='sac_faq'>
            <p className='sac_faq_p'>
                Frequently Asked Questions
            </p>
            {
                Object.keys(faqs).map((key, index) => {
                    return (
                        <div key={index}>
                            <div className={faqs[key].opened ? 'sac_faq_ques sac_faq_ques_grad' : 'sac_faq_ques'}>
                                <div className='sac_faq_ques__arrow' onClick={(e) => {
                                    setFaqs(prevState => ({
                                        ...prevState,
                                        [key]: {
                                            ...prevState[key],
                                            "opened": !prevState[key]["opened"]
                                        },

                                    }))
                                }} >
                                    <img src={faqs[key].opened ? arrow_down : arrow_left} alt="arrow icon" />
                                </div>
                                <div className='sac_faq_ques__' onClick={(e) => {
                                    setFaqs(prevState => ({
                                        ...prevState,
                                        [key]: {
                                            ...prevState[key],
                                            "opened": !prevState[key]["opened"]
                                        },

                                    }))
                                }} >
                                    {faqs[key].question}
                                </div>

                            </div>
                            {faqs[key].opened ?

                                <div className='sac_faq__answer fade_in_'>
                                    {faqs[key].answer}
                                    {faqs[key].subansw.map((element, _index) => {
                                        return <p key={_index}>{element}</p>
                                    })}
                                </div>
                                :
                                ""}
                        </div>
                    )
                })
            }
            <div className='sac_faq_disclaimer'>
                <div className='sac_faq_disclaimer_inner'>

                    <p>
                        Disclaimer
                    </p>
                    By participating in the NFT auctions you are sacrificing to prove how strong you believe that blockchains are speech and speech is a protected human right. This is an important political statement. You must have no expectation of profit from the work of others. The set of people who have sacrificed to show their commitment to this political statement makes a great set of people to airdrop free things to. These sacrifice points are not meant to have any monetary value. Remember, you're not buying anything, the world is just noticing you are amongst a group of people that sacrificed to make a political statement. Some countries tax their citizens when they receive things of value. PulsePot and all the coins on it are designed to start with no value, which is ideal. Consult your own legal and financial professionals, as nothing written here should be considered professional advice. The only thing we know of set to be airdropped for free to this political group so far is PulsePot(PLSP)
                </div>

            </div>
            <div className='sac_faq_social'>
                <span>
                    <a href='https://t.me/pulsepot'><img src={telegram} alt="telegram icon" /> Join Telegram</a>
                </span>
                <span>
                    <a href='https://twitter.com/JPulsePot'><img src={twitter} alt="twitter icon" /> Join Twitter </a>
                </span>
            </div>
            <div className='sac_faq_ga'>
                <div>
                    Games
                </div>
                <span>No expectations from the work of others</span>

                <p>
                    We might continue to develop more cutting edge on-chain PvP games
                </p>

            </div>
            <div className='sac_faq_games'>
                <div className='sac_faq_game'>
                    <div className='sac_faq_game_pulse'>
                        <div>
                            <div>

                            </div>

                        </div>

                    </div>
                    <span>Jackpot</span> <br />
                    <span className='sac_faq_game_eta'>Q2 2022</span> <br />
                    <span>LIVE</span>
                </div>
                <div className='sac_faq_game'>
                    <div className='sac_faq_game_banner'>NFT</div>
                    <img src={roulette} alt="rubik icon" />
                    <span><div>Roulette</div></span>
                    <span style={{ color: "grey" }} className='sac_faq_game_eta'>Q4 2022</span> <br />
                    <span>IN PROGRESS</span>
                </div>
                <div className='sac_faq_game'>
                    <img src={pricecalls} alt="rubik icon" /><br />
                    <span><div>Price calls</div></span>
                    <span className='sac_faq_game_eta'>Q1 2023</span> <br />
                    <span>COMING</span>
                </div>
                <div className='sac_faq_game'>
                    <img src={sportmarket} alt="rubik icon" /><br />
                    <span><div>Sports market</div></span>
                    <span className='sac_faq_game_eta'>Q2 2023</span> <br />
                    <span>COMING</span>
                </div>
                <div className='sac_faq_game'>
                    <div className='sac_faq_game_banner'>NFT</div>
                    <img src={slots} alt="rubik icon" /><br />
                    <span><div>Slots</div></span>
                    <span className='sac_faq_game_eta'>Q4 2023</span> <br />
                    <span>COMING</span>
                </div>

            </div>
        </div>
    )
}
