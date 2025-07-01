import React from 'react';
import styles from '@/styles/Index.module.scss';
import Link from 'next/link';
import Carousel from "@/components/Carousel";

const AdminIntro = () => {
    return (
        <div className="main-container">
            <div className={styles.fullContainer}>
                <div className={styles.container}>
                    <h2>포트폴리오 목적으로 제작된 사이트 입니다.</h2>
                    <p>
                        방문해주셔서 감사합니다.<br/>
                        해당 프로젝트의 관리자 전용 페이지로, 현재 구현 중에 있습니다.
                    </p>

                    <div className={styles.imageBox}>
                        <Carousel/>
                    </div>

                    <div className={styles.infoBox}>
                        <strong>예시 계정 정보</strong>
                        <ul>
                            <li>• 일반 유저 계정 (권한 제한): <code>user</code> / <code>user1234</code></li>
                            <li>• 관리자 계정 (권한 부여): <code><strong>admin</strong></code> / <code><strong>admin1234</strong></code>
                            </li>
                        </ul>
                    </div>

                    <Link href="/admin/login" className={styles.loginBtn}>로그인페이지 이동</Link>
                </div>
            </div>
        </div>

    );
};

export default AdminIntro;
