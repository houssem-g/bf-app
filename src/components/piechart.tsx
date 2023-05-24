import styles from "../styles/generalData.module.css"
import React, {  useEffect, useRef } from "react";
import Chart from 'chart.js/auto';


interface PiechartDataProps {
    inputValue: number,
    rewardValue: number
}

const PieChart: React.FC<PiechartDataProps> = ({inputValue, rewardValue}) => {

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef: React.MutableRefObject<Chart<"doughnut", number[], unknown> | null> = useRef(null);


    const legendItems: Array<object> = [
      { text: 'Vested', fillStyle: '#0AB57F' },
      { text: 'Locked', fillStyle: '#9474EF' },
      { text: 'Rewarded', fillStyle: '#74B4EF' },
      { text: 'Test', fillStyle: '#F8B073' }
    ];

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
    return (
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
    )

}


export default PieChart;
