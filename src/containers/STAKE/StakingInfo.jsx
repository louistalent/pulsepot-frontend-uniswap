import React from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import { StakingInfoWrapper, InfoText } from './style';
import { getDay, getHour } from './utils';
import logo from '../../assets/images/logo.png';

const StakingInfo = (props) => {
  const {
    airdropPool,
    nextAirdropTime,
    totalStaking,
    currentStaking,
    totalBalance,
    balance,
    isDarkMode
  } = props;

  return (
    <StakingInfoWrapper isDarkMode={isDarkMode}>
      <Container>
        <div className='staking-info'>
          <Row className="stkaing-info-row">
            <Col sm={2} md={3} lg={4} className="text-center mb-2 stkaing-info-col">
              <div className="mb-2">
                <InfoText color="#c1b8b8">
                  Airdrop Reward {ethers.utils.formatEther(airdropPool)}
                </InfoText>
              </div>
              <div>
                <InfoText color="#c1b8b8">
                  {getDay(nextAirdropTime)} days & {getHour(nextAirdropTime)}{' '}
                  hours
                </InfoText>
              </div>
            </Col>
            <Col
              sm={2}
              md={2}
              offset={{ lg: 0, md: 0, sm: 1 }}
              lg={4}
              className="text-center mb-2 stkaing-info-col"
            >
              <div className="mb-2">
                <InfoText color="#c1b8b8">
                  Your Stake{' '}
                  {totalStaking === 0 ? 0 : (currentStaking / totalStaking) * 100}%
                </InfoText>
              </div>
              <div>
                <InfoText color="#c1b8b8">
                  Global Stake:{' '}
                  {totalBalance === 0
                    ? 0
                    : ((totalStaking / totalBalance) * 100).toFixed(2)}
                  %
                </InfoText>
              </div>
            </Col>
            <Col
              sm={2}
              md={3}
              offset={{ lg: 0, md: 0, sm: 1 }}
              lg={4}
              className="text-center "
            >
              <div className="mb-2">
                <InfoText color="#c1b8b8">Staked {currentStaking} PLSP</InfoText>
              </div>
              <div>
                <InfoText color="#c1b8b8">Available {balance - currentStaking} PLSP</InfoText>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </StakingInfoWrapper>
  );
};

StakingInfo.propTypes = {
  airdropPool: PropTypes.any,
  nextAirdropTime: PropTypes.any,
  totalStaking: PropTypes.number,
  currentStaking: PropTypes.number,
  totalBalance: PropTypes.number,
  balance: PropTypes.number,
};

export default StakingInfo;
