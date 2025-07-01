import React, { useEffect, useState } from 'react';
import styles from '@/styles/Carousel.module.scss';

const images = [
    '/images/carousel-1.png',
    '/images/carousel-2.png',
    '/images/carousel-3.png',
    '/images/carousel-4.png',
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 슬라이드
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.carousel}>
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`슬라이드 ${index + 1}`}
                    className={`${styles.image} ${index === currentIndex ? styles.active : ''}`}
                />
            ))}
        </div>
    );
};

export default Carousel;
