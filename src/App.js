
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Menu from './containers/Menu/Menu';
import Navbar from './components/navbar/Navbar';
import Home from './containers/HOME/Home';
import Faucet from './containers/FAUCET/Faucet';
import StakingPage from './containers/STAKE/';
import Faqs from './containers/FAQS/Faqs';
import Referral from './containers/REFERRAL/Referral';
import Rules from './containers/RULES/Rules';
import Tokens from './containers/TOKENS/Tokens';
import Roullete from './containers/ROULETTE/Roulette'
import Sports from './containers/SPORTS/Sports';
import PriceCalls from './containers/PRICECALLS/PriceCalls';
import PPhase from './containers/PPHASE/PPhase';
import Tokenomics from './containers/TOKENOMICS/Tokenomics';
import FortuneWheel from './containers/FORTUNEWHEEL/FortuneWheel';
import Buy from './containers/BUY/buy';

require('dotenv').config()

const REACT_APP_PLSP = process.env.REACT_APP_PLSP

export default function App(props) {
    return (
        <div className={props.isDarkMode ? "App dark_bg" : "App light_bg"} >
            <Menu page={props.page} setPage={props.setPage} isDarkMode={props.isDarkMode} setDarkMode={props.setDarkMode} potInfo={props.PULSEPOT.potInfo} APP_PLSP={props.PULSEPOT[REACT_APP_PLSP]} />
            <div>
                <Navbar isDarkMode={props.isDarkMode} connectWallet={props.connectWallet} userInfo={props.PULSEPOT.userInfo} APP_PLSP={props.PULSEPOT[REACT_APP_PLSP]} />
                <Routes>
                    <Route index element={<Home potAddress={props.potAddress} PULSEPOT={props.PULSEPOT} isDarkMode={props.isDarkMode} connectWallet={props.connectWallet} />} />
                    <Route path="faucet" element={<Faucet />} isDarkMode={props.isDarkMode} />
                    <Route path="stake" element={<StakingPage PULSEPOT={props.PULSEPOT} isDarkMode={props.isDarkMode} />} />
                    <Route path="faqs" element={<Faqs />} />
                    <Route path="referral" element={<Referral userInfo={props.PULSEPOT.userInfo} isDarkMode={props.isDarkMode} APP_PLSP={props.PULSEPOT[REACT_APP_PLSP]} />} />
                    <Route path="rules" element={<Rules isDarkMode={props.isDarkMode} />} />
                    <Route path="tokens" element={<Tokens isDarkMode={props.isDarkMode} tokens={props.PULSEPOT.tokens} />} />
                    <Route path="pricecalls" element={<PriceCalls />} />
                    <Route path="roulette" element={<Roullete />} />
                    <Route path="sports" element={<Sports />} />
                    <Route path="tokenomics" element={<Tokenomics />} />
                    <Route path="fortunewheel" element={<FortuneWheel />} />
                    <Route path="pphase" element={<PPhase />} />
                    <Route path="buy" element={<Buy isDarkMode={props.isDarkMode} PULSEPOT={props.PULSEPOT} />} />
                    <Route path="*" element={<Home potAddress={props.potAddress} PULSEPOT={props.PULSEPOT} isDarkMode={props.isDarkMode} connectWallet={props.connectWallet} />} />
                </Routes>
            </div>

        </div>
    );
}

