import './index.css';
import PotAbi from './abis/pot.json';
// import Erc20Abi from './abis/erc20.json'

import App from './App';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Auction from './containers/AUCTION/Auction';

require('dotenv').config();

const infuraId = process.env.REACT_APP_INFURA_ID;
// const query_url = window.location.href.search('localhost') !== -1 ? process.env.REACT_APP_QUERY_URL : 'https://db.pulsepot.io';
const query_url = 'https://db.pulsepot.io';
// const query_url = process.env.REACT_APP_QUERY_URL
const pot_contract_address = process.env.REACT_APP_POT_CONTRACT_ADDRESS;
const REACT_APP_PLSP = process.env.REACT_APP_PLSP;
// const REACT_APP_CHAIN_ID = process.env.REACT_APP_CHAIN_ID
// const start_from_block = process.env.REACT_APP_START_FROM_BLOCK
export default function Index(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [PULSEPOT, SETPULSEPOT] = useState({
    PotContractAddress: '',
    userInfo: {
      account: '',
      code: 'rsgfdfhogjdfgjhk',
      [REACT_APP_PLSP]: 44,
      staked: 56,
      ['p_phase' + REACT_APP_PLSP]: 567,
      act_ref_users: 23,
    },
    potInfo: {
      potRound: 0,
      stake: 0,
      burn: 0,
      airdrop: 0,
      lottery: 0,
      duration: 300,
      ['p_phase' + REACT_APP_PLSP]: 123,
    },
    pastPotRoundInfo: [],
    tokens: [],
    [REACT_APP_PLSP]: 300000000000,
  });

  const providerOptions = {
    walletconnect: {
      //   package: WalletConnect,
      //   options: {
      //     infuraId
      //   }
      // },
      // coinbasewallet: {
      //   package: CoinbaseWalletSDK,
      //   options: {
      //     appName: "Web3Modal Example App",
      //     infuraId
      //   }
    },
  };

  const subscribeProvider = (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on('disconnect', () => this.resetApp());
    provider.on('accountsChanged', (accounts: string[]) => {
      SETPULSEPOT((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          account: accounts[0] === undefined ? '' : accounts[0],
        },
      }));
      console.log('Account has been changed', accounts[0]);
    });
    provider.on('chainChanged', (chainId: number) => {
      console.log('chainid has been changed', chainId);
    });

    provider.on('chainChanged', (networkId: number) => {
      console.log('chainid has been changed', networkId);
    });

    provider.on('disconnect', (error: { code: number, message: string }) => {
      console.log('chain disconnected', error);
      localStorage.setItem('isWalletConnected', false);
    });
  };

  const web3Modal = new Web3Modal({
    // network: "rinkeby", // optional
    cacheProvider: false, // optional
    providerOptions, // required
  });
  const connectWallet = async () => {
    if (!window.web3) {
      alert('Please install a Wallet extension to connect');
      return;
    }
    try {
      const provider = await web3Modal.connect();
      window.___provider = await provider;
      SETPULSEPOT((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          account:
            provider.selectedAddress === undefined
              ? ''
              : provider.selectedAddress,
        },
      }));
      subscribeProvider(provider);
    } catch (error) {
      SETPULSEPOT((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          account: '',
        },
      }));
    }
  };
  // const tryConnect = async () => {
  //   if (!window.web3) return
  //   connectWallet()
  //   // const web3 = new Web3(window.web3.currentProvider);
  //   // await window.web3.currentProvider.enable();
  //   // const web3 = new Web3(window.web3.currentProvider);
  //   // const accounts = await web3.eth.getAccounts();

  //   // SETPULSEPOT(prevState => ({
  //   //   ...prevState,
  //   //   "userInfo": {
  //   //     ...prevState.userInfo,
  //   //     "account": accounts[0] === undefined ? "" : accounts[0]
  //   //   },
  //   // }))
  //   // console.log("When it all began", accounts)
  //   // if (accounts.length === 0) {
  //   //   connectWallet()
  //   // } else {
  //   //   subscribeProvider(window.web3.currentProvider);
  //   // }
  // }

  const setDarkMode = (darkMode) => {
    try {
      if (darkMode === true) {
        document.body.style.backgroundColor = '#2d2e36';
        document.body.style.color = '#c5c5c5';
        setIsDarkMode(true);
        localStorage.setItem('isDarkMode', true);
        // ELEMENT BG: #393b47
        // FONTS:#c5c5c5
        // ICONS:#7e879f
        // LIGHT BG:#454753
        // MAIN BG:#2d2e36
      } else {
        document.body.style.backgroundColor = '#f7f8fa';
        document.body.style.color = '#303030';
        setIsDarkMode(false);
        localStorage.setItem('isDarkMode', false);
        // document.querySelector(".menuItems img").style.filter = ""
        // document.querySelector(".card").style.backgroundColor = "white"
        // document.querySelector(".menuItems img").style.filter = 'invert(54%) sepia(24%) saturate(302%) hue-rotate(186deg) brightness(95%) contrast(88%)'
        // setTimeout(() => {
        //   let dark = document.getElementsByClassName("card")
        //   for (var i = 0; i < dark.length; i++) {
        //     dark[i].style.backgroundColor = "#393b47"
        //   }
        //   // .forEach(element => {
        //   //   element.style.backgroundColor = "#393b47"
        //   // });
        // }, 2000);
      }
    } catch (error) {
      console.log('Error setting dark mode');
    }
  };
  useEffect(() => {
    switch (
    window.location.href.split('/')[
    window.location.href.split('/').length - 1
    ]
    ) {
      case '':
        setPage(1);
        break;
      case 'roulette':
        setPage(2);
        break;
      case 'fortunewheel':
        setPage(3);
        break;

      case 'sports':
        setPage(4);
        break;
      case 'pricecalls':
        setPage(5);
        break;
      default:
        setPage(1);
        break;
    }
    setDarkMode(localStorage.getItem('isDarkMode') === 'true');
    const getInfo = async () => {
      //Get neccesary information from the database
      let data;
      try {
        const response = await fetch(query_url + '/pulsepot/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        data = await response.json();
        console.log('Data from get Info', data);
        if (data.error) {
          return;
        }
        SETPULSEPOT((prevState) => ({
          ...prevState,
          tokens: data.tokens,
          potInfo: {
            ...prevState.potInfo,
            ['p_phase' + REACT_APP_PLSP]: data.total_plsp_claimed,
          },
          [REACT_APP_PLSP]: parseFloat(
            data.tokens
              .filter((token) => token.name === REACT_APP_PLSP)
              .map((token) => token.price)
          ).toFixed(2),
        }));
        setTimeout(() => {
          SETPULSEPOT((prevState) => {
            console.log('This is PULSEPOT state: ', PULSEPOT);
            console.log('This is PULSEPOT state: ', PULSEPOT);
            return prevState;
          });
        }, 2000);
      } catch (error) {
        alert('There was an error connecting to network');
        console.log(error);
      }
      try {
        window.PotContract.methods
          .potDuration()
          .call()
          .then((duration) => {
            window.PotContract.methods
              .burnPool()
              .call()
              .then((burnPool) => {
                window.PotContract.methods
                  .airdropPool()
                  .call()
                  .then((airdropPool) => {
                    window.PotContract.methods
                      .lotteryPool()
                      .call()
                      .then((lotteryPool) => {
                        SETPULSEPOT((prevState) => ({
                          ...prevState,
                          potInfo: {
                            ...prevState.potInfo,
                            // "potRound": parseInt(potCount),
                            airdrop: parseFloat(
                              window.__web3.utils.fromWei(airdropPool, 'ether')
                            ),
                            burn: parseFloat(
                              window.__web3.utils.fromWei(burnPool, 'ether')
                            ),
                            lottery: parseFloat(
                              window.__web3.utils.fromWei(lotteryPool, 'ether')
                            ),
                            duration: duration,
                          },
                        }));
                      });
                  });
              });
          });
      } catch (error) {
        alert('There was an error getting pot info');
        console.log(error);
      }
    };

    window.__web3 = new Web3('https://rinkeby.infura.io/v3/' + infuraId);
    window.__web3ForEvent = new Web3(
      'wss://rinkeby.infura.io/ws/v3/' + infuraId
    );
    window.PotContract = new window.__web3.eth.Contract(
      PotAbi,
      pot_contract_address
    );
    window.PotContractEvent = new window.__web3ForEvent.eth.Contract(
      PotAbi,
      pot_contract_address
    );

    // tryConnect()
    getInfo();
  }, [PULSEPOT.userInfo.account]);
  useEffect(() => {
    const getUserInfo = async () => {
      //Get neccesary information from the database
      if (!window.__web3.utils.isAddress(PULSEPOT.userInfo.account)) {
        return;
      }
      let data;
      try {
        const response = await fetch(
          query_url + '/user/' + PULSEPOT.userInfo.account,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        data = await response.json();
        console.log('Data from get User Info', data);
        if (data.error) {
          return;
        }
        if (!data.error) {
          SETPULSEPOT((prevState) => ({
            ...prevState,
            userInfo: {
              ...prevState.userInfo,
              ['p_phase' + REACT_APP_PLSP]: data.referrerEarnings || 0,
              code: data.referrerCode,
              act_ref_users: data.activeReferreredUsers || 0,
            },
          }));
        }
      } catch (error) {
        alert('There was an error connecting to network');
        console.log(error);
      }
      referUser();
    };
    const referUser = async () => {
      let ref_code = window.location.href.split('/r/')[1];
      if (ref_code && ref_code.length === 10) {
        let data;
        try {
          const response = await fetch(
            query_url + '/r/' + ref_code + '/' + PULSEPOT.userInfo.account,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
          data = await response.json();
          console.log('Data from refer User', data);
          if (!data.error) {
          }
        } catch (error) {
          alert('There was an error connecting to network');
          console.log(error);
        }
      }
    };
    getUserInfo();
  }, [PULSEPOT.userInfo.account]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route> */}
          <Route path="auction" element={<Auction />} />
          <Route
            path="/*"
            element={
              <App
                page={page}
                setPage={setPage}
                potAddress={pot_contract_address}
                isDarkMode={isDarkMode}
                setDarkMode={setDarkMode}
                PULSEPOT={PULSEPOT}
                connectWallet={connectWallet}
              />
            }
          />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
