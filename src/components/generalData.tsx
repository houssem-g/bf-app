import styles from "../styles/generalData.module.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Chart from 'chart.js/auto';
import React, { useState, useEffect, useRef } from "react";

interface GeneralDataProps {

}


const GeneralData: React.FC<GeneralDataProps> = () => {
  const [value, setValue] = useState<number>(2);
  const [inputValue, setInputValue] = useState<number>(0.0);
  const [rewardValue, setRewardValue] = useState<number>(0.0);
  const [percenteValue, setPercenteValue] = useState<number>(0);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef: React.MutableRefObject<Chart<"doughnut", number[], unknown> | null> = useRef(null);

  const legendItems: Array<object> = [
    { text: 'Vested', fillStyle: '#0AB57F' },
    { text: 'Locked', fillStyle: '#9474EF' },
    { text: 'Rewarded', fillStyle: '#74B4EF' },
    { text: 'Test', fillStyle: '#F8B073' }
  ];

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

  let tooltipEl: HTMLDivElement;

  const handleMouseEnter = () => {
    if (tooltipEl) {
      tooltipEl.remove();
    }
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<div id="vestedRelease"></div><div id="sliceNumber"></div><div id="percentCircle"></div>';
    document.body.appendChild(tooltipEl);
  };

  const handleMouseLeave = () => {
    if (tooltipEl) {
      tooltipEl.remove();
    }
  };

  function getBody(bodyItem: any) {
    return bodyItem.lines;
  }

  useEffect(() => {
    if (rewardValue === 0.0 && inputValue === 0.0) {
      setPercenteValue(0);
    } else {
      setPercenteValue(parseInt(((rewardValue - inputValue) / inputValue * 100).toString(), 10));

    }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');
    let totRewardInput = rewardValue + inputValue !== 0 ? rewardValue + inputValue : 5126522292;
    let diffRewardInput = Math.abs(rewardValue - inputValue);
    let tot = totRewardInput + diffRewardInput + inputValue + rewardValue;

    chartInstanceRef.current = new Chart(ctx as CanvasRenderingContext2D, {

      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [totRewardInput, inputValue, rewardValue, diffRewardInput],
            backgroundColor: ['#0AB57F', '#9474EF', '#74B4EF', '#F8B073'],
            hoverBackgroundColor: ['#0AB57F', '#9474EF', '#74B4EF', '#F8B073'],
            borderWidth: 2,
            borderColor: '#161819',
          },
        ],
      },
      options: {
        cutout: 105,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          tooltip: {
            enabled: false,
            external: function (context) {
              if (context.tooltip.opacity === 0) {
                handleMouseLeave();
                return;
              }

              handleMouseEnter();

              tooltipEl?.classList.add(styles['chartjs-tooltip']);

              const tooltipModel = context.tooltip;
              let current_Number: any = 0;
              if (tooltipModel.body) {
                const titleLines = ["Vested release"];
                const bodyLines = tooltipModel.body.map(getBody);

                let innerHtml = '';

                titleLines.forEach(function (title) {
                  innerHtml += '<div class="' + styles.tooltipTitle + '">' + title + '</div>';
                });

                bodyLines.forEach(function (body, i) {
                  current_Number = parseInt(body[0].replace(/\u202F/g, ""), 10);

                  const span = '<span >' + body + '</span>';
                  innerHtml += '<div class="' + styles.tooltipBody + '">' + span + '</div>';
                  innerHtml += '<div class="' + styles.percentCircle + '">' + Math.round(100 * (current_Number / tot)).toString() + '</div>';


                });

                tooltipEl.innerHTML = innerHtml;
              }

              const position = context.chart.canvas.getBoundingClientRect();

 
              const bodyFont = (tooltipModel.options.bodyFont as any) || {};

    
              

              tooltipEl.style.opacity = '1';
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
              tooltipEl.style.font = bodyFont.size + ' ' + bodyFont.weight + ' ' + bodyFont.family;
              tooltipEl.style.pointerEvents = 'none';
            },
          },
        },
      },
    });

    if (chartInstanceRef.current) {
      chartInstanceRef.current.update();
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
                <input type="text" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} />
              </span>
            </div>
            <div className={styles.rewards}>
              <span className={styles.rewardsText}>Rewards</span>
              <span className={styles.rewardsNumber}>{formatRewardValue(rewardValue)}</span>
            </div>
          </div>
          <div className={styles.dataEstimation}>
            <div className={styles.dataEstimationDetails}>
              <div className={styles.dataEstimationDetailsText}>Estimare Rewards</div>
              <div className={styles.dataEstimationDetailsPercent}>{percenteValue}%</div>
            </div>
            <div className={styles.dataEstimationInfo}>
              <div>Neuron dissolve delay</div>
              <div>{value} years</div>
            </div>
            <div className={styles.sliderContainer}>
              <Box width={337}>
                <Slider value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} aria-labelledby="input-slider" max={10} />
              </Box>
            </div>
          </div>
        </div>
        <div className={styles.dataRightSide}>
          <p>Vested</p>
          <span className={styles.coreText}>304’492’529 <br></br> OGY </span>

          <canvas ref={chartRef}></canvas>

          <div className={styles.chartLegend}>
            {legendItems.map((legendItem, i) => (
              <div key={i} className={styles.chartLegendItem}>
                <div className={styles.chartLegendColor} style={{ backgroundColor: (legendItem as any).fillStyle }}></div>
                <span className={styles.chartLegendLabel}>{(legendItem as any).text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralData;
