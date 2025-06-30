import React, { useEffect, useState } from 'react';
import styles from '@/styles/Nav.module.scss';
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaCalendarAlt, FaUserAlt, FaBell } from "react-icons/fa";
import { MdOutlinePets, MdOutlineArticle } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";

const menuItems = [
    { href: "/", label: "Dashboard", icon: <FaHome />, isImplemented: true },
    { href: "/admin/member", label: "Member", icon: <FaUserAlt />, isImplemented: true },
    { href: "/admin/pet", label: "Pet", icon: <MdOutlinePets />, isImplemented: true },
    { href: "/admin/qna", label: "QnA", icon: <IoChatboxEllipses />, isImplemented: true },
    { href: "/calendar", label: "Calendar", icon: <FaCalendarAlt />, isImplemented: false },
    { href: "/content", label: "Content", icon: <MdOutlineArticle />, isImplemented: false },
    { href: "/notice", label: "Notice", icon: <FaBell />, isImplemented: false },
];

const Nav = () => {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/me');
                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                console.error('유저 정보 가져오기 실패', err);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/logout');
        router.push('/admin/login');
    };

    return (
        <div className={styles.nav}>
            <h1 className={styles.logo}>
                <Link href="/">
                    <img src="/logo.png" alt="doglog logo" />
                </Link>
            </h1>

            <ul className={styles.menulist}>
                {menuItems.map((item) => {
                    const isActive = router.pathname === item.href;

                    return (
                        <li
                            key={item.href}
                            className={!item.isImplemented ? styles.disabled : ''}
                        >
                            {item.isImplemented ? (
                                <Link href={item.href} className={`${styles.menu} ${isActive ? styles.active : ''}`}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ) : (
                                <div className={styles.menu} title="준비 중입니다.">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>

            {/* 로그인 상태 하단에 표시 */}
            <div className={styles.loginInfo}>
                {user ? (
                    <>
                        <p><strong>{user.username}</strong> 님, 반갑습니다.</p>
                        <button onClick={handleLogout}>로그아웃하기</button>
                    </>
                ) : (
                    <Link href="/admin/login">로그인하기</Link>
                )}
            </div>

            <div className={styles.menubar}>
                <HiBars3 />
            </div>
        </div>
    );
};

export default Nav;
