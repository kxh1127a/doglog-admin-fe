import React from 'react';
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
    { href: "/calendar", label: "Calendar", icon: <FaCalendarAlt />, isImplemented: false }, // 비활성
    { href: "/content", label: "Content", icon: <MdOutlineArticle />, isImplemented: false }, // 비활성
    { href: "/notice", label: "Notice", icon: <FaBell />, isImplemented: false }, // 비활성

];

const Nav = () => {
    const router = useRouter();

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

            <div className={styles.menubar}>
                <HiBars3 />
            </div>
        </div>
    );
};

export default Nav;
