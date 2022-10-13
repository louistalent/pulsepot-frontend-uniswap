import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import {
  InfoText,
  StakingItemWrapper,
  StakingProgressWrapper,
  StyledLinearProgress,
  UnStakeButton,
} from './style';
import logo from '../../assets/images/logo.png';
// import { getDay } from './utils';

const StakingItem = (props) => {
  const { item, unStake, stakingTime, loading, isDarkMode } = props;
  const oneDay = 3600 * 24;
  const daysPassed = (Date.now() / 1000 - item.timestamp) / oneDay;
  const timePassed = Date.now() / 1000 - item.timestamp;
  let percent = (timePassed / stakingTime) * 100;
  if (percent > 100) percent = 100;

  return (
    <StakingItemWrapper>
      <InfoText
        color="#7e7575"
        fontSize="11"
        style={{ width: '100%', textAlign: 'center', marginBottom: '1px' }}
      >
        {daysPassed && Math.floor(daysPassed)} / {Math.floor(stakingTime / oneDay)} DAYS {' '}
        {/* {Math.ceil((daysPassed * 100) / (stakingTime / oneDay))} / 100 DAYS */}
        SERVED
      </InfoText>
      <InfoText style={{ paddingTop: '4px', color: `${isDarkMode ? 'white' : 'black'}` }} fontSize={18} fontWeight={800}>
        {item.balance} PLSP
        {/* <img src={logo} width={20} alt="plsp icon" /> */}
      </InfoText>
      <StakingProgressWrapper>
        <StyledLinearProgress isDarkMode={isDarkMode} variant="determinate" value={50} />
      </StakingProgressWrapper>
      <UnStakeButton onClick={unStake} disabled={percent !== 100 || loading}>
        {loading && (
          <CircularProgress color="inherit" size={20} className="mr-1" />
        )}
        UNSTAKE
      </UnStakeButton>
    </StakingItemWrapper>
  );
};

StakingItem.propTypes = {
  item: PropTypes.any,
  unStake: PropTypes.func,
  stakingTime: PropTypes.number,
  loading: PropTypes.bool,
};

export default StakingItem;
