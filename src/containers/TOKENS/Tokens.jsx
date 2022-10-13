import React from 'react'
import './tokens.css'
import SingleTokenWhitelist from '../../components/singleTokenWhitelist1/SingleTokenWhitelist'
export default function Tokens(props) {
    return (
        <div className='card Tokens Page'>

            <div className='page_title'>
                Accepted Tokens
            </div>
            <div className='page_content none'>
                {props.tokens.map((token, index) => {
                    return (
                        <div key={index}>
                            <SingleTokenWhitelist token={token} tokens={props.tokens} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
