import './tokenIP.css'
import React from 'react';
import TokenImage from '../../components/TokenImage';

export default function TokenIP(props) {
    return (
        <div className='token-inpot card border-5'>
            {/* tokenName={tokens.tokenName} amount={tokens.amount} usdValue={tokens.usdValue}  */}
            <TokenImage token={props.name} class_name={''} />
            <span className='token-inpot__name'>{props.symbol}</span>
            <span className='token-inpot__amount'>{parseFloat(parseFloat(props.value).toFixed(5))}</span>
            <span className='token-inpot__usdtvalue'>${((parseFloat(props.value) * (parseFloat(props.price) / 10 ** 10)).toFixed(2))}</span>
            {/* <span>{props.price}</span> */}

        </div>
    );
}
