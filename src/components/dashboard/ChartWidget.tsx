import React, { useState, useEffect } from 'react';
import styles from '@/styles/dashboard/ChartWidget.module.scss';

interface ChartDataPoint {
    label: string;
    values: number[];
    colors?: string[];
}

interface ChartWidgetProps {
    title?: string;
    data?: ChartDataPoint[];
    showGrid?: boolean;
    showLabels?: boolean;
    height?: number;
    legendLabels?: string[];
}

const defaultData: ChartDataPoint[] = [
    { label: '1월', values: [80, 65], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '2월', values: [120, 100], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '3월', values: [90, 110], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '4월', values: [150, 125], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '5월', values: [70, 85], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '6월', values: [110, 95], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '7월', values: [95, 75], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '8월', values: [130, 140], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '9월', values: [85, 90], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '10월', values: [140, 115], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '11월', values: [100, 120], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] },
    { label: '12월', values: [75, 80], colors: ['#bfb3d5', 'rgba(239,178,91,0.71)'] }
];

const ChartWidget: React.FC<ChartWidgetProps> = ({
                                                     title = "신규 유저 월별 통계",
                                                     data = defaultData,
                                                     showGrid = true,
                                                     showLabels = true,
                                                     height = 280,
                                                     legendLabels = ['감소율', '증가율']
                                                 }) => {
    const [animatedData, setAnimatedData] = useState<ChartDataPoint[]>(
        data.map(item => ({ ...item, values: item.values.map(() => 0) }))
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedData(data);
        }, 300);

        return () => clearTimeout(timer);
    }, [data]);

    const maxValue = Math.max(...data.flatMap(item => item.values));
    const gridLines = [0, 25, 50, 75, 100];

    return (
        <div className={styles.chartWidget}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.controls}>
                    <button className={styles.controlButton}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    <button className={styles.controlButton}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="5" r="2" fill="currentColor"/>
                            <circle cx="12" cy="12" r="2" fill="currentColor"/>
                            <circle cx="12" cy="19" r="2" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.chartContainer} style={{ height: height }}>
                {showGrid && (
                    <div className={styles.gridLines}>
                        {gridLines.map((line, index) => (
                            <div
                                key={index}
                                className={styles.gridLine}
                                style={{
                                    bottom: `${(line / 100) * 100}%`
                                }}
                            >
                                <span className={styles.gridLabel}>{line}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.chart}>
                    <div className={styles.bars}>
                        {animatedData.map((item, index) => (
                            <div key={index} className={styles.barContainer}>
                                <div className={styles.barsGroup}>
                                    {item.values.map((value, barIndex) => (
                                        <div
                                            key={barIndex}
                                            className={styles.bar}
                                            style={{
                                                height: `${(value / maxValue) * 85}%`,
                                                backgroundColor: item.colors?.[barIndex] || (barIndex === 0 ? '#bfb3d5' : 'rgba(239,178,91,0.71)'),
                                                animationDelay: `${(index * 2 + barIndex) * 50}ms`
                                            }}
                                        >
                                            <div className={styles.barValue}>{value}</div>
                                        </div>
                                    ))}
                                </div>
                                {showLabels && (
                                    <div className={styles.barLabel}>{item.label}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.legend}>
                    {legendLabels.map((label, index) => (
                        <div key={index} className={styles.legendItem}>
                            <div
                                className={styles.legendColor}
                                style={{
                                    backgroundColor: index === 0 ? '#bfb3d5' : 'rgba(239,178,91,0.71)'
                                }}
                            ></div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.summary}>
                    <span className={styles.summaryText}>
                        평균: {Math.round(data.reduce((sum, item) => sum + item.values.reduce((a, b) => a + b, 0), 0) / (data.length * 2))}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChartWidget;