import './tokenSelection.css'
import React, { } from "react"
import SingleTokenWhitelist from '../../components/singleTokenWhitelist2/SingleTokenWhitelist'
export default function TokenSelection(props) {

    // const [tokenSearch, setTokenSearch] = useState("")
    return (
        <div className="tokenSelection">
            {/* <span className='closeTokenSelection' >close</span> */}
            <div className='tokenSelection__inner' >
                {/* <div className='tokenSelection__inner-head'>
                    Select token
                </div> */}

                {/* <input type="text" value={tokenSearch} onChange={(e) => setTokenSearch(e.target.value)} className="mobile__tokenSelection__inner-search" placeholder="Search Token..." /> */}
                <div className='hover'>

                    {
                        (Object.keys(props.tokens)).map((token) => {
                            return token
                        }).map((token, index) => {
                            return (<SingleTokenWhitelist tokens={props._tokens} balance={props.tokens[token]} token={token} key={index} setEnterState={props.setEnterState} />)
                        })
                    }
                </div>

            </div>
        </div>
    )
}









