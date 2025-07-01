import React from 'react';
import styles from '@/styles/dashboard/Dashboard.module.scss';

// 각 컴포넌트들 (나중에 별도 파일로 분리)
import StatsCard from '@/components/dashboard/StatsCard';
import ChartWidget from '@/components/dashboard/ChartWidget';
import DonutChart from '@/components/dashboard/DonutChart';
import TodoList from '@/components/dashboard/TodoList';
import NotificationPanel from '@/components/dashboard/Announcement';
import Calendar from '@/components/dashboard/Calendar';
import AdminLayout from '@/components/AdminLayout';

const Dashboard: React.FC = () => {
    return (
        <AdminLayout>
            <div className="main-container">
                <div className={styles.dashboard}>
                    <div className={styles.container}>
                        {/* 상단 통계 카드들 */}
                        <div className={styles.statsRow}>
                            <div className={styles.statsCard}>
                                <StatsCard
                                    title="방문자수"
                                    value="2,430"
                                    subtitle="4월"
                                    trend="up"
                                />
                            </div>
                            <div className={styles.statsCard}>
                                <StatsCard
                                    title="신규"
                                    value="1,991"
                                    subtitle="2월부터"
                                    trend="up"
                                />
                            </div>
                        </div>

                        {/* 메인 콘텐츠 영역 */}
                        <div className={styles.mainContent}>
                            {/* 왼쪽 열 */}
                            <div className={styles.leftColumn}>
                                {/* 차트 위젯 */}
                                <div className={styles.chartWidget}>
                                    <ChartWidget/>
                                </div>

                                {/* 할일 목록 */}
                                <div className={styles.todoWidget}>
                                    <TodoList/>
                                </div>
                            </div>

                            {/* 오른쪽 열 */}
                            <div className={styles.rightColumn}>
                                {/* 도넛 차트 */}
                                <div className={styles.donutChart}>
                                    <DonutChart/>
                                </div>

                                {/* 알림 패널 */}
                                <div className={styles.notificationPanel}>
                                    <NotificationPanel/>
                                </div>

                                {/* 달력 */}
                                <div className={styles.calendar}>
                                    <Calendar/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;