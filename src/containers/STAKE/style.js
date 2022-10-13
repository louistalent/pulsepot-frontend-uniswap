import { Input, LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

export const StakingWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  margin-top: 100px;
  padding: 22px 40px;
  background:${(props) => (props.isDarkMode ? '#3b3a48' : 'white')} 
`;

export const StakingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const InfoText = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : 17)}px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 700)};
  color: ${(props) => (props.color ? props.color : 'black')};
`;

export const InfoText2 = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : 17)}px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 700)};
  color: ${(props) => (props.isDarkMode ? '#727993' : 'black')};
`;


export const StkaingHeaderUnderline = styled.div`
  border-top:${(props) => (props.isDarkMode ? '1px solid #d9ab0d' : '1px solid transparent')};
  margin-bottom:30px;
  margin-top:10px;
  width:200px;
`;

export const StakingInfoWrapper = styled.div`
  border-radius: 20px;
  padding: 20px 20px 30px;
  background:${(props) => (props.isDarkMode ? '#474654' : '#F6F6F6')} 
  /* box-shadow: 0px 0px 6px rgba(128, 128, 128, 0.2); */
`;

export const CreateStakingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const CreateStakingButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background:${(props) => (props.isDarkMode ? '#474654' : 'linear-gradient(to bottom, #0073d5 0%, #a409e4 65%, #ec0094 100%)')};
  color:${(props) => (props.isDarkMode ? 'white !important' : 'black')}; 
  font-size:18px;
  font-family: inherit;
  font-weight: 700;
  margin-top: 25px;
  transition: all 0.3s linear;
  opacity: 1;
  display: flex;
  align-items: center;

  &:hover:not(:disabled) {
    cursor: pointer;
    opacity: 1;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export const StakingListWrapper = styled.div`
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const StakingItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 17px;
`;
export const StakingProgressWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  align-items: center;
`;

export const UnStakeButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #474654;
  color: white;
  font-family: inherit;
  font-weight: 700;
  transition: all 0.3s linear;
  opacity: 0.8;
  display: flex;
  align-items: center;

  &:hover:not(:disabled) {
    cursor: pointer;
    opacity: 1;
  }

  &:disabled {
    background: #474654;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  color: #ff3086;
`;

// background:${(props) => (props.isDarkMode ? '#474654!important' : 'transparent')}; 
export const StyledLinearProgress = styled(LinearProgress)`
  height: 16px !important;
  border-radius: 10px;
  width: 100%;
  background-color:${(props) => (props.isDarkMode ? '#F6F6F6 !important' : '#474654 !important')};

  div {
    background-color: #d9ab0d;
    border-radius: 15px;
  }
`;

export const StakingAmountInput = styled(Input)`
  width: 225px;
  padding: 3px 10px;
  border: ${(props) => (props.isDarkMode ? '1px solid #d9ab0d' : '#1fc7d4')};
  border-radius: 10px;
  background:${(props) => (props.isDarkMode ? '#474654' : 'transparent')} 

  :hover,
  :focus {
    border: 1px solid #2a2a2a !important;
  }

  ::before,
  ::after {
    :hover {
      border: none !important;
    }
    border: none !important;
  }

  input {
    text-align: center;
    color:${(props) => (props.isDarkMode ? 'white' : 'black')} 
  }
`;
