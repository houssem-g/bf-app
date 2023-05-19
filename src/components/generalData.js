import styles from ".././styles/generalData.module.css";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const GeneralData = ({ data }) => {
    const [value, setValue] = useState(2);
    const [inputValue, setInputValue] = useState(0.0);
    const [rewardValue, setRewardValue] = useState(0.0);
    const [percenteValue, setPercenteValue] = useState(0);

    const handleSliderChange = (event) => {
        setValue(event.target.value);
        setRewardValue(parseFloat(parseFloat(inputValue).toFixed(2) * (1 + parseInt(event.target.value) * 0.25)).toFixed(2));
      };
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setRewardValue(parseFloat(parseFloat(event.target.value).toFixed(2) * (1 + parseInt(value) * 0.25)).toFixed(2));
      };
    const handleInputFocus = (event) => {
        if (event.target.value === '0' ) {
            event.target.select();            
        }
    };
    useEffect(() => {
        if(rewardValue == 0.0 && inputValue == 0.0) {
            setPercenteValue(0)
        }
        else {
            setPercenteValue(parseInt(((parseFloat(rewardValue) - parseFloat(inputValue)) / parseFloat(inputValue)) * 100));
        }
    }, [rewardValue, inputValue]);
    
    const formatRewardValue = (value) => {
        console.log("test")
        return parseFloat(value).toLocaleString("en").replace(/,/g, "'");
    };
    return (
        <section className={styles.dataContainer}>
            <div className={styles.data}>
                <div className={styles.dataLeftSide}>
                    <div className={styles.dataSummary}>
                        <div className={styles.dataSummaryDetails}>
                            <p >Vested</p>
                            <span className={styles.spanTotal}>Total</span>
                            <h3>5'126'522'292</h3>
                            <span className={styles.spanOGY}>OGY</span>
                        </div>

                        <div className={styles.locked}>
                            <span className={styles.lockedText}>
                                Locked
                            </span>
                            <span className={styles.lockedNumber}>
                                <input type="text" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} />
                            </span>
                        </div>
                        <div className={styles.rewards}>
                            <span className={styles.rewardsText}>
                                Rewards
                            </span>
                            <span className={styles.rewardsNumber}>
                                {formatRewardValue(rewardValue)}
                            </span>
                        </div>
                    </div>

                    <div className={styles.dataEstimation}>
                        <div className={styles.dataEstimationDetails}>
                            <div className={styles.dataEstimationDetailsText}>
                                Estimare Rewards
                            </div>
                            <div className={styles.dataEstimationDetailsPercent}>
                                {percenteValue}%
                            </div>
                        </div>

                        <div className={styles.dataEstimationInfo}>
                            <div >
                                Neuron dissolve delay
                            </div>
                            <div >
                                {value} years
                            </div>

                        </div>
                        <div className={styles.sliderContainer}>

                            <Box width={337}>
                            <Slider
                                value={typeof value === 'number' ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                                
                                max='10'
                            />
                            </Box>

                        </div>


                    </div>
                </div>

                <div className={styles.dataRightSide}>

                </div>
            </div>

        </section>
    )
}


export default GeneralData;