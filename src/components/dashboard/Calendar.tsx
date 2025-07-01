import React, {useState} from 'react';
import styles from '@/styles/dashboard/Calendar.module.scss';

interface CalendarProps {
    className?: string;
}

interface EventItem {
    id: number;
    year: number;
    month: number;
    day: number;
    title: string;
}

const Calendar: React.FC<CalendarProps> = ({className}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const holidays: EventItem[] = [
        // 2024년
        {id: 1, year: 2024, month: 1, day: 1, title: '신정'},
        {id: 101, year: 2024, month: 2, day: 17, title: '세계 고양이의 날 (이탈리아)'},
        {id: 102, year: 2024, month: 2, day: 22, title: '고양이의 날 (일본)'},
        {id: 103, year: 2024, month: 3, day: 1, title: '고양이의 날 (러시아)'},
        {id: 104, year: 2024, month: 3, day: 23, title: '세계 강아지의 날'},
        {id: 2, year: 2024, month: 2, day: 9, title: '설날 연휴'},
        {id: 3, year: 2024, month: 2, day: 10, title: '설날'},
        {id: 4, year: 2024, month: 2, day: 11, title: '설날 연휴'},
        {id: 5, year: 2024, month: 2, day: 12, title: '설날 대체휴일'},
        {id: 6, year: 2024, month: 3, day: 1, title: '삼일절'},
        {id: 7, year: 2024, month: 4, day: 10, title: '제22대 국회의원 선거일'},
        {id: 8, year: 2024, month: 5, day: 5, title: '어린이날'},
        {id: 9, year: 2024, month: 5, day: 6, title: '어린이날 대체휴일'},
        {id: 10, year: 2024, month: 5, day: 15, title: '부처님오신날'},
        {id: 11, year: 2024, month: 6, day: 6, title: '현충일'},
        {id: 105, year: 2024, month: 8, day: 8, title: '세계 고양이의 날'},
        {id: 12, year: 2024, month: 8, day: 15, title: '광복절'},
        {id: 106, year: 2024, month: 8, day: 26, title: '세계 개의 날'},
        {id: 13, year: 2024, month: 9, day: 16, title: '추석 연휴'},
        {id: 14, year: 2024, month: 9, day: 17, title: '추석'},
        {id: 15, year: 2024, month: 9, day: 18, title: '추석 연휴'},
        {id: 107, year: 2024, month: 10, day: 1, title: '세계 개의 날 (미국)'},
        {id: 16, year: 2024, month: 10, day: 3, title: '개천절'},
        {id: 108, year: 2024, month: 10, day: 4, title: '세계 동물의 날'},
        {id: 17, year: 2024, month: 10, day: 9, title: '한글날'},
        {id: 109, year: 2024, month: 12, day: 2, title: '세계 개의 날 (영국)'},
        {id: 18, year: 2024, month: 12, day: 25, title: '크리스마스'},


        // 2025년
        {id: 19, year: 2025, month: 1, day: 1, title: '신정'},
        {id: 201, year: 2025, month: 2, day: 17, title: '세계 고양이의 날 (이탈리아)'},
        {id: 202, year: 2025, month: 2, day: 22, title: '고양이의 날 (일본)'},
        {id: 203, year: 2025, month: 3, day: 1, title: '고양이의 날 (러시아)'},
        {id: 204, year: 2025, month: 3, day: 23, title: '세계 강아지의 날'},
        {id: 20, year: 2025, month: 1, day: 27, title: '설날 연휴'},
        {id: 21, year: 2025, month: 1, day: 28, title: '설날'},
        {id: 22, year: 2025, month: 1, day: 29, title: '설날 연휴'},
        {id: 23, year: 2025, month: 1, day: 30, title: '설날 대체휴일'},
        {id: 24, year: 2025, month: 3, day: 1, title: '삼일절'},
        {id: 25, year: 2025, month: 3, day: 3, title: '삼일절 대체휴일'},
        {id: 26, year: 2025, month: 5, day: 5, title: '어린이날'},
        {id: 27, year: 2025, month: 5, day: 6, title: '어린이날 대체휴일'},
        {id: 28, year: 2025, month: 5, day: 12, title: '부처님오신날'},
        {id: 29, year: 2025, month: 6, day: 6, title: '현충일'},
        {id: 205, year: 2025, month: 8, day: 8, title: '세계 고양이의 날'},
        {id: 30, year: 2025, month: 8, day: 15, title: '광복절'},
        {id: 206, year: 2025, month: 8, day: 26, title: '세계 개의 날'},
        {id: 207, year: 2025, month: 10, day: 1, title: '세계 개의 날 (미국)'},
        {id: 31, year: 2025, month: 10, day: 3, title: '개천절'},
        {id: 208, year: 2025, month: 10, day: 4, title: '세계 동물의 날'},
        {id: 32, year: 2025, month: 10, day: 5, title: '추석 연휴'},
        {id: 33, year: 2025, month: 10, day: 6, title: '추석'},
        {id: 34, year: 2025, month: 10, day: 7, title: '추석 연휴'},
        {id: 35, year: 2025, month: 10, day: 8, title: '추석 연휴'},
        {id: 36, year: 2025, month: 10, day: 9, title: '한글날'},
        {id: 209, year: 2025, month: 12, day: 2, title: '세계 개의 날 (영국)'},
        {id: 37, year: 2025, month: 12, day: 25, title: '크리스마스'},


        // 2026년
        {id: 38, year: 2026, month: 1, day: 1, title: '신정'},
        {id: 301, year: 2026, month: 2, day: 17, title: '세계 고양이의 날 (이탈리아)'},
        {id: 302, year: 2026, month: 2, day: 22, title: '고양이의 날 (일본)'},
        {id: 303, year: 2026, month: 3, day: 1, title: '고양이의 날 (러시아)'},
        {id: 304, year: 2026, month: 3, day: 23, title: '세계 강아지의 날'},
        {id: 39, year: 2026, month: 2, day: 16, title: '설날 연휴'},
        {id: 40, year: 2026, month: 2, day: 17, title: '설날'},
        {id: 41, year: 2026, month: 2, day: 18, title: '설날 연휴'},
        {id: 42, year: 2026, month: 3, day: 1, title: '삼일절'},
        {id: 43, year: 2026, month: 3, day: 2, title: '삼일절 대체휴일'},
        {id: 44, year: 2026, month: 5, day: 1, title: '부처님오신날'},
        {id: 45, year: 2026, month: 5, day: 5, title: '어린이날'},
        {id: 46, year: 2026, month: 6, day: 6, title: '현충일'},
        {id: 305, year: 2026, month: 8, day: 8, title: '세계 고양이의 날'},
        {id: 47, year: 2026, month: 8, day: 15, title: '광복절'},
        {id: 306, year: 2026, month: 8, day: 26, title: '세계 개의 날'},
        {id: 48, year: 2026, month: 9, day: 24, title: '추석 연휴'},
        {id: 49, year: 2026, month: 9, day: 25, title: '추석'},
        {id: 50, year: 2026, month: 9, day: 26, title: '추석 연휴'},
        {id: 307, year: 2026, month: 10, day: 1, title: '세계 개의 날 (미국)'},
        {id: 51, year: 2026, month: 10, day: 3, title: '개천절'},
        {id: 308, year: 2026, month: 10, day: 4, title: '세계 동물의 날'},
        {id: 52, year: 2026, month: 10, day: 5, title: '개천절 대체휴일'},
        {id: 53, year: 2026, month: 10, day: 9, title: '한글날'},
        {id: 309, year: 2026, month: 12, day: 2, title: '세계 개의 날 (영국)'},
        {id: 54, year: 2026, month: 12, day: 25, title: '크리스마스'},
    ];

    // 현재 월의 공휴일만 필터링
    const currentMonthHolidays = holidays.filter(holiday =>
        holiday.year === currentDate.getFullYear() &&
        holiday.month === currentDate.getMonth() + 1
    );

    // 현재 월의 공휴일 날짜들을 배열로 추출
    const eventDays = currentMonthHolidays.map(holiday => holiday.day);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // 이전 달의 마지막 날들
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push(
                <div key={`prev-${daysInPrevMonth - i}`} className={`${styles.day} ${styles.otherMonth}`}>
                    {daysInPrevMonth - i}
                </div>
            );
        }

        // 현재 달의 날들
        for (let day = 1; day <= daysInMonth; day++) {
            // 이벤트 배열에서 해당 날짜가 있는지 확인
            const hasEvent = eventDays.includes(day);
            days.push(
                <div
                    key={day}
                    className={`${styles.day} ${hasEvent ? styles.highlighted : ''}`}
                >
                    {day}
                </div>
            );
        }

        // 다음 달의 시작 날들 (6주 완성을 위해)
        const totalCells = 42; // 6주 × 7일
        const remainingCells = totalCells - days.length;

        for (let day = 1; day <= remainingCells; day++) {
            days.push(
                <div key={`next-${day}`} className={`${styles.day} ${styles.otherMonth}`}>
                    {day}
                </div>
            );
        }

        return days;
    };

    const formatMonth = (date: Date) => {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
    };

    return (
        <div className={`${styles.calendar} ${className || ''}`}>
            <div className={styles.calendarSection}>
                <div className={styles.header}>
                    <span className={styles.title}>이번달 주요 이벤트</span>
                    <button className={styles.searchButton}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </button>
                </div>

                <div className={styles.calendarContainer}>
                    <div className={styles.monthNavigation}>
                        <button className={styles.navButton} onClick={goToPreviousMonth}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                        </button>
                        <span className={styles.monthTitle}>{formatMonth(currentDate)}</span>
                        <button className={styles.navButton} onClick={goToNextMonth}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </button>
                    </div>

                    <div className={styles.weekHeader}>
                        <div className={styles.dayHeader}>Sun</div>
                        <div className={styles.dayHeader}>Mon</div>
                        <div className={styles.dayHeader}>Tue</div>
                        <div className={styles.dayHeader}>Wed</div>
                        <div className={styles.dayHeader}>Thu</div>
                        <div className={styles.dayHeader}>Fri</div>
                        <div className={styles.dayHeader}>Sat</div>
                    </div>

                    <div className={styles.daysGrid}>
                        {renderCalendar()}
                    </div>
                </div>
            </div>

            <div className={styles.eventsList}>
                {currentMonthHolidays.length > 0 ? (
                    currentMonthHolidays.map((holiday) => (
                        <div key={holiday.id} className={styles.eventItem}>
                            <span className={styles.eventDate}>{holiday.day}일</span>
                            <span className={styles.eventTitle}>{holiday.title}</span>
                        </div>
                    ))
                ) : (
                    <div className={styles.noEvents}>
                        <span className={styles.noEventsText}>이번 달 공휴일이 없습니다</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;