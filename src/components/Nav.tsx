import React from 'react';
import styles from '@/styles/Nav.module.scss'
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";

const Nav = () => {
    return (
        <div className={styles.nav}>
            <h1 className={styles.logo}>
                <Link href="/">
                    <img src="/logo.png" alt="doglog logo"/>
                </Link>
            </h1>
            <ul className={styles.menulist}>
                <li>
                    <Link href="/" className={styles.menu}>
                        <FaHome />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/member" className={styles.menu}>
                        <FaUserAlt />
                        <span>Member</span>
                    </Link>
                </li>
                <li>
                    <Link href="/pet" className={styles.menu}>
                        <MdOutlinePets />
                        <span>Pet</span>
                    </Link>
                </li>
                <li>
                    <Link href="/calendar" className={styles.menu}>
                        <FaCalendarAlt />
                        <span>Calendar</span>
                    </Link>
                </li>
                <li>
                    <Link href="/content" className={styles.menu}>
                        <MdOutlineArticle />
                        <span>Content</span>
                    </Link>
                </li>
                <li>
                    <Link href="/notice" className={styles.menu}>
                        <FaBell />
                        <span>Notice</span>
                    </Link>
                </li>
                <li>
                    <Link href="/chart" className={styles.menu}>
                        <IoChatboxEllipses />
                        <span>QnA</span>
                    </Link>
                </li>
            </ul>

            <div className={styles.menubar}>
                <HiBars3 />
            </div>
        </div>
    );
};

export default Nav;