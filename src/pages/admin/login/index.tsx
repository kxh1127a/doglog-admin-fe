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
                router.push('/');
            } else {
                const data = await res.json();
                console.log(data);
                // 코드 값 분기 처리
                if (data.code === 'USER_NOT_FOUND' || data.code === 'INVALID_PASSWORD') {
                    setError('아이디 또는 비밀번호가 잘못 되었습니다. 정확히 입력해 주세요.');
                } else if (data.code === 'UNAUTHORIZED_ROLE') {
                    setError('관리자 권한이 없습니다. 관리자 계정으로 로그인해 주세요.');
                } else {
                    setError(data.message || '로그인에 실패했습니다.');
                }
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
                    <p className={styles.errMsg} style={{ color: 'red' }}>{error}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
