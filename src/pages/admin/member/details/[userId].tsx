import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import styles from '@/styles/MemberDetails.module.scss';
import {FaUserCircle} from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function MemberDetailPage() {
    const router = useRouter();
    const {userId} = router.query;

    // const [user, setUser] = useState(null);
    useEffect(() => {
        if (!userId) return;

        // 예시: 유저 정보 API 호출
        fetch(`/api/users/${userId}`)
            .then((res) => res.json())
        // .then((data) => setUser(data));
    }, [userId]);

// 임시 데이터 (백엔드 연동 전)
    const user = {
        name: '김블랙',
        nickname: 'Tooni',
        phone: '010-1234-1234',
        email: 'itsme@gmail.com',
        joinedAt: '2024-12-08',
    };

    const pets = [
        {name: '백구', birth: '2022-03-11', gender: '수컷', weight: '14kg', breed: '진돗개'},
        {name: '바둑이', birth: '2022-03-11', gender: '수컷', weight: '14kg', breed: '진돗개'},
        {name: '백구', birth: '2022-03-11', gender: '수컷', weight: '14kg', breed: '진돗개'},
        {name: '가나다라마사', birth: '2022-03-11', gender: '수컷', weight: '14kg', breed: '진돗개'},
    ];

    const stats = {likedContent: 21, likedComments: 120};

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.backward} onClick={() => router.back()}>
                    <RiArrowGoBackLine />
                </div>
                <div className={styles.avatar}>
                    <FaUserCircle/>
                </div>
                <div className={styles.userInfoLeft}>
                    <div className={styles.textInfo}>
                        <div className={styles.row}>
                            <span className={styles.label}>이름</span>
                            <span>김블랙</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>닉네임</span>
                            <span>Tooni</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>전화번호</span>
                            <span>010-1234-1234</span>
                        </div>
                    </div>
                </div>

                <div className={styles.userInfoRight}>
                    <div className={styles.textInfo}>
                        <div className={styles.row}>
                            <span className={styles.label}>이메일</span>
                            <span>itsme@gmail.com</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>가입일</span>
                            <span>2024-12-08</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.petTable}>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>성별</th>
                        <th>몸무게</th>
                        <th>견종</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pets.map((pet, index) => (
                        <tr key={index}>
                            <td>
                                <div className={styles.petImg}></div>
                            </td>
                            <td>{pet.name}</td>
                            <td>{pet.birth}</td>
                            <td>{pet.gender}</td>
                            <td>{pet.weight}</td>
                            <td>{pet.breed}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.contentStats}>
                <div className={styles.box}>
                    <div className={styles.label}>좋아요 누른 컨텐츠</div>
                    <div className={styles.value}>121건</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.label}>문의한 내역</div>
                    <div className={styles.value}>87건</div>
                </div>
            </div>
        </div>
    );
}
