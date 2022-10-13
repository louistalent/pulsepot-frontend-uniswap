import "./wheel.css"
import React, { useEffect, useState } from 'react';
import CountdownTimer from "react-component-countdown-timer";
import arrowhead from "../../assets/images/arrowhead-small.png"
import plsp from "../../assets/images/logo.png"
import burn from "../../assets/images/burn.png"
const stc = require("string-to-color");
require('dotenv').config()

const REACT_APP_PLSP_SYMBOL = process.env.REACT_APP_PLSP_SYMBOL

export default function Wheel(props) {
    const [time, setTime] = useState(1)
    // const [startTimer, setStartTimer] = useState(false)
    const circleRadius = 150
    let endIn = 0, start = 0
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function describeArc(x, y, radius, startAngle, endAngle) {

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");

        return d;
    }
    function _setTime() {
        console.log(props.participants)
        if (props.participants > 1) {
            // console.log("Time", _time, "potLive: ", parseInt(potLiveTime), "Current Time: ", parseInt(Math.floor(Date.now() / 1000)), "Duration: ", parseInt(props.duration))
            setTimeout(() => {
                window.PotContract.methods.potLiveTime().call().then((potLiveTime) => {
                    let _time = parseInt(props.duration) - (parseInt(Math.floor(Date.now() / 1000)) - parseInt(potLiveTime))
                    _time = _time < 10 ? 15 : parseInt(_time)
                    console.log("Time", _time, "potLive: ", parseInt(potLiveTime), "Current Time: ", parseInt(Math.floor(Date.now() / 1000)), "Duration: ", parseInt(props.duration))
                    setTime(_time)
                    props.setPotActivityInfo(prevState => ({
                        ...prevState,
                        startTimer: true
                    }))
                })
            }, 5);
        } else {

        }
    }

    useEffect(() => {
        console.log("It has changed again: ", props.participants)
        _setTime()
    }, [props.participants])
    return (
        <div className="wheel_container">
            <div className="burn_bonus">
                <div className={props.participants === 0 ? "none" : ""}>
                    Pot will burn:
                    <div className="card">
                        <img src={burn} alt='fire logo' />
                        {parseFloat((((parseFloat(3 / 500) * (parseFloat(props.potTotalUsdValue)).toFixed(2)) / parseFloat(props.APP_PLSP))).toFixed(5))} {REACT_APP_PLSP_SYMBOL}
                    </div>
                </div>
            </div>
            <div className="wheel">

                <div className="wheel_inner3 card">
                    <div className="wheelTimer">
                        {
                            props.startTimer ?
                                <div>
                                    {/* {parseInt(time) || 100} */}
                                    <CountdownTimer count={parseInt(time) || 100} border hideDay hideHours onEnd={() => {
                                        props.listenToCalculatewinner()
                                        console.log("It is over");
                                    }} /></div>
                                :
                                "5:00"
                        }
                    </div>
                    <div className="wheel_participant">
                        {props.participants} Participants
                    </div>
                    <div className="wheelusdValue">
                        {(props.potTotalUsdValue / (10 ** 10)).toFixed(2)}$
                    </div>
                    <div className="wheel__arrowhead">
                        < img src={arrowhead} alt="arrowhead icon" />

                    </div >
                </div>
                {
                    parseFloat(props.participants) > 0 ?
                        <svg height="350" width="350" className="spinwheel" id="wheel" style={{ "animatiossnTimingFunction": "ease-in !important", marginTop: "0px" }}>
                            {
                                Object.entries(props.ParticipantToUsdValue).map(([address, usdValue]) => {
                                    start = endIn
                                    endIn = start + usdValue * 359.8 / props.potTotalUsdValue

                                    if (address === undefined) return ""
                                    return (

                                        <path data-start={start} data-stop={endIn} key={address} id="arc1" d={describeArc(175, 175, circleRadius, start, endIn)} fill="none" stroke={stc((((address.toString().toLowerCase() + ""))))} strokeWidth="40" />
                                    )
                                })}
                        </svg>
                        :
                        <div className="wheel_inner1">
                            <div className={props.isDarkMode ? "wheel_inner2_dark" : "wheel_inner2"}>
                            </div>
                        </div>

                }
            </div>
            <div className="burn_bonus">
                <div>
                    Bonus added:
                    <div className="card">
                        <img src={plsp} alt='plsp logo' />
                        {props.participants === 0 ? "1 " + REACT_APP_PLSP_SYMBOL : (parseFloat(1 + parseFloat(props.potTotalUsdValue) / (10 ** 12)).toFixed(2)) + "  " + REACT_APP_PLSP_SYMBOL}
                    </div>
                </div>
            </div>
        </div >)

}


