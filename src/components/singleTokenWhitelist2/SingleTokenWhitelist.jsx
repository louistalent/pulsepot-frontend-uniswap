import "./singleTokenWhitelist.css"
import React from "react";
import TokenImage from "../../components/TokenImage";
export default function SingleTokenWhitelist(props) {

    return (
        // <div>
        <div className="singleToken-whitelist" onClick={() => {
            props.setEnterState(preState => ({
                ...preState,
                "selectedToken": props.token,
                "showTokenSelection": false,
                "tokenAddress": (props.tokens.filter((token) => { return token.name === props.token }).map((token) => { return token.address }))[0],
                "tokenPrice": (props.tokens.filter((token) => { return token.name === props.token }).map((token) => { return token.price }))[0]
            }))
        }}>
            <TokenImage token={props.token} class_name={"singleToken-whitelist__tokenimage"} />
            <div className="singleToken-whitelist_token">
                {(props.tokens.filter((token) => { return token.name === props.token }).map((token) => { return token.symbol }))[0]}
            </div>
            <span className="singleToken-whitelist_balance">{parseFloat((parseFloat(props.balance)).toFixed(5))} USD</span>
        </div >
    );
}
