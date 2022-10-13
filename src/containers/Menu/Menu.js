
import logo from '../../assets/images/menu-logo-bnb.png';
import darkMode from '../../assets/images/Menu icons/darkmode.png'
import lightMode from '../../assets/images/Menu icons/lightmode.png'
import './menu.css';
import '../../components/MenuSegment/menuSegment.css'
import Games from '../../components/MenuSegment/GAMES/Games';
import Info from '../../components/MenuSegment/INFO/Info';
import Plsp from '../../components/MenuSegment/PLSP/Plsp';
import Stats from '../../components/MenuSegment/STATS/Stats';
import React from 'react'
require('dotenv').config()

const REACT_APP_NATIVE_TOKEN = process.env.REACT_APP_NATIVE_TOKEN
function Menu(props) {
  return (

    <div className="Menu card">
      <div className='Menu_logo_gradient'>

      </div>
      <div className='Menu_contents'>
        <div className='Menu-logo'>
          <img src={logo} alt='logo' />
          <div className='Menu-logo_text'>
            {REACT_APP_NATIVE_TOKEN}POT.io
          </div>
        </div>
        <Games isDarkMode={props.isDarkMode} page={props.page} setPage={props.setPage} />
        <Plsp APP_PLSP={((props.APP_PLSP / (10 ** 10)).toFixed(2))} />
        <Stats potInfo={props.potInfo} />
        <Info />
      </div>
      <div className='ColorMode'>
        <div className={props.isDarkMode ? "" : "Selected"} onClick={() => {
          props.setDarkMode(false)
        }}>
          <img src={lightMode} alt='sun icon' />
        </div>
        <div className={props.isDarkMode ? "Selected" : ""} onClick={() => {
          props.setDarkMode(true);
        }}>
          <img src={darkMode} alt='moon icon' />
        </div>

      </div>
    </div>
  );
}

export default Menu;
