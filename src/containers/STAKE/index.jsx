import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress } from '@material-ui/core';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import PLSP from '../../abis/PLSP.json';
import PotLottery from '../../abis/PotLottery.json';
import {
  StakingHeader,
  StakingWrapper,
  InfoText,
  InfoText2,
  StkaingHeaderUnderline,
  CreateStakingWrapper,
  CreateStakingButton,
  StakingListWrapper,
  LoadingWrapper,
  StakingAmountInput,
} from './style';
import './stake.css';
import PLSPImg from '../../assets/images/plsp.png';
import logo from '../../assets/images/logo.png';
import StakingInfo from './StakingInfo';
import StakingItem from './StakingItem';

const StakingPage = ({ PULSEPOT, isDarkMode }) => {

  const web3 = window.__web3;
  const account = PULSEPOT.userInfo.account;

  const oneDay = 24 * 3600;
  const [stakingList, setStakingList] = useState([]);
  const [airdropPool, setAirdropPool] = useState(0);
  const [nextAirdropTime, setNextAirdropTime] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalStaking, setTotalStaking] = useState(1);
  const [totalBalance, setTotalBalance] = useState(1);
  const [currentStaking, setCurrentStaking] = useState(0);
  const [stakingTime, setStakingTime] = useState(100);
  const [stakingMinimum, setStakingMinimum] = useState(0);
  const [stakingAmount, setStakingAmount] = useState();
  const [isStaking, setIsStaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const unStakingListRef = useRef([]);
  const stakingListRef = useRef([]);
  const loadingListRef = useRef(false);
  const getUnStakingList = () => unStakingListRef.current;
  const getStakingList = () => stakingListRef.current;
  const updateStakingList = (list) => {
    stakingListRef.current = list;
    setStakingList(list);
  };
  const convertToFloat = (val) => {
    return Number.parseFloat(ethers.utils.formatEther(val));
  };
  const getStakingInfo = async (update = false) => {
    if (!web3) return;
    if (update) {
      loadingListRef.current = true;
    }

    const PLSPContract = new web3.eth.Contract(
      PLSP.abi,
      PLSP.networks[4].address
    );
    const PotLotteryContract = new web3.eth.Contract(
      PotLottery.abi,
      PotLottery.networks[4].address
    );
    const list = await PLSPContract.methods.getUserStakingInfo(account).call();
    const airdropPool = await PotLotteryContract.methods.airdropPool().call();
    const currentBalance = convertToFloat(
      await PLSPContract.methods.balanceOf(account).call()
    );
    const totalBalance = convertToFloat(
      await PLSPContract.methods.totalSupply().call()
    );
    const totalStaking = convertToFloat(
      await PLSPContract.methods.getTotalStakingAmount().call()
    );
    const currentStaking = list.reduce(
      (total, current) => total + convertToFloat(current.balance),
      0
    );
    const lastAirdropTime = await PLSPContract.methods.lastAirdropTime().call();
    const airdropInterval = await PotLotteryContract.methods
      .airdropInterval()
      .call();
    const stakingMinimumTime = await PotLotteryContract.methods
      .minimumStakingTime()
      .call();
    const stakingMinimumAmount = convertToFloat(
      await PotLotteryContract.methods.stakingMinimum().call()
    );

    updateStakingList(
      list.map((staking) => ({
        ...staking,
        balance: convertToFloat(staking.balance),
        timestamp: Number.parseInt(staking.timestamp),
      }))
    );
    setAirdropPool(airdropPool);
    setBalance(currentBalance);
    setTotalStaking(totalStaking);
    setTotalBalance(totalBalance);
    setCurrentStaking(currentStaking);
    setNextAirdropTime(
      Number.parseInt(lastAirdropTime) + Number.parseInt(airdropInterval)
    );
    setStakingTime(Number.parseInt(stakingMinimumTime));
    setStakingMinimum(stakingMinimumAmount);

    if (update) {
      loadingListRef.current = false;
    }
  };

  const waitTransaction = async (txHash, callback) => {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    console.log(receipt, 'receipt+++++++++++++++');
    if (!receipt) {
      setTimeout(() => waitTransaction(txHash, callback), 1000);
    } else {
      if (receipt.status === true) {
        callback && callback();
        getStakingInfo();
      } else {
        Swal.fire({
          title: 'Operation Failed!',
          showCancelButton: false,
          icon: 'success',
        });
      }
    }
  };

  const unStakeItem = async (staking) => {
    const PLSPContract = new web3.eth.Contract(
      PLSP.abi,
      PLSP.networks[4].address
    );

    try {
      const transactionParameters = {
        from: account,
        to: PLSP.networks[4].address,
        data: PLSPContract.methods.unStakePLSP(staking.id).encodeABI(),
        chainId: web3.utils.toHex(4),
      };
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      unStakingListRef.current.push(staking.id);
      setLoading(!loading);
      waitTransaction(txHash, () => {
        unStakingListRef.current = getUnStakingList().filter(
          (id) => id !== staking.id
        );
        updateStakingList(
          getStakingList().filter(({ id }) => id !== staking.id)
        );
        setLoading(!loading);
        Swal.fire({
          title: 'Unstaking Success!',
          showCancelButton: false,
          icon: 'success',
        });
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Unstaking Cancelled!',
        showCancelButton: false,
        icon: 'error',
      });
    }
  };
  const stakePLSP = async () => {
    if (stakingMinimum > stakingAmount) {
      Swal.fire({
        title: 'Should stake more than minimum at once',
        showCancelButton: false,
        icon: 'warning',
      });
      return;
    }
    const PLSPContract = new web3.eth.Contract(
      PLSP.abi,
      PLSP.networks[4].address
    );

    try {
      const transactionParameters = {
        from: account,
        to: PLSP.networks[4].address,
        data: PLSPContract.methods
          .stakePLSP(web3.utils.toWei(stakingAmount + '', 'ether'))
          .encodeABI(),
        chainId: web3.utils.toHex(4),
      };
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      setIsStaking(true);
      waitTransaction(txHash, () => {
        Swal.fire({
          title: 'Staking Success!',
          showCancelButton: false,
          icon: 'success',
        });
        setIsStaking(false);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Staking Cancelled!',
        showCancelButton: false,
        icon: 'error',
      });
    }
  };
  useEffect(() => {
    getStakingInfo(true);
  }, [account]);

  return (
    <>
      <StakingWrapper isDarkMode={isDarkMode}>
        <StakingHeader isDarkMode={isDarkMode}>
          <InfoText2 isDarkMode={isDarkMode} fontSize={25}>Staking</InfoText2>
          {/* <img src={PLSPImg} width="40px" alt="plsp icon"></img> */}
        </StakingHeader>
        <StkaingHeaderUnderline isDarkMode={isDarkMode} />
        <StakingInfo
          isDarkMode={isDarkMode}
          airdropPool={airdropPool}
          nextAirdropTime={nextAirdropTime}
          totalStaking={totalStaking}
          currentStaking={currentStaking}
          totalBalance={totalBalance}
          balance={balance}
        />
        <CreateStakingWrapper isDarkMode={isDarkMode}>
          <div style={{ marginTop: '20px' }}></div>
          <InfoText2 isDarkMode={isDarkMode} className="mb-4">CREATE NEW STAKE</InfoText2>
          <div style={{ marginTop: '20px' }}></div>
          <StakingAmountInput
            isDarkMode={isDarkMode}
            type="number"
            placeholder="Enter Amount"
            value={stakingAmount}
            endAdornment={<img width={30} src={logo} alt="plsp icon" />}
            onChange={(e) => setStakingAmount(e.target.value)}
          ></StakingAmountInput>
          <CreateStakingButton
            onClick={stakePLSP}
            isDarkMode={isDarkMode}
            disabled={isStaking || loadingListRef.current || !account}
          >
            {isStaking && (
              <CircularProgress className="mr-1" color="inherit" size={20} />
            )}
            <span style={isDarkMode ? { color: 'white' } : { color: 'black' }} > STAKE {Math.floor(stakingTime / oneDay)} days</span>
            {/* <span>STAKE 100 days</span> */}
          </CreateStakingButton>
        </CreateStakingWrapper>
        <StakingListWrapper isDarkMode={isDarkMode}>
          {loadingListRef.current ? (
            <LoadingWrapper>
              <CircularProgress color="secondary" />
              <span className="ml-3">Loading...</span>
            </LoadingWrapper>
          ) : (
            stakingList.map((staking, index) => (
              <StakingItem
                isDarkMode={isDarkMode}
                key={index}
                item={staking}
                stakingTime={stakingTime}
                unStake={() => unStakeItem(staking)}
                loading={getUnStakingList().includes(staking.id)}
              />
            ))
          )}
        </StakingListWrapper>
      </StakingWrapper>
    </>
  );
};

StakingPage.propTypes = {
  PULSEPOT: PropTypes.any,
  isDarkMode: PropTypes.any,
};

export default StakingPage;
