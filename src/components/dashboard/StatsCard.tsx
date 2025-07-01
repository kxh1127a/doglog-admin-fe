import React from 'react';
import styles from '@/styles/dashboard/StatsCard.module.scss';

interface StatsCardProps {
    title: string;
    value: string;
    subtitle: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
                                                 title,
                                                 value,
                                                 subtitle,
                                                 trend = 'neutral',
                                                 icon
                                             }) => {
    return (
        <div className={styles.statsCard}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <h3 className={styles.title}>{title}</h3>
                </div>
                <div className={styles.moreButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="5" r="2" fill="currentColor"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        <circle cx="12" cy="19" r="2" fill="currentColor"/>
                    </svg>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.valueSection}>
                    <span className={styles.value}>{value}</span>
                    {trend !== 'neutral' && (
                        <div className={`${styles.trendIndicator} ${styles[trend]}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                {trend === 'up' ? (
                                    <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                ) : (
                                    <path d="M17 10l-5 5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                )}
                            </svg>
                        </div>
                    )}
                </div>

                <p className={styles.subtitle}>{subtitle}</p>
            </div>

            <div className={styles.footer}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill}></div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;