
import React from 'react'
import './connectWalletModal.css'
import close from '../../assets/images/close-dark.svg'

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
require('dotenv').config()


const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});
export default function ConnectWalletModal(props) {
    return (
        <div className='ConnectWalletModal'>
            <div className='ConnectWalletModal_inner'>
                <div className='ConnectWalletModal_close_icon' >
                    <img src={close} alt="close icon" className=' hover' onClick={() => {
                        props.SetUiState(prevState => ({
                            ...prevState,
                            "showConnectModal": false
                        }))
                    }} />
                </div>
                <div className='ConnectWalletModal_innerDiv'>
                    <div className='ConnectWalletModal_inner_div hover' style={{ marginTop: "0px" }}>
                        <div onClick={() => { props.activate(CoinbaseWallet) }}>Coinbase Wallet</div>
                    </div>
                    <div className='ConnectWalletModal_inner_div hover'>
                        <div onClick={() => { props.activate(WalletConnect) }}>Wallet Connect</div>
                    </div>
                    <div className='ConnectWalletModal_inner_div hover'>
                        <div onClick={async () => {
                            const what = await props.activate(Injected);
                            console.log("This is what", what)
                        }}>Metamask</div>
                    </div>
                    <div className='ConnectWalletModal_inner_div hover' style={{ marginBottom: "0px" }}>
                        <div onClick={props.deactivate}>Disconnect</div>
                    </div>
                </div>


            </div>
        </div>
    )
}
