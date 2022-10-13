import React, { useState, useEffect, useMemo } from "react";
import Dropdown from "rsuite/Dropdown";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { ethers } from "ethers";

import UniswapContract from "../../abis/uniswap_v2.json";
import UniswapV2PairAbi from "../../abis/uniswapV2Pair.json";
import erc20Abi from "../../abis/erc20.json";
import testToken from "../../abis/ttok.json";
import factory from "../../abis/factory.json";
import RouletteAbi from "../../abis/roulette.json";

import TxLoading from "../../components/buy/TxLoading";

import { AiOutlineDown } from "react-icons/ai";
import { TbArrowsDownUp } from "react-icons/tb";

import { ReactComponent as BUSD } from "../../assets/images/buy/BUSD.svg";
import USDT from "../../assets/images/buy/USDT.svg";
import BNBP from "../../assets/images/buy/bnbp.png";
import loading from "../../assets/images/buy/loading-transparent.svg"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// import USDC from "../../assets/images/usdc.png";
import "./buy.css";

import {
    AiFillSetting,
    AiOutlineReload,
    AiOutlineClockCircle,
    AiOutlineLineChart,
    AiOutlineSwap,
    AiOutlineQuestionCircle,
    AiOutlineClose,
    AiOutlineSetting
} from "react-icons/ai";
import { TbRefresh } from "react-icons/tb";
import { BsChevronDoubleDown, BsChevronDown, BsXLg } from "react-icons/bs";


const supportedChianId = 4;

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const USDT_address = "0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD";
// const USDT_address_2 = "0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD";
const WETH_address = "0xc778417e063141139fce010982780140aa0cd5ab";
const TTOK1_address = "0xa62195A6d2B32A284f5E907e7dD7D84fA2f85996";
const PayTokenList = [
    {
        name: "USDT",
        address: "0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD",
    },
    {
        name: "BUSD",
        address: "0xc778417e063141139fce010982780140aa0cd5ab"
    }
];

const SwapHistoryModal = ({ setSwapHistoryModal }) => {
    return (
        <div className="buy-container modal_">
            <div className="swap-history-modal-container">
                <div
                    className="swap-history-modal-bg"
                    onClick={() => setSwapHistoryModal(false)}
                ></div>
                <div className="swap-history-modal-body ">
                    <div
                        className="flex items-center justify-between w-full h-16 m-auto py-5 px-8"
                        style={{ background: "#ecf0f4" }}
                    >
                        <div className="">
                            <h3 className="">Recent Transactions</h3>
                        </div>
                        <div className="">
                            <AiOutlineClose
                                onClick={() => setSwapHistoryModal(false)}
                                className="cursor-pointer text-lg text-[#1fc7d4]"
                            />
                        </div>
                    </div>
                    <div className="p-8 w-full">
                        <div className="mt-4 mb-8 w-full flex justify-start">
                            <p>No recent transactions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const toFloat = (val, unit = 18) => {
    return Number.parseFloat(ethers.utils.formatUnits(val, unit));
};

const SwapSettingModal = ({ setSwapSettingModal, setSlippage, slippage }) => {
    return (
        <>
            <div className="buy-container modal_">
                <div className="swap-setting-modal-container">
                    <div
                        className="swap-setting-modal-bg"
                        onClick={() => setSwapSettingModal(false)}
                    ></div>
                    <div className="swap-setting-modal-body">
                        <div className="setting-header">
                            <div className="">
                                <h3 className="">Settings</h3>
                            </div>
                            <div className="">
                                <AiOutlineClose
                                    onClick={() => setSwapSettingModal(false)}
                                    className="cursor-pointer text-lg text-[#1fc7d4]"
                                />
                            </div>
                        </div>
                        <div className="p-8 w-full">
                            <div className="mt-4 mb-8 w-full flex justify-start">
                                <h4 className="uppercase">swaps & liquidity</h4>
                            </div>
                            <div className="w-full flex justify-start">
                                Slippage Tolerance ?
                            </div>
                            <div className="flex items-center gap-1 justify-between">
                                <button
                                    onClick={() => setSlippage(0.1)}
                                    className={`slippage-btn ${slippage == 0.1 ? "slipage_active" : ""
                                        }`}
                                >
                                    0.1%
                                </button>
                                <button
                                    onClick={() => setSlippage(0.5)}
                                    className={`slippage-btn ${slippage == 0.5 ? "slipage_active" : ""
                                        }`}
                                >
                                    0.5%
                                </button>
                                <button
                                    onClick={() => setSlippage(1.0)}
                                    className={`slippage-btn ${slippage == 1.0 ? "slipage_active" : ""
                                        }`}
                                >
                                    1%
                                </button>
                                <input
                                    placeholder="0.50"
                                    className={`slippage-btn ${slippage !== 0.1 && slippage !== 0.5 && slippage !== 1.0 ? 'slipage_active' : ''}`}
                                    style={{ color: "white", width: "70px" }}
                                    type="input"
                                    onChange={(e) => setSlippage(e.target.value)}
                                />
                                %
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const Buy = ({ PULSEPOT }) => {
    const web3 = window.__web3;
    const account = PULSEPOT.userInfo.account;

    const [currentSellToken, setCurrentSellToken] = useState(USDT_address);
    const [currentBuyToken, setCurrentBuyToken] = useState(TTOK1_address);

    const [swapSettingModal, setSwapSettingModal] = useState(false);
    const [swapHistoryModal, setSwapHistoryModal] = useState(false);
    const [isConnect, setIsConnect] = useState(false);

    const [sellTokenBalance, setSellTokenBalance] = useState(0);
    const [buyTokenBalance, setBuyTokenBalance] = useState(0);
    const [convertionRate, setConvertionRate] = useState(1);
    const [priceBNBP, setPriceBNBP] = useState(0);

    const [receive, setRecieveValue] = useState(0);
    const [pay, setPayValue] = useState(0);
    const [slippage, setSlippage] = useState(0.5);
    const [minimumReceiveAmount, setMinimumReceiveAmount] = useState(0);
    const [priceImpact, setPriceImpact] = useState(0);
    const [isBuySellConvert, setIsBuySellConvert] = useState(false);
    const [swapWillFail, setSwapWillFail] = useState(false);
    const [isTxLoading, setIsTxLoading] = useState(false);
    const [isBalanceLoadingPay, setIsBalanceLoadingPay] = useState(false);
    const [isBalanceLoadingReceive, setIsBalanceLoadingReceive] = useState(false);

    const [isSkelection, setIsSkelection] = useState(false);

    const [isTokenSelect, setIsTokenSelect] = useState(false);
    const [selectedToken, setSelectedToken] = useState({
        name: "USDT",
        address: "0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD"
    });

    const waitTransaction = async (txHash, callback) => {
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        console.log(receipt, "receipt+++++++++++++++");
        if (!receipt) {
            setTimeout(() => waitTransaction(txHash, callback), 1000);
        } else {
            if (receipt.status === true) {
                callback && callback();
                return true;
            } else {
                Swal.fire({
                    title: "Operation Failed!",
                    showCancelButton: false,
                    icon: "success",
                });
            }
        }
    };

    const priceOfBNBP = async () => {
        const RouletteContract = new web3.eth.Contract(
            RouletteAbi.abi,
            RouletteAbi.networks[supportedChianId].address
        );
        let gasPriceOfBNBP = await RouletteContract.methods.getTokenUsdPrice(TTOK1_address).call();
        console.log(ethers.utils.formatUnits(gasPriceOfBNBP, 6));
        console.log(gasPriceOfBNBP)
        setPriceBNBP(ethers.utils.formatUnits(gasPriceOfBNBP, 6));
    }

    const onReceiveChange = (e) => {
        priceOfBNBP()
        let buyTokenValue = Number(e.target.value);
        setRecieveValue(buyTokenValue);
        setSwapWillFail(false);
        // calcWithAutoRouter(taxTokenValue);
        if (web3) {
            setIsBalanceLoadingPay(true)
            getInfoForBuy(buyTokenValue);
        }
    };

    const onPayChange = async (e) => {
        priceOfBNBP()
        let taxTokenValue = Number(e.target.value);
        setPayValue(taxTokenValue);
        setSwapWillFail(false);
        // calcWithAutoRouter(taxTokenValue);
        if (web3) {
            setIsSkelection(true)
            setIsBalanceLoadingReceive(true)
            getInfoForSell(taxTokenValue);
        }
    };

    const selectedMenu = (item) => {
        console.log(item)
        if (item) {
            const { name, address } = item;
            setSelectedToken({ name, address })
        }

    };

    const setMaxBalance = () => {
        setPayValue(sellTokenBalance);
        if (web3) {
            isBuySellConvert ?
                getInfoForSell(buyTokenBalance)
                :
                getInfoForSell(sellTokenBalance)

        }
    };
    const settingCall = () => {
        setSwapSettingModal(true);
    };

    const buySellConvert = () => {
        setIsBuySellConvert(!isBuySellConvert);

        const payTemp = pay;
        setPayValue(receive);
        setRecieveValue(payTemp);

        const sellTokenTemp = currentSellToken;
        setCurrentSellToken(currentBuyToken);
        setCurrentBuyToken(sellTokenTemp);

        const sellBalanceTemp = sellTokenBalance;
        setSellTokenBalance(buyTokenBalance);
        setBuyTokenBalance(sellBalanceTemp);
    }

    const swapCall = async () => {
        let deadline = Date.now() + 60000000;
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        if (!isConnect) {
            return Toast.fire({
                icon: "warning",
                title: "Please connect wallet",
            });
        }
        if (receive <= 0 || pay <= 0) {
            return Toast.fire({
                icon: "warning",
                title: "Please enter amount",
            });
        }

        setIsTxLoading(true);
        const Uniswap = new web3.eth.Contract(
            UniswapContract.abi,
            UniswapContract.networks[supportedChianId].address
        );
        try {
            const sellTokenContract = new web3.eth.Contract(erc20Abi, currentSellToken);
            const sellTokenDecimal = await sellTokenContract.methods.decimals().call();
            const buyTokenContract = new web3.eth.Contract(erc20Abi, currentBuyToken);
            const buyTokenDecimal = await buyTokenContract.methods.decimals().call();

            const contract = new web3.eth.Contract(erc20Abi, currentSellToken);
            const approvedata = contract.methods
                .approve(
                    UniswapContract.networks[supportedChianId].address,
                    ethers.utils.parseUnits(pay.toString(), sellTokenDecimal)
                )
                .encodeABI();
            const json = {
                from: account,
                to: currentSellToken,
                chainId: web3.utils.toHex(supportedChianId),
                data: approvedata,
            };
            const res = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [json],
            });
            await waitTransaction(res, async () => {

                let data = Uniswap.methods
                    .swapExactTokensForTokens(
                        ethers.utils.parseUnits(pay.toString(), sellTokenDecimal),
                        ethers.utils.parseUnits((receive * (100 - slippage) / 100).toString(), buyTokenDecimal),
                        [currentSellToken, WETH_address, currentBuyToken],
                        account,
                        Math.round(deadline / 1000).toString()
                    )
                    .encodeABI();

                const transactionParameters = {
                    from: account,
                    to: UniswapContract.networks[supportedChianId].address,
                    data: data,
                    chainId: web3.utils.toHex(supportedChianId),
                };

                const txHash = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [transactionParameters],
                });

                waitTransaction(txHash, () => {
                    getUserBalance();
                    setIsTxLoading(false);
                    Toast.fire({
                        icon: "success",
                        title: "Swap Success",
                    });
                });
            });

            // function swapExactTokensForTokens(
            //     uint amountIn,
            //     uint amountOutMin,
            //     address[] calldata path,
            //     address to,
            //     uint deadline
            // ) external returns(uint[] memory amounts);

            // function swapExactTokensForTokensSupportingFeeOnTransferTokens(
            //     uint amountIn,
            //     uint amountOutMin,
            //     address[] calldata path,
            //     address to,
            //     uint deadline
            // ) external;
        } catch (error) {
            console.error(error);
            setIsTxLoading(false)
            Toast.fire({
                icon: "error",
                title: "Buy Fail",
            });
        }
    };

    const getUserBalance = async () => {
        // Get User Balance
        if (!web3 || !account) return;
        const sellTokenContract = new web3.eth.Contract(erc20Abi, currentSellToken);
        const sellTokenDecimal = await sellTokenContract.methods.decimals().call();
        const buyTokenContract = new web3.eth.Contract(erc20Abi, currentBuyToken);
        const buyTokenDecimal = await buyTokenContract.methods.decimals().call();

        const sellTokenBalance = toFloat(
            await sellTokenContract.methods.balanceOf(account).call(),
            sellTokenDecimal
        );
        const buyTokenBalance = toFloat(
            await buyTokenContract.methods.balanceOf(account).call(),
            buyTokenDecimal
        );

        setSellTokenBalance(sellTokenBalance);
        setBuyTokenBalance(buyTokenBalance);
    };

    const getInfoForSell = async (sellTokenValue) => {
        try {
            isBuySellConvert ?
                setIsBalanceLoadingPay(true)
                :
                setIsBalanceLoadingReceive(true)

            const sellTokenContract = new web3.eth.Contract(erc20Abi, currentSellToken);
            const sellTokenDecimal = await sellTokenContract.methods.decimals().call();
            const buyTokenContract = new web3.eth.Contract(erc20Abi, currentBuyToken);
            const buyTokenDecimal = await buyTokenContract.methods.decimals().call();
            const UniswapRouterContract = new web3.eth.Contract(
                UniswapContract.abi,
                UniswapContract.networks[supportedChianId].address
            );
            const amounts = await UniswapRouterContract.methods
                .getAmountsOut(
                    ethers.utils.parseUnits(sellTokenValue.toString(), sellTokenDecimal),
                    [currentSellToken, WETH_address, currentBuyToken]
                )
                .call();

            const receivedValue = toFloat(amounts[2], buyTokenDecimal);
            setConvertionRate(receivedValue / sellTokenValue);
            setMinimumReceiveAmount(receivedValue * (100 - slippage) / 100);

            console.log(amounts[0], toFloat(amounts[1]), toFloat(amounts[2], buyTokenDecimal));

            const sellTokenToEthReserve = await getPairReserve(currentSellToken, WETH_address);
            const ethToBuyTokenReserve = await getPairReserve(WETH_address, currentBuyToken);

            console.log('sellTokenToEthReserve : ', sellTokenToEthReserve);
            // sellTokenToEthReserve[0] = USDT
            // sellTokenToEthReserve[1] = ETH

            // ethToBuyTokenReserve[0] = TTOK
            // ethToBuyTokenReserve[1] = ETH

            // console.log('sellTokenToEthReserve : ', ethToBuyTokenReserve);
            // console.log('receivedValue : ', receivedValue)
            const expectedPrice =
                1 / ((toFloat(sellTokenToEthReserve[0], sellTokenDecimal) / toFloat(sellTokenToEthReserve[1])) * toFloat(ethToBuyTokenReserve[0]) / toFloat(ethToBuyTokenReserve[1], buyTokenDecimal));
            const priceImpact =
                (convertionRate / expectedPrice) * 100 - 99.4;


            // let constant1 = toFloat(sellTokenToEthReserve[0], sellTokenDecimal) * toFloat(sellTokenToEthReserve[1], sellTokenDecimal)
            // let constant2 = toFloat(ethToBuyTokenReserve[0], sellTokenDecimal) * toFloat(ethToBuyTokenReserve[1], sellTokenDecimal)
            // let priceImpact1 = ((constant1 / (toFloat(ethToBuyTokenReserve[0], sellTokenDecimal) + sellTokenValue)) / (constant1 / toFloat(ethToBuyTokenReserve[0], sellTokenDecimal))) * 100 -100;
            // let priceImpact2 = ((constant1 / (toFloat(ethToBuyTokenReserve[0], sellTokenDecimal) + sellTokenValue)) / (constant1 / toFloat(ethToBuyTokenReserve[0], sellTokenDecimal))) * 100 - 100;

            setPriceImpact(priceImpact);
            // console.log(priceImpact, receivedValue, expectedPrice);
            setRecieveValue(receivedValue);
            setIsBalanceLoadingPay(false)
            setIsBalanceLoadingReceive(false)
            setIsSkelection(false)
        } catch (error) {
            console.log('getInfoForSell : ')
            console.log(error)
            setIsBalanceLoadingPay(false)
            setIsBalanceLoadingReceive(false)
            setIsSkelection(false)
            setSwapWillFail(true);

        }

    }

    const getInfoForBuy = async (buyTokenValue) => {
        const sellTokenContract = new web3.eth.Contract(erc20Abi, currentSellToken);
        const sellTokenDecimal = await sellTokenContract.methods.decimals().call();
        const buyTokenContract = new web3.eth.Contract(erc20Abi, currentBuyToken);
        const buyTokenDecimal = await buyTokenContract.methods.decimals().call();
        const UniswapRouterContract = new web3.eth.Contract(
            UniswapContract.abi,
            UniswapContract.networks[supportedChianId].address
        );
        try {
            const amounts = await UniswapRouterContract.methods
                .getAmountsIn(
                    ethers.utils.parseUnits(buyTokenValue.toString(), buyTokenDecimal),
                    [currentSellToken, WETH_address, currentBuyToken]
                )
                .call();
            const payValue = toFloat(amounts[0], sellTokenDecimal);
            setConvertionRate(buyTokenValue / payValue);
            setMinimumReceiveAmount(buyTokenValue * (100 - slippage) / 100);

            console.log(amounts[0], toFloat(amounts[1]), toFloat(amounts[2], buyTokenDecimal));

            const sellTokenToEthReserve = await getPairReserve(currentSellToken, WETH_address);
            const ethToBuyTokenReserve = await getPairReserve(WETH_address, currentBuyToken);

            const expectedPrice =
                1 / ((toFloat(sellTokenToEthReserve[0], sellTokenDecimal) / toFloat(sellTokenToEthReserve[1])) * toFloat(ethToBuyTokenReserve[0]) / toFloat(ethToBuyTokenReserve[1], buyTokenDecimal));
            const priceImpact =
                (convertionRate / expectedPrice) * 100 - 99.4;

            setPriceImpact(priceImpact);
            console.log(priceImpact, buyTokenValue, expectedPrice);
            setPayValue(payValue);
            setIsBalanceLoadingPay(false)
            setIsBalanceLoadingReceive(false)
        } catch (error) {
            console.log('getInfoForBuy : ')
            console.log(error)
            setIsBalanceLoadingReceive(false)
            setIsBalanceLoadingPay(false)
            setSwapWillFail(true);
            setPayValue(0);
            setConvertionRate(0);
            setMinimumReceiveAmount(0);
        }
    }

    const getPairReserve = async (token1, token2) => {
        const UniswapFactoryContract = new web3.eth.Contract(
            factory.abi,
            factory.networks[supportedChianId].address
        );
        const pair = new web3.eth.Contract(
            UniswapV2PairAbi,
            await UniswapFactoryContract.methods
                .getPair(token1, token2)
                .call()
        );
        const pairToken1 = await pair.methods.token0().call();
        const pairToken2 = await pair.methods.token1().call();
        const reserves = await pair.methods.getReserves().call();

        if (pairToken1 == token1) {
            return [reserves._reserve0, reserves._reserve1];
        }
        return [reserves._reserve1, reserves._reserve0];
    }

    useEffect(() => {
        getUserBalance();
        if (account && account.length > 0) {
            setIsConnect(true);
        }
    }, [account, web3]);

    return (
        <>
            {/* bg-[#1b1b1b] */}
            <div className="buy-container">
                <section className="container mx-auto flex flex-col premium-container">
                    <div className=" premium-div">
                        <div>
                            <div className="flex justify-between items-center gap-2">
                                <div className="currnet-premium">
                                    <h1 style={{ color: 'white', fontSize: '35px', margin: '0', padding: '0px' }}>
                                        {((30 / 0.154904) * 100 - 100).toFixed(0) > 100 ? '+' : '-'}
                                        {
                                            ((30 / 0.154904) * 100 - 100).toFixed(0)
                                        }&nbsp;%
                                    </h1>
                                    <p>Current&nbsp;premium</p>
                                </div>
                                <div
                                    className="flex-3 flex items-center justify-end gap-3"
                                >
                                    <h3 className="text-center">Trade To <span style={{ color: 'white' }}>BNBP</span> and enjoy the free premium betting value!</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container mx-auto flex flex-col swap-container mb-10">
                    <div className="sm:mt-32  buy-div">
                        <div>
                            <div className="flex justify-end items-center">
                                <div
                                    className="flex-3 flex items-center justify-end gap-3"
                                    style={{ flex: 3 }}
                                >
                                    <AiOutlineSetting
                                        onClick={settingCall}
                                        className="text-2xl cursor-pointer hover:text-blue-500"
                                    />
                                    <TbRefresh
                                        onClick={getUserBalance}
                                        className="text-2xl cursor-pointer hover:text-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <span className="swap-title font-semibold">
                                    Swap
                                </span>
                            </div>
                            <div className="mt-4">
                                <div className="swap-underline"></div>
                            </div>
                            {/* <p className="font-inter nt-3 text:[#0f0f0f] dark:buy-grey-color text-sm mb-4">
                                METAMASK
                            </p> */}
                            <div className={`flex items-center justify-between flex-col ${isBuySellConvert ? 'flex-col-reverse-i' : ''}`}>
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <p className="font-inter buy-grey-color text-sm mb-2">
                                            You {!isBuySellConvert ? 'Pay' : 'Receive'}
                                        </p>
                                        <p className="font-inter buy-grey-color text-sm mb-2">
                                            Balance : {!isBuySellConvert ? sellTokenBalance.toFixed(4) : buyTokenBalance.toFixed(4)}
                                        </p>
                                    </div>
                                    <div className={`swap-input-container ${isBalanceLoadingPay && 'balance-loading'}`}>
                                        <div className="flex items-center">
                                            <div className="flex flex-col">
                                                <div className="">
                                                    <input
                                                        onChange={(e) => !isBuySellConvert ? onPayChange(e) : onReceiveChange(e)}
                                                        value={!isBuySellConvert ? pay : receive}
                                                        type="number"
                                                        className="swap-input"
                                                    />
                                                </div>
                                                <div className="">
                                                    $1.00
                                                </div>
                                            </div>
                                        </div>
                                        <div className="token-list-container">
                                            <div onClick={() => setIsTokenSelect(!isTokenSelect)} className="flex items-center justify-between gap-2">
                                                <img width={'30px'} height={'30px'} src={`/assets/buy/${selectedToken.name}.svg`} alt={selectedToken.name} />
                                                <div className="token-list-name">{selectedToken.name}</div>
                                                <div className=""><BsChevronDown className="token-list-dropdown-icon" /></div>
                                            </div>
                                            <div className={`token-list ${isTokenSelect ? 'token-list-show' : ''}`}>
                                                {
                                                    PayTokenList.map((item, index) => (
                                                        selectedToken.name === item.name ?
                                                            <></>
                                                            :
                                                            <div onClick={() => selectedMenu(item)} className="token-list-row">
                                                                <img width={'20px'} height={'20px'} src={`/assets/buy/${item.name}.svg`} alt="" />
                                                                <div className="token-name">{item.name}</div>
                                                            </div>

                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="w-full flex justify-end">
                                        <button
                                            onClick={setMaxBalance}
                                            className="swap-max-btn"
                                        >
                                            Max
                                        </button>
                                    </div>
                                    <div className="flex justify-center">
                                        <div
                                            className="flex items-center justify-between m-auto"
                                        >
                                            <TbArrowsDownUp onClick={buySellConvert} className="buy-sell-convert-btn" />
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="flex items-center justify-between">
                                        <p className="font-inter buy-grey-color text-sm mb-2">
                                            You {isBuySellConvert ? 'Pay' : 'Receive'}
                                        </p>
                                        <p className="font-inter buy-grey-color text-sm mb-2">
                                            Balance : {isBuySellConvert ? sellTokenBalance.toFixed(4) : buyTokenBalance.toFixed(4)}
                                        </p>
                                    </div>
                                    <div className={`swap-input-container ${isBalanceLoadingReceive && 'balance-loading'}`}>
                                        <div className="flex items-center">
                                            <div className="flex flex-col">
                                                <div className="">
                                                    <input
                                                        onChange={(e) => !isBuySellConvert ? onReceiveChange(e) : onPayChange(e)}
                                                        value={!isBuySellConvert ? receive : pay}
                                                        type="number"
                                                        className="swap-input"
                                                    />
                                                </div>
                                                <div className="">
                                                    ${
                                                        priceBNBP * receive
                                                        // <Skeleton width={'100px'} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="show-dropdown flex items-center gap-2">
                                            {
                                                <>
                                                    <img
                                                        src={BNBP}
                                                        alt="error"
                                                        style={{ width: "35px", height: "33px" }}
                                                    />
                                                    &nbsp;
                                                    <p className="bnbp-text">
                                                        BNBP
                                                    </p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 flex items-center gap-2" style={{ height: '20px' }}>
                            {
                                isTxLoading || isBalanceLoadingPay || isBalanceLoadingReceive ?
                                    <>
                                        <img width={'20px'} height={'20px'} src={loading} alt="loading" />
                                        {
                                            isTxLoading ?
                                                <>
                                                    Swapping...
                                                </>
                                                : <>
                                                    Fetching best price...
                                                </>
                                        }
                                    </>
                                    : <></>
                            }
                        </div>
                        {/* {convertionRate != 0 && (
                            <div className="px-4 pt-4">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-xs" style={{ color: "#7645d9" }}>
                                        Price
                                    </p>
                                    <div className="flex items-center justify-end gap-2">
                                        {isSkelection ?
                                            <Skeleton width={'150px'} />
                                            :
                                            <p className="">
                                                1 USDT = {(convertionRate).toFixed(4)} BNBP{" "}
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )} */}
                        <div className="px-4">
                            <div className="flex items-center justify-between">
                                <p className="slippage-tolerance">
                                    Slippage Tolerance
                                </p>
                                <div className="flex items-center justify-end gap-2">
                                    <p className="slippage-precent">{slippage}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {swapWillFail ?
                                <button
                                    className={`swap-btn swap-shadow`}
                                    disabled
                                    style={{ fontSize: '20px' }}
                                >
                                    Insufficient liquidity for this trade.
                                </button>
                                :
                                isTxLoading || isBalanceLoadingPay || isBalanceLoadingReceive ?
                                    <button
                                        disabled
                                        className={`swap-btn swap-shadow`}
                                    >
                                        SWAP
                                    </button>
                                    :
                                    <button
                                        onClick={swapCall}
                                        className={`swap-btn swap-shadow`}
                                    >
                                        SWAP
                                    </button>
                            }
                        </div>
                        {/* <div className="pt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                Minimum received&nbsp;
                                <AiOutlineQuestionCircle />
                            </div>
                            <p className="">
                                {isSkelection ?
                                    <Skeleton width={'100px'} />
                                    :
                                    <>
                                        {minimumReceiveAmount.toFixed(5)} BNBP
                                    </>
                                }
                            </p>
                        </div>
                        <div className="pt-1 flex items-center justify-between">
                            <div className="flex items-center">
                                Price Impact&nbsp;
                                <AiOutlineQuestionCircle />
                            </div>
                            <p className="">
                                {isSkelection ?
                                    <Skeleton width={'100px'} />
                                    :
                                    <>
                                        {priceImpact.toFixed(2)}%
                                    </>
                                }
                            </p>
                        </div> */}
                    </div>

                </section>
            </div>
            {swapSettingModal && (
                <SwapSettingModal
                    setSwapSettingModal={setSwapSettingModal}
                    slippage={slippage}
                    setSlippage={setSlippage}
                />
            )}
            {swapHistoryModal && (
                <SwapHistoryModal setSwapHistoryModal={setSwapHistoryModal} />
            )}
        </>
    );
};

Buy.propTypes = {
    PULSEPOT: PropTypes.any,
};

export default Buy;
