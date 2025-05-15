import React from 'react';
import styles from '@/styles/Nav.module.scss'
import Link from "next/link";

const Nav = () => {
    return (
        <div className={styles.nav}>
            <h1 className={styles.logo}>
                <Link href="/">
                    <img src="/logo.png" alt="doglog logo"/>
                </Link>
            </h1>
        </div>
    );
};

export default Nav;