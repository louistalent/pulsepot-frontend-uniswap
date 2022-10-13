import React from "react"
import Blockies from 'react-blockies';
const stc_ = require('string-to-color');

const stc = (string) => {
    return stc_((((string))))
}
export default function Blocky(props) {
    const color_ = (props.address === "") ? "#828282" : stc(props.address);
    return <Blockies
        seed={props.address}
        size={props.size_ ? props.size_ : 8}
        scale={props.scale_ ? props.scale_ : 2}
        color={color_}
        bgColor={props.bgColor_ ? stc(props.bgColor_.toLowerCase()) : "#828282"}
        spotColor={props.spotColor_ ? stc(props.spotColor_.toLowerCase()) : "#ffffff"}
        className={props.className_ ? props.className_ + " identicon" : "identicon"}
    />;
}
