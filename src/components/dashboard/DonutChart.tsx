import React, { useState, useEffect } from 'react';
import styles from '@/styles/dashboard/DonutChart.module.scss';

interface DonutDataPoint {
    label: string;
    value: number;
    color: string;
}

interface DonutChartProps {
    title?: string;
    data?: DonutDataPoint[];
    size?: number;
    strokeWidth?: number;
    showLabels?: boolean;
    showPercentages?: boolean;
}

const defaultData: DonutDataPoint[] = [
    { label: '완료', value: 739, color: 'rgba(245,158,11,0.66)' },
    { label: '진행중', value: 169, color: '#e5e7eb' }
];

const DonutChart: React.FC<DonutChartProps> = ({
                                                   title = "Q&A 답변 진행 상황",
                                                   data = defaultData,
                                                   size = 160,
                                                   strokeWidth = 20,
                                                   showLabels = true,
                                                   showPercentages = true
                                               }) => {
    const [animatedData, setAnimatedData] = useState<DonutDataPoint[]>(
        data.map(item => ({ ...item, value: 0 }))
    );
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setAnimatedData(data);
        }, 300);

        const endTimer = setTimeout(() => {
            setIsAnimating(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
            clearTimeout(endTimer);
        };
    }, [data]);

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let cumulativePercentage = 0;

    const createPath = (percentage: number, startPercentage: number) => {
        const startAngle = (startPercentage / 100) * 360 - 90;
        const endAngle = ((startPercentage + percentage) / 100) * 360 - 90;

        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;

        const largeArcFlag = percentage > 50 ? 1 : 0;

        const x1 = center + radius * Math.cos(startAngleRad);
        const y1 = center + radius * Math.sin(startAngleRad);
        const x2 = center + radius * Math.cos(endAngleRad);
        const y2 = center + radius * Math.sin(endAngleRad);

        return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    return (
        <div className={styles.donutChart}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.controls}>
                    <button className={styles.controlButton}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="5" r="2" fill="currentColor"/>
                            <circle cx="12" cy="12" r="2" fill="currentColor"/>
                            <circle cx="12" cy="19" r="2" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.chartContainer}>
                <div className={styles.svgContainer}>
                    <svg width={size} height={size} className={styles.svg}>
                        {/* 배경 원 */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth={strokeWidth}
                        />

                        {/* 데이터 아크들 */}
                        {animatedData.map((item, index) => {
                            const percentage = total > 0 ? (item.value / total) * 100 : 0;
                            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -((cumulativePercentage / 100) * circumference);

                            const currentCumulative = cumulativePercentage;
                            cumulativePercentage += percentage;

                            return (
                                <circle
                                    key={index}
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    fill="none"
                                    stroke={item.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    className={styles.arc}
                                    style={{
                                        animationDelay: `${index * 0.2}s`
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {/* 중앙 텍스트 */}
                    <div className={styles.centerContent}>
                        <div className={styles.mainValue}>
                            {data[0]?.value || 0}
                            <span className={styles.totalValue}>/{total}</span>
                        </div>
                        <div className={styles.centerLabel}>
                            {showPercentages && total > 0 &&
                                `${Math.round((data[0]?.value || 0) / total * 100)}%`
                            }
                        </div>
                    </div>
                </div>

                {showLabels && (
                    <div className={styles.legend}>
                        {data.map((item, index) => {
                            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
                            return (
                                <div key={index} className={styles.legendItem}>
                                    <div
                                        className={styles.legendColor}
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <div className={styles.legendContent}>
                                        <span className={styles.legendLabel}>{item.label}</span>
                                        <div className={styles.legendValues}>
                                            <span className={styles.legendValue}>{item.value}</span>
                                            {showPercentages && (
                                                <span className={styles.legendPercentage}>({percentage}%)</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonutChart;