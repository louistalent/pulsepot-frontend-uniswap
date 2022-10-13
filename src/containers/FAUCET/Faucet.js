

import React, { useEffect, useState } from 'react';
import './faucet.css'
import pls from '../../assets/images/pls.png';
import check_faucet from '../../assets/images/check-faucet.png';
require('dotenv').config()
const query_url_ = process.env.REACT_APP_QUERY_URL

export default function Faucet(props) {
    const [faucetAddress, setFaucetAddress] = useState('')
    const [faucetError, setFaucetError] = useState('')
    const [faucetClaimed, setFaucetClaimed] = useState(false)
    // const [faucetClaimed, setFaucetClaimed] = useState(false)
    // const [faucetClaimed, setFaucetClaimed] = useState(false)


    const query_url =
        window.location.href.search('localhost') === -1 || true
            ? 'https://db.pulsepot.io'
            : query_url_; // "http://localhost"
    var faucetTimeout;

    useEffect(() => {

    }, [])

    return (
        <div className='card Faucet Page'>
            <div className='page_title'>
                Faucet
            </div>
            <div className='page_content'>
                <div className='faucet_container'>
                    <div className='faucet_content1'>
                        <img src={pls} alt='logo' href="#" />
                        <div>Free PLS</div>
                    </div>
                    <div className='faucet_content2'>
                        <input type='text' placeholder='Insert wallet address here...' id={"faucetAddress"} value={faucetAddress} onChange={(e) => {
                            setFaucetAddress(e.target.value)
                        }}></input>
                        <div className='hover'>
                            {
                                !faucetClaimed ?
                                    <div className=' faucet_content2_1'
                                        onClick={() => {
                                            console.log("This is the faucet address:", faucetAddress)
                                            if (!window.__web3.utils.isAddress(faucetAddress)) {
                                                alert("Please enter a valid address")
                                                setFaucetError("Please enter a valid address")
                                                clearTimeout(faucetTimeout)
                                                faucetTimeout = setTimeout(() => {
                                                    setFaucetError("")
                                                }, 5000);
                                                return
                                            }
                                            try {
                                                fetch(query_url + "/faucet/" + faucetAddress, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                    }
                                                })
                                                    .then((response) => {
                                                        if (response.ok) {
                                                            return response.json();
                                                        }
                                                        alert("Unable to get data, try refreshing page or check your internet connection")
                                                    })
                                                    .then((responseData) => {
                                                        try {

                                                            if (responseData.error === undefined) {
                                                                console.log("trying to set user details")
                                                                if (responseData.result === undefined)
                                                                    return
                                                                alert(responseData.result)
                                                                setFaucetClaimed(true)

                                                                clearTimeout(faucetTimeout)
                                                                faucetTimeout = setTimeout(() => {
                                                                    setFaucetClaimed(false)
                                                                }, 4000);
                                                                setFaucetError("")
                                                                setFaucetAddress("")
                                                            } else {
                                                                if ((responseData.error) === "11" || responseData.error === "22" || responseData.error === "33") {
                                                                    alert(responseData.result)
                                                                    setFaucetError(responseData.result)

                                                                    clearTimeout(faucetTimeout)
                                                                    faucetTimeout = setTimeout(() => {
                                                                        setFaucetError("")
                                                                    }, 10000);
                                                                }
                                                            }
                                                            console.log("Error from faucet: ", responseData.error)
                                                            console.log("responseData from faucet: ", responseData);
                                                        } catch (error) {

                                                        }
                                                        return responseData;
                                                    })
                                                    .catch(error => console.warn(error));
                                            } catch (error) {
                                                alert("error getting info")
                                                console.log("This is the error::: ", error)
                                            }
                                        }}>
                                        CLAIM
                                    </div>
                                    :
                                    <div className='faucet_content2_2'>
                                        <img src={check_faucet} alt='check-faucet' href="#" />
                                    </div>
                            }
                        </div>

                        <div className='faucet_content2_error'>
                            {
                                faucetError > 0 ?
                                    <div style={{ color: "red", textAlign: "center" }}>
                                        Error: {faucetError}
                                    </div>
                                    :
                                    <div>

                                    </div>

                            }
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

