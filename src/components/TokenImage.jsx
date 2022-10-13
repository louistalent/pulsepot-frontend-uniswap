import React from "react";
import bnb from "../assets/images/bsc.png"
import pls from "../assets/images/pls.png"
import plsb from "../assets/images/logo.png"
import usdt from "../assets/images/usdt.png"
import link from "../assets/images/link.png"
import shib from "../assets/images/shib.png"
import hex from "../assets/images/hex.png"
import plsx from "../assets/images/plsx.png"
import matic from "../assets/images/matic.png"
import plsp from "../assets/images/logo.png"
import plsd from "../assets/images/plsd.png"
import usdl from "../assets/images/usdl.png"
import loan from "../assets/images/loan.png"
import hdrn from "../assets/images/hdrn.png"
import maxi from "../assets/images/maxi.png"


export default function TokenImage(props) {

    var token_image;
    switch (props.token.toString()) {
        case "BNB":
            token_image = bnb;
            break;
        case "PULSE":
            token_image = pls;
            break;
        case "ChainLink Token":
            token_image = link;
            break;
        case "USD Tether":
            token_image = usdt;
            break;
        case "SHIBA INU":
            token_image = shib;
            break;
        case "Hex":
            token_image = hex;
            break;
        case "Pulse Exchange":
            token_image = plsx;
            break;
        case "Matic Token":
            token_image = matic;
            break;
        case "PLSP":
            token_image = plsp;
            break;
        case "BNBP":
            token_image = plsb;
            break;
        case "PLSD":
            token_image = plsd;
            break;
        case "LOAN":
            token_image = loan;
            break;
        case "Hedron":
            token_image = hdrn;
            break;
        case "Maximus":
            token_image = maxi;
            break;
        case "USDL":
            token_image = usdl;
            break;
        case "PLS":
            token_image = pls;
            break;
        case "LINK":
            token_image = link;
            break;
        case "USDT":
            token_image = usdt;
            break;
        case "SHIBA":
            token_image = shib;
            break;
        case "HEX":
            token_image = hex;
            break;
        case "PLSX":
            token_image = plsx;
            break;
        case "MATIC":
            token_image = matic;
            break;
        case "HDRN":
            token_image = hdrn;
            break;
        case "MAXI":
            token_image = maxi;
            break;
        default:
            token_image = bnb;
            break;
    }
    return (
        <img src={token_image} alt={props.token.toString()} className={props.class_name} />
    );
}
