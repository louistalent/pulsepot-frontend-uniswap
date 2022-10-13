import "./wheel.css"
import React, { useEffect, useState } from 'react';
// import CountdownTimer from "react-component-countdown-timer";
import arrowhead from "../../assets/images/arrowhead-small.png"
import plsp from "../../assets/images/logo.png"
import burn from "../../assets/images/burn.png"

const stc = require("string-to-color");


export default function Wheel(props) {

    const circleRadius = 150
    let endIn = 0, start = 0
    let lastElementUsdValue = 0
    let addressToAngle = {}
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
    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    useEffect(() => {
    }, [])
    return (
        <div className="wheel_container">
            <div className="burn_bonus">
                <div>
                    Pot will burn:
                    <div className="card">
                        <img src={burn} alt='fire logo' />
                        0.34PLSP
                    </div>
                </div>
            </div>
            <div className="wheel">

                <div className="wheel_inner3 card">
                    <div className="wheelTimer">
                        5:00
                    </div>
                    <div className="wheel_participant">
                        3 Participants
                        {/* {props.winner.returnValues !== undefined ? props.winner.returnValues.winner : "no winner"} */}
                    </div>
                    <div className="wheelusdValue">
                        {(props.potTotalUsdValue / (10 ** 10)).toFixed(2)}$
                    </div>
                    <div className="wheel__arrowhead">
                        < img src={arrowhead} />

                    </div >
                </div>
                {
                    parseFloat(props.participants) > 0 ?
                        <svg height="350" width="350" className="spinwheel" id="wheel" style={{ "animatiossnTimingFunction": "ease-in !important", marginTop: "0px" }}>
                            {
                                Object.entries(props.ParticipantToUsdValue).map(([address, usdValue]) => {
                                    start = endIn
                                    endIn = start + usdValue * 359.99999999 / props.potTotalUsdValue

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
                    Bonus addess:
                    <div className="card">
                        <img src={plsp} alt='plsp logo' />
                        0.34PLSP
                    </div>
                </div>
            </div>
        </div >)

}


