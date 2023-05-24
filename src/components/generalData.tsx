import styles from "../styles/generalData.module.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React, { useState, useEffect } from "react";
import PieChart from './piechart'
interface GeneralDataProps {

}

const GeneralData: React.FC<GeneralDataProps> = () => {
  const [value, setValue] = useState<number>(2);
  const [inputValue, setInputValue] = useState<number>(0.0);
  const [rewardValue, setRewardValue] = useState<number>(0.0);
  const [percenteValue, setPercenteValue] = useState<number>(0);



  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
    const rewardValue = (parseFloat(inputValue.toString()) * (1 + (newValue as number) * 0.25)).toFixed(2);
    setRewardValue(parseFloat(rewardValue));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(event.target.value));
    const rewardValue = parseFloat(((parseFloat(event.target.value) * (1 + (value as number) * 0.25)) as number).toFixed(2));
    setRewardValue(rewardValue);

  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '0') {
      event.target.select();
    }
  };

  useEffect(() => {
    if (rewardValue === 0.0 && inputValue === 0.0) {
      setPercenteValue(0);
    } else {
      setPercenteValue(parseInt(((rewardValue - inputValue) / inputValue * 100).toString(), 10));
    }
 
  }, [rewardValue, inputValue]);

  const formatRewardValue = (value: number) => {
    return parseFloat(value.toString()).toLocaleString("en").replace(/,/g, "'");
  };

  return (
    <section className={styles.dataContainer}>
      <div className={styles.data}>
        <div className={styles.dataLeftSide}>
          <div className={styles.dataSummary}>
            <div className={styles.dataSummaryDetails}>
              <p>Vested</p>
              <span className={styles.spanTotal}>Total</span>
              <h3>5'126'522'292</h3>
              <span className={styles.spanOGY}>OGY</span>
            </div>
            <div className={styles.locked}>
              <span className={styles.lockedText}>Locked</span>
              <span className={styles.lockedNumber}>
                <input data-testid="locked-input" type="text" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} />
              </span>
            </div>
            <div className={styles.rewards}>
              <span className={styles.rewardsText}>Rewards</span>
              <span data-testid="reward-number" className={styles.rewardsNumber}>{formatRewardValue(rewardValue)}</span>
            </div>
          </div>
          <div className={styles.dataEstimation}>
            <div className={styles.dataEstimationDetails}>
              <div className={styles.dataEstimationDetailsText}>Estimare Rewards</div>
              <div data-testid="percent-gain" className={styles.dataEstimationDetailsPercent}>{percenteValue}%</div>
            </div>
            <div className={styles.dataEstimationInfo}>
              <div>Neuron dissolve delay</div>
              <div>{value} years</div>
            </div>
            <div className={styles.sliderContainer}>
              <Box width={'100%'}>
                <Slider value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} aria-labelledby="input-slider" max={10} />
              </Box>
            </div>
          </div>
        </div>
        <PieChart inputValue={inputValue} rewardValue={rewardValue} />

      </div>
    </section>
  );
};

export default GeneralData;
