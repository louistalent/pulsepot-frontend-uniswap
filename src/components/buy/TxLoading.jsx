import React from 'react';
import loading from "../../assets/images/buy/loading-transparent.svg"
export default function TxLoading() {
    return (
        <div className="tx-loading-container">
            <div className="tx-loading-bg"></div>
            <div className="tx-loading-body">
                <img width={'60px'} height={'60px'} src={loading} alt="loading" />
            </div>
        </div>

    )
}
