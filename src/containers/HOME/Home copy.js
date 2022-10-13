
import React, { useEffect, useState } from 'react';
import './home.css'
import UserCPI from '../../components/UserCPI/UserCPI'
import Wheel from '../../components/Wheel/Wheel'
import TokenIP from '../../components/tokeninpot/TokenIP'
import Enter from '../../components/Enter/Enter'
import PreviousPot from '../PreviousPot/PreviousPot';
import CurrentPot from "../currentpot/CurrentPot"

require('dotenv').config()
var currentRoundHash = []//this is used to detect duplicate events

const start_from_block = process.env.REACT_APP_START_FROM_BLOCK
const spinAfter = 2000, spinFor = 16, readAfter = 5000

function unsubscribe(subscription) {
    try {
        subscription.unsubscribe(function (error, success) {
            if (success) {
                console.log('Successfully unsubscribed');
            }
        });

    } catch (error) {
        console.log(error)
    }
}

export default function Home(props) {
    const [PotActivityInfo, setPotActivityInfo] = useState({
        currentPotRoundInfo: {
            "round": 0,
            "winner": {

            },
            "entries": [

            ],
            winningPoint: 0
        },
        pastPotRoundInfo: [],
        PotDerivedInfo: {
            "participantsAddresses": [],
            "participants": 0,//array of usdvalue to address
            "potTotalUsdValue": 0,
            "tokensInPot": [],
            "ParticipantToUsdValue": {},
            "timerTime": 300
        }
    })
    var potEnteredSocket, potWinnerSocket
    function getPastPotRound(roundNumber) {
        window.PotContractEvent.getPastEvents("EnteredPot", { filter: { potRound: roundNumber }, fromBlock: start_from_block, toBlock: "latest" }, function (error, results) {
            if (!error & results.length !== 0) {
                window.PotContractEvent.getPastEvents("CalculateWinner", { filter: { potRound: roundNumber }, fromBlock: start_from_block, toBlock: "latest" }, function (error, winners) {
                    if (!error & winners.length !== 0) {
                        setPotActivityInfo(prevState => ({
                            ...prevState,
                            "pastPotRoundInfo": [
                                {
                                    "entries": results,
                                    "winner": winners[0]
                                },
                                ...prevState.pastPotRoundInfo
                            ]
                        }))

                    } else {
                        if (error)
                            console.log("There was an error", error)
                    }
                })
            } else {
                console.log("There was an error", error)
            }
        })
        return
    }
    function getPastPotRounds(StartFrom, number) {
        if (StartFrom === undefined) return
        if (number === undefined) number = 10
        for (let index = 0; index < number; index++) {
            // console.log("Getting round", StartFrom - (index))
            getPastPotRound(StartFrom - (index))
            if (index === number - 1) {
                monitorPotCurrentRound(StartFrom)
            }
        }
    }
    function spinWheel(winningAngle) {
        // console.log("Attempting to spin wheel")
        let wheel = document.getElementById("wheel")
        // console.log("These is the wheel: ", wheel)
        if (!wheel) {
            return
        }
        // console.log("Spinning wheel now")
        let SpinningFor = (10 * 360) + parseFloat(winningAngle)
        wheel.style.WebkitTransitionDuration = parseInt(spinFor) + 's';
        wheel.style.easing = "linear";
        console.log('Spinning for: ', SpinningFor)
        wheel.style.transform = 'rotate(' + SpinningFor + 'deg)';

    }
    function getWinningAngle(winner, ParticipantsToUsd, totalUsdValue, addresses) {
        // console.log("This is the winner: ", winner, " and these are the participants: ", ParticipantsToUsd, " and these are the addresses: ", addresses)
        let winnerAngle = 0, added = [], extra = 0;
        for (let index = 0; index < addresses.length; index++) {
            if (!added.includes(addresses[index])) {
                added[index] = addresses[index]
                // console.log("Address", index, ": ", addresses[index], " Usd value ", ParticipantsToUsd[addresses[index]], " Angle: ", winnerAngle)
                winnerAngle += parseFloat(ParticipantsToUsd[addresses[index]]) * 359.99999 / parseFloat(totalUsdValue)
                if (winner.toLowerCase() === addresses[index]) {
                    extra = ((parseFloat((ParticipantsToUsd[addresses[index]] + '').substring(0, 2)) % 10) + 0.05)
                    // console.log("This is the extra value: ", extra, " : ", (parseFloat((ParticipantsToUsd[addresses[index]] + '').substring(0, 2)) % 10))
                    winnerAngle -= (parseFloat(ParticipantsToUsd[addresses[index]]) * 359.99999 / parseFloat(totalUsdValue)) / extra//(1 + (0.1 * ((extra > 0 ? extra : 1))))
                    break
                }
            }
        }
        // console.log("This is the winning angle ", winnerAngle)
        return winnerAngle * -1
    }
    function monitorPotCurrentRound(_round) {
        // var _countEntries = 0//index is to be deleted later
        try {
            window.PotContract.methods.potCount().call().then(
                (potCount) => {
                    potEnteredSocket = window.PotContractEvent.events.EnteredPot({ "filter": { potRound: parseInt(_round) }, "fromBlock": start_from_block }, function (error, result) {
                        try {
                            if (!error) {
                                if (!currentRoundHash.includes(((result.returnValues.enteryCount))) || true) {
                                    currentRoundHash.push(((result.transactionHash)))
                                    // _countEntries++
                                    // setTimeout(() => {
                                    setPotActivityInfo(prevState => ({
                                        ...prevState,
                                        "currentPotRoundInfo": {
                                            ...prevState.currentPotRoundInfo,
                                            "entries": [
                                                result,
                                                ...prevState.currentPotRoundInfo.entries
                                            ]
                                        },
                                        "PotDerivedInfo": {
                                            ...prevState.PotDerivedInfo,
                                            "participants": result.returnValues.hasEntryInCurrentPot ? parseInt(prevState.PotDerivedInfo.participants) : prevState.PotDerivedInfo.participants + 1,
                                            "potTotalUsdValue": parseFloat(prevState.PotDerivedInfo.potTotalUsdValue) + parseFloat(result.returnValues.usdValue),
                                            "tokensInPot": {
                                                ...prevState.PotDerivedInfo.tokensInPot,
                                                [result.returnValues.tokenName]: (prevState.PotDerivedInfo.tokensInPot[result.returnValues.tokenName] === undefined ?
                                                    parseFloat(window.__web3.utils.fromWei(result.returnValues.amount, "ether"))
                                                    :
                                                    parseFloat((prevState.PotDerivedInfo.tokensInPot[result.returnValues.tokenName])) +
                                                    parseFloat(window.__web3.utils.fromWei(result.returnValues.amount, "ether")))
                                            },
                                            "ParticipantToUsdValue": {
                                                ...prevState.PotDerivedInfo.ParticipantToUsdValue,
                                                [result.returnValues.userAddress.toLowerCase()]: parseFloat((prevState.PotDerivedInfo.ParticipantToUsdValue[result.returnValues.userAddress.toLowerCase()]) === undefined ?
                                                    parseFloat(result.returnValues.usdValue)
                                                    :
                                                    parseFloat((prevState.PotDerivedInfo.ParticipantToUsdValue[result.returnValues.userAddress.toLowerCase()])) +
                                                    parseFloat(result.returnValues.usdValue))
                                            },
                                            "participantsAddresses": [
                                                ...prevState.PotDerivedInfo.participantsAddresses,
                                                result.returnValues.userAddress.toLowerCase()
                                            ]

                                        }
                                    }))
                                    setTimeout(() => {
                                        setPotActivityInfo(prevState => {
                                            console.log("This is the pot info: ", prevState)
                                            return prevState
                                        })
                                    }, 3000);
                                    // }, _countEntries * 0);
                                }
                            }
                        } catch (error) {
                            unsubscribe(potEnteredSocket)
                            console.log("This is the error:::::::::", error)
                        }
                    }).on('error', (errrrr) => {
                        unsubscribe(potEnteredSocket)
                        console.log("This is the error__", errrrr)
                    })
                }
            )
        } catch (error) {
            console.log("There was an error monitorPotCurrentRound")
            console.log(error)
        }
    }
    const listenToCalculatewinner = () => {
        console.log("attempting to calculate winner")
        var _round = parseInt(PotActivityInfo.currentPotRoundInfo.round)
        potWinnerSocket = window.PotContractEvent.events.CalculateWinner({ "filter": { potRound: parseInt(_round) }, "fromBlock": start_from_block }, function (error, result) {
            if (!error) {
                let SpinAngle = 0
                setPotActivityInfo((prevState) => {
                    SpinAngle = getWinningAngle(result.returnValues.winner, prevState.PotDerivedInfo.ParticipantToUsdValue, prevState.PotDerivedInfo.potTotalUsdValue, prevState.PotDerivedInfo.participantsAddresses)
                    prevState.currentPotRoundInfo.winner = result
                    return prevState
                })
                // console.log("This is the winning angle that I got", SpinAngle)
                setTimeout(() => {
                    spinWheel(SpinAngle)
                }, spinAfter);
                setTimeout(() => {
                    setPotActivityInfo(prevState => ({
                        ...prevState,
                        "currentPotRoundInfo": {
                            ...prevState.currentPotRoundInfo,
                            "round": parseInt(_round) + 1,
                            "winner": {

                            },
                            "entries": [

                            ],
                            winningPoint: 0
                        },
                        "pastPotRoundInfo": [
                            {
                                "entries": prevState.currentPotRoundInfo.entries,
                                "winner": result
                            },
                            ...prevState.pastPotRoundInfo
                        ],
                        PotDerivedInfo: {
                            "participantsAddresses": [],
                            "participants": 0,//array of usdvalue to address
                            "potTotalUsdValue": 0,
                            "tokensInPot": [],
                            "ParticipantToUsdValue": {},
                            "timerTime": 300
                        }
                    }))
                    setTimeout(() => {
                        currentRoundHash = []
                        monitorPotCurrentRound(_round + 1)
                    }, 1000);
                }, readAfter);
                // console.log("We have a winner", result)
            } else {
                console.log("There was an error in listening to the calculate winner event", error)
            }
            unsubscribe(potWinnerSocket)
            unsubscribe(potEnteredSocket)
        })
    }
    useEffect(() => {
        const getInfo = async () => {
            if (window.PotContract) {
                try {
                    window.PotContract.methods.potCount().call().then(
                        (potCount) => {
                            // potCount -= 3
                            setPotActivityInfo((prevState) => ({
                                ...prevState,
                                "currentPotRoundInfo": {
                                    ...prevState.currentPotRoundInfo,
                                    "round": parseInt(potCount)
                                }
                            }))
                            getPastPotRounds(parseInt(potCount), potCount > 10 ? 10 : potCount)
                        }
                    )
                } catch (error) {
                    console.log("There was an error getting pot info")
                    console.log(error)
                }
            } else {
                setTimeout(() => {
                    getInfo()
                }, 500);
            }
        }
        getInfo()
    }, [])

    return (
        <div className='Home'>
            <div>
                <div>
                    <UserCPI account={props.PULSEPOT.userInfo.account} potRound={PotActivityInfo.currentPotRoundInfo.round}
                        userTotalusd={(PotActivityInfo.currentPotRoundInfo.entries.filter((entry, index, entries) => {
                            return props.PULSEPOT.userInfo.account.toLowerCase() === entry.returnValues.userAddress.toLowerCase()
                        }).map((entry) => {
                            return (parseFloat(entry.returnValues.usdValue))
                        })).length === 0 ? 0 : PotActivityInfo.currentPotRoundInfo.entries.filter((entry, index, entries) => {
                            return props.PULSEPOT.userInfo.account.toLowerCase() === entry.returnValues.userAddress.toLowerCase()
                        }).map((entry) => {
                            return (parseFloat(entry.returnValues.usdValue))
                        })}
                        potTotalUsdValue={PotActivityInfo.PotDerivedInfo.potTotalUsdValue}
                    />
                </div>
                <div>
                    <Wheel listenToCalculatewinner={listenToCalculatewinner} plsp_price={props.PULSEPOT.plsp_price} duration={props.PULSEPOT.potInfo.duration} timeDiff={0} winner={PotActivityInfo.currentPotRoundInfo.winner} potTotalUsdValue={PotActivityInfo.PotDerivedInfo.potTotalUsdValue} isDarkMode={props.isDarkMode} ParticipantToUsdValue={PotActivityInfo.PotDerivedInfo.ParticipantToUsdValue} participants={PotActivityInfo.PotDerivedInfo.participants} />
                </div>
                <div className='tokensInPOT'>
                    {
                        Object.entries(PotActivityInfo.PotDerivedInfo.tokensInPot).map(([tokenName, amount]) => {
                            return {
                                "name": tokenName,
                                "symbol": props.PULSEPOT.tokens.filter((token) => {
                                    return token.name === tokenName
                                }).map((token) => { return token.symbol }),
                                "value": amount,
                                "price": props.PULSEPOT.tokens.filter((token) => {
                                    return token.name === tokenName
                                }).map((token) => { return parseFloat(token.price) })
                            }
                        }).sort((a, b) => {
                            return b.value / b.price - a.value / a.price
                        }).map((token, index) => {
                            return (
                                <TokenIP name={token.name} symbol={token.symbol} value={token.value} price={token.price} key={index} />
                            )
                        })
                    }

                </div>

            </div>
            <div className='enterPot-activity'>
                <Enter potAddress={props.potAddress} account={props.PULSEPOT.userInfo.account} connectWallet={props.connectWallet} tokens={props.PULSEPOT.tokens} />
                <div className='card pastActivities'>
                    <CurrentPot round={PotActivityInfo.currentPotRoundInfo.round} entries={PotActivityInfo.currentPotRoundInfo.entries} />

                    {
                        PotActivityInfo.pastPotRoundInfo.sort((a, b) => {
                            return b.winner.returnValues.potRound - a.winner.returnValues.potRound
                        }).map((element, index, elements) => {
                            return <PreviousPot tokens={props.PULSEPOT.tokens} winner={element.winner} entries={element.entries} key={index} />
                        })}
                </div>



            </div>
        </div>
    )
}

