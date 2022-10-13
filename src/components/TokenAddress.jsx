import React from "react";

export default function TokenSymbol(props) {

    var symbol;
    switch (props.name.toString()) {
        case "BNB":
            symbol = "BNB";
            break;
        case "ChainLink Token":
            symbol = "LINK";
            break;
        case "USD Tether":
            symbol = "USDT";
            break;
        case "SHIBA INU":
            symbol = "SHIB";
            break;
        case "Hex":
            symbol = "HEX";
            break;
        case "Pulse Exchange":
            symbol = "PLSX";
            break;
        case "Matic Token":
            symbol = "MATIC";
            break;
        case "PLSB":
            symbol = "PLSB";
            break;
        case "LOAN":
            symbol = "LOAN";
            break;
        case "Hedron":
            symbol = "HDRN";
            break;
        case "Maximus":
            symbol = "MAXI";
            break;
        case "USDL":
            symbol = "USDL";
            break;
        default:
            symbol = "BNB";
            break;
    }
    return (
        <>
            {symbol}
        </>
    );
}
