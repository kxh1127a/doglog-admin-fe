// pages/admin/login.jsx
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/Login.module.scss';
import {FaExclamationCircle} from 'react-icons/fa';

const AdminLogin = () => {
    const router = useRouter();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin1234')
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        console.log('로그인 시도', {username, password});

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    credentials: 'same-origin'
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                // 로그인 성공 시 홈이나 원하는 페이지로 이동
                router.push('/admin/pet');
            } else {
                const data = await res.json();
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong');
        }
    };

    return (
        <div className="main-container">
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <div className={styles.iconText}>
                        <FaExclamationCircle className={styles.icon}/>
                        <div>
                            <h3>접근 권한 안내</h3>
                            <p>최고 관리자 또는 관리자 권한이 있는 회원만<br/>접근 가능한 페이지입니다.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="아이디를 입력하세요."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">관리자 로그인</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
