import React, { useEffect, useState } from 'react';
import './enter.css'
import './potAI.css'
import TokenImage from '../TokenImage';
import down_arrow from '../../assets/images/down-arrow.png'
import copy from '../../assets/images/copy.png'
import qrcode from '../../assets/images/qrcode.png'
import Erc20Abi from '../../abis/erc20.json'
import TokenSelection from '../tokenSelection/TokenSelection';
import TokenSymbol from '../TokenSymbol';

require('dotenv').config()

const REACT_APP_NATIVE_TOKEN = process.env.REACT_APP_NATIVE_TOKEN
export default function Enter(props) {


    const [enterState, setEnterState] = useState({
        "showWalletConnect": true,
        "selectedToken": REACT_APP_NATIVE_TOKEN,
        "amount": "",
        "tokenAddress": props.potAddress,
        "userTokenBalance": {
        },
        "tokenPrice": 0,
        "showTokenSelection": false
    })

    function approve(amount, name, address) {

        if (!window.__web3.utils.isAddress(address)) {
            alert("Not an EVM address")
            return
        }
        console.log("inside the approve function")
        if (isNaN(amount) || 0 >= amount) {
            alert("please enter a valid token amount")
            return
        }
        if (name === REACT_APP_NATIVE_TOKEN) {
            window.__web3.eth.getGasPrice(function (error, gasPrice) {
                const transactionParameters = {
                    from: props.account,
                    to: props.potAddress,
                    value: window.__web3.utils.toHex(window.__web3.utils.toWei(parseFloat(amount) + '', 'ether')),
                    chainId: window.__web3.utils.toHex(4),
                    gas: window.__web3.utils.toHex("550000"),
                    gasPrice: window.__web3.utils.toHex(parseInt(gasPrice * 1.1)),
                }
                window.___provider.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters]
                }).then((txHash) => {
                })
                    .catch((error) => {
                    });
            })
        } else {
            let contract = new window.__web3.eth.Contract(Erc20Abi, address)
            const transactionParameters = {
                from: props.account,
                to: address,
                data: contract.methods.approve(props.potAddress, (window.__web3.utils.toWei((amount) + '', 'ether'))).encodeABI(),
                chainId: window.__web3.utils.toHex(4)
            }

            window.___provider.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters]
            }).then((txHash) => {
                console.log("This is the transaction hash for token approval", txHash)
            }).catch((error) => {
                console.error("There was an error approving token: ", error)
            });
        }
    }

    async function getBalance(name, address) {
        // console.log("Name: ", name, " Address: ", address)
        if (!window.__web3.utils.isAddress(props.account)) {
            return
        }
        if (name === REACT_APP_NATIVE_TOKEN) {
            const balance = await window.__web3.eth.getBalance(props.account)
            // console.log("Token: ", name, " Balance: ", balance)
            setEnterState(preState => ({
                ...preState,
                "userTokenBalance": {
                    ...preState.userTokenBalance,
                    [name]: window.__web3.utils.fromWei(balance, "ether")
                }
            }))
            return window.__web3.utils.fromWei(balance, "ether")
        } else {
            let contract = new window.__web3.eth.Contract(Erc20Abi, address)
            const balance = await contract.methods.balanceOf(props.account).call()
            // console.log("Token: ", name, " Balance: ", balance)
            setEnterState(preState => ({
                ...preState,
                "userTokenBalance": {
                    ...preState.userTokenBalance,
                    [name]: window.__web3.utils.fromWei(balance, "ether")
                }
            }))
            return window.__web3.utils.fromWei(balance, "ether")
        }
    }
    async function setTokenMax(name, address) {
        if (!window.__web3.utils.isAddress(address)) {
            return
        }
        const balance = await getBalance(name, address)
        setEnterState(preState => ({
            ...preState,
            "amount": balance
        }))
    }
    useEffect(() => {
        if (props.account)
            props.tokens.map((element) => getBalance(element.name, element.address))
    }, [props.tokens, props.account])
    return (
        <div className='tokenSelectionContainer'>
            <div className={enterState.showTokenSelection ? "show_tokenSelection show card" : "none"}>
                <TokenSelection tokens={enterState.userTokenBalance} _tokens={props.tokens} setEnterState={setEnterState} />

            </div>
            <div className='Enter card'>
                <div className='Enter_header hover'>
                    <div onClick={() => {
                        setEnterState(preState => ({
                            ...preState,
                            "showWalletConnect": true
                        }))
                    }} className={enterState.showWalletConnect ? "Enter_selected" : "Enter_not_selected"}>
                        Wallet Connect
                    </div>
                    <div onClick={() => {
                        setEnterState(preState => ({
                            ...preState,
                            "showWalletConnect": false
                        }))
                    }} className={!enterState.showWalletConnect ? "Enter_selected" : "Enter_not_selected"}>
                        Manual Transaction
                    </div>

                </div>
                {
                    enterState.showWalletConnect ?
                        <div className='Enter_transaction'>
                            <div className='Enter_transaction_'>
                                <div className='Enter_transaction_amount'>
                                    <input className='bold-7' type={"text"} placeholder='0.0' id={"tokenAmount"} value={enterState.amount} onChange={(e) => {
                                        if (!isNaN(e.target.value)) {
                                            setEnterState(prevState => ({ ...prevState, "amount": e.target.value }))
                                        }
                                    }}></input>
                                    <div>
                                        {(parseFloat(enterState.amount * (props.tokens.filter((token) => { return token.name === enterState.selectedToken }).map((token) => { return token.price }))[0] / 10000000000).toFixed(2))} USD
                                    </div>
                                </div>
                                <div className='Enter_transaction_select'>

                                    <span className='hover' onClick={(e) => {
                                        setTokenMax(enterState.selectedToken, enterState.tokenAddress)
                                        e.target.style.background = "#d31de8"
                                        e.target.style.color = "white"
                                        setTimeout(() => {
                                            e.target.style.background = "#fce2f6"
                                            e.target.style.color = "#d31de8"
                                        }, 1500)
                                    }}>max</span>
                                    <div className='Enter_transaction_select_token  hover' onClick={() => {
                                        setEnterState(preState => ({
                                            ...preState,
                                            showTokenSelection: !preState.showTokenSelection
                                        }))
                                    }}>
                                        <TokenImage token={enterState.selectedToken} class_name={'Enter_transaction_select_token_img'} />
                                        <div><TokenSymbol name={enterState.selectedToken} /></div>
                                        <img src={down_arrow} alt={'downarrow'} />
                                    </div>
                                    <div className='Enter_transaction_token_balance'>
                                        Balance:  {enterState.userTokenBalance[enterState.selectedToken] ? (parseFloat(enterState.userTokenBalance[enterState.selectedToken])).toFixed(5) : 0}
                                    </div>
                                </div>

                            </div>
                            {
                                props.account.length > 0 ?
                                    <div className='Enter_connect Enter_SendtoPot' onClick={() => {
                                        approve(enterState.amount, enterState.selectedToken, enterState.tokenAddress)
                                    }}>
                                        Send to Pot
                                    </div>
                                    :
                                    <div className='Enter_connect Enter_connectWallet' onClick={() => {
                                        props.connectWallet()
                                    }}>
                                        Connect Wallet
                                    </div>
                            }

                        </div>
                        :

                        <div className='potcontract-addinfo'>
                            <div className='potcontract-addinfo_qrcode'>
                                <img src={qrcode} alt="qrcode icon" />
                            </div>
                            <div className='potcontract-addinfo_address'>
                                <div className='potcontract-addinfo_address__'>
                                    <div>Send tokens to contract: </div>

                                </div>

                                <div className='potcontract-addinfo_address--copyimg'>
                                    <span className='potcontract-addinfo_address--copy'>{props.potAddress.toString().substring(0, 22) + "..."} </span>
                                    <div className='potcontract-addinfo_address--img' onClick={(e) => {
                                        navigator.clipboard.writeText(props.potAddress);
                                        (e.target.parentElement.style.background = "#edf8d8")
                                        setTimeout(() => {
                                            (e.target.parentElement.style.background = "")
                                        }, 200)
                                    }}><img src={copy} alt="copy icon" /></div>
                                </div>
                                <div>

                                </div>

                            </div>

                        </div>
                }
            </div>
        </div>
    )
}
