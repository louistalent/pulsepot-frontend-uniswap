
import React from 'react'
import './connectWalletModal.css'
import close from '../../assets/images/close-dark.svg'


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
                        <div onClick={props.activateCoinbaseWallet}>Coinbase Wallet</div>
                    </div>
                    <div className='ConnectWalletModal_inner_div hover'>
                        <div onClick={props.activateWalletConnect}>Wallet Connect</div>
                    </div>
                    <div className='ConnectWalletModal_inner_div hover'>
                        <div onClick={props.activateMetaMask}>Metamask</div>
                    </div>
                    <div className='ConnectWalletModal_inner_div hover' style={{ marginBottom: "0px" }}>
                        <div onClick={props.deactivate}>Disconnect</div>
                    </div>
                </div>


            </div>
        </div>
    )
}
