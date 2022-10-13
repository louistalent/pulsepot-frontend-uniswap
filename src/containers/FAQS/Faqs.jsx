// import './faqs.css'
import React, { useState } from 'react'
import arrow_down from '../../assets/images/down-arrow.png'
import arrow_left from '../../assets/images/left-arrow.png'
export default function Faqs() {
    const [faqs, setFaqs] = useState(
        {
            1:
            {
                question: "What tokens can be used with PulsePot?",
                answer: "PulsePot will whitelist most PRC20 tokens that will have sufficient liquidity on PulseX. We want to make sure that our users are able to swap their winnings for any token of their choice on PulseX. We expect 30 to 100 tokens to be whitelisted on PulsePot at any given point of time. Certain bridged-in tokens will also be whitelisted on PulsePot.",
                opened: true
            },

            2:
            {
                question: "How is the winner decided?",
                answer: "The contract takes into account the block height, the timestamp and a randomly injected number (Chainlink) to generate randomness. For every $1 a user sends to the pot, the user gets allotted a number. The more numbers a user has, the higher is their chance to own the winning number.",
                opened: false
            },
            3:
            {
                question: "What is the PulsePot Faucet?",
                answer: "All users can claim 1 PLS per address, forever. Users simply need to enter their address and click the “Claim” button. A maximum of 100,000 addresses can free claim each day. PulsePot offers this faucet to help the users who own PRC20s but didn’t sacrifice for PulseChain.",
                opened: false
            },
            4:
            {
                question: "When will PulsePot launch on Pulsechain Mainnet?",
                answer: "PulsePot will launch on PulseChain shortly after the Mainnet goes live. We need the PRC20 tokens’ prices to stabilize on PulseX before we launch on Mainnet.",
                opened: false
            },
            5:
            {
                question: "What is the participation phase?",
                answer: "After Mainnet launch, all pots will have 3 PLSP added to the pot as a bonus. On top of that, 1 PLSP will be added to the pot for every 15 USD value added to the pot. The winner takes home these PLSP tokens as a bonus along with the tokens won from the pot. This will go on until 100,000 PLSP tokens have been given out in the form of bonuses. All PLSP earnings from the participation phase will be distrbuted at the end of the phase when all 100,000 tokens have been claimed.",
                opened: false
            },
            // 6:
            // {
            //     question: "Do I get PLSP airdrop on other chains?",
            //     answer: "No expectations of profit from the work of others, but we might launch this on all low gas EVM chains. There will not be a sacrifice phase on other chains, so all PLSP will be airdropped to wallets from this sacrifice",
            //     opened: false
            // },
            7:
            {
                question: "How does the $30 PLSP floor work ?",
                answer: "The PulsePot contract has a minimum value of $30 per PLSP hardcoded into the contract. PLSP is the only token with a minimum value in the pot. All other PRC20s follow PulseX market price every 5 minutes. If the market price of PLSP goes above $30, the PulsePot contract follows the price up. This creates arbitrage opportunities for the players.",
                opened: false
            },
            8:
            {
                question: "What is the 10% feedback loop ?",
                answer: "PulsePot updates the token prices every 5 minutes. When the price of PLSP is $30 or more, the contract adds 10% to the PLSP price in the pot. This ensures constant arbitrage opportunities for players, even when the price of PLSP goes above $30 on PulseX.",
                opened: false
            },
            9:
            {
                question: "How does the monthly lottery work ?",
                answer: "1% of the total pot value is reserved for a monthly lottery for PLSP holders. PulsePot will run around 190 pots a day and will designate 33% of the total fees to a monthly lottery. Every PLSP holder will have a chance to win this lottery. Holding 1 PLSP grants users 1 ticket in the lottery. Holding PLSP works as a passive lottery subscription for the holders.",
                opened: false
            },
            10:
            {
                question: "When will I get airdrops from holding PLSP ?",
                answer: "1% of the total pot value is used to pay back to the PLSP holders. To ensure the airdrop is a significant amount, all PLSP holders will be airdropped their share of the profit in PLS tokens every 6 months. Holding PLSP is analogous to owning a part of the project. Holders get a proportional amount of the profits generated from the games as an airdrop.",
                opened: false
            },
            11:
            {
                question: "How does the PLSP reduced fee work ?",
                answer: "PulsePot charges the pot winner a service fee of 3% of the total pot value. However, holding PLSP tokens reduces this fee. For every 1 PLSP the winner holds in their wallet, 1% of the total fee is laid off. For instance, holding 50 PLSP reduces the fee by 50% i.e. 1.5% fees is paid by the winner. Holding 100 PLSP completely removes the service fee.",
                opened: false
            },
            12:
            {
                question: "What is airdrop on 5 chains ?",
                answer: "No expectations of profit from the work of others. However, PulsePot is developed in Solidity, hence it is compatible with all EVM Compatible Blockchains. Also, PulsePot is only functional on Blockchains with low gas fees. Currently, this includes PLS, BSC, AVAX, FTM & MATIC. PulseChain will be the first Blockchain on which PulsePot will be deployed. There will be only one sacrifice phase for all future contract deployments. The same sacrifice set will be used to airdrop tokens to the users on all chains that we deploy on.",
                opened: false
            },
            13:
            {
                question: "Will you make more games?",
                answer: "No expectations of profit from the work of others, but it seems very likely that we will continue to develop multiple PVP games and expand the product.",
                opened: false
            },
            14:
            {
                question: "What is Decentralized PVP ?",
                answer: "PVP stands for Player Vs Player. This means that PulsePot is not a house that you play against. It’s just a service where players can compete against each other in a decentralized and trustless manner, that too at a very competitive 3% fees, which can further be reduced by holding PLSP. Normally, players play against a house that has a 6-10% edge over them. They are dependent on centralized services to respect their withdrawal requests. If the withdrawal service goes down, the players risk losing their money or delayed payments. With PulsePot, players directly deposit tokens from their wallets into the decentralized contract. The winner gets their winnings paid out almost instantly to their wallet in a fully decentralized and trustless manner.",
                opened: false
            },
            15:
            {
                question: "What is required for PulsePot to launch ?",
                answer: "The PulsePot contract is dependant on reliable USD pricing of tokens. This means the contract cannot be deployed to mainnet before we have a trustable market oracle or api market data. Chainlink or PulseX api is expected to provide prices. To provide the best frontend gaming experience, PulsePot needs to display data from contract on-chain events.  Ethereum currently have +10 different providers of this, and it's expected that some of these providers will adopt Pulsechain services aswell. The best PulsePot functionality experience will need an events provider to serve us cached  conctract events.",
                opened: false
            }
        }
    )
    return (
        <div className='card Faqs Page'>

            <div className='page_title'>
                Frequently asked questions
            </div>
            <div className='page_content none'>
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
                                    </div>
                                    :
                                    ""}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
