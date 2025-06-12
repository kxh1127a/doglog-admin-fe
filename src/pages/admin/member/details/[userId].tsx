import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/MemberDetails.module.scss';
import {FaUserCircle, FaUserSlash} from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MemberResponse } from '@/types/memberDetailsType';
import {MdAdminPanelSettings} from "react-icons/md";

export default function MemberDetailPage() {
    const router = useRouter();
    const { userId } = router.query;
    const [userData, setUserData] = useState<MemberResponse | null>(null);

    const fetchUserDetails = async (userId: string | string[] | undefined) => {
        if (!userId) return;

        const url = `http://localhost:8089/member/detail/${userId}`;
        const res = await fetch(url);
        const result = await res.json();
        return result.data;
    }

    useEffect(() => {
        if (userId) {
            fetchUserDetails(userId).then(data => {
                console.log(data);
                setUserData(data);
            });
        }
    }, [userId]);

    if (!userData) return <div>로딩 중...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.backward} onClick={() => {
                    // router.push('/admin/member');
                    router.back();
                }}>
                    <RiArrowGoBackLine />
                </div>
                <div className={styles.avatar}>
                    {
                        !userData.isEnabled ? <FaUserSlash className={styles.user_icon}/> :
                            (
                                userData.role === 'ADMIN' ?
                                    <MdAdminPanelSettings className={styles.admin_icon}/> :
                                    <FaUserCircle className={styles.user_icon}/>
                            )
                    }
                </div>
                <div className={styles.userInfoLeft}>
                    <div className={styles.textInfo}>
                        <div className={styles.row}>
                            <span className={styles.label}>이름</span>
                            <span>{userData.name}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>닉네임</span>
                            <span>{userData.userName}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>전화번호</span>
                            <span>{userData.phone}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.userInfoRight}>
                    <div className={styles.textInfo}>
                        <div className={styles.row}>
                            <span className={styles.label}>이메일</span>
                            <span>{userData.email}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>가입일</span>
                            <span>{userData.createdAt.slice(0, 10)}</span>
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
                    {userData.pets.map((pet, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={`http://localhost:8089/${pet.petProfileImageUrl}`}
                                    onError={(e) => {
                                        e.currentTarget.src = 'http://localhost:8089/uploads/petProfile/pic-default.png';
                                    }}
                                    className={styles.petImg}
                                />
                            </td>
                            <td>{pet.petName}</td>
                            <td>{pet.petBirthDate}</td>
                            <td>{pet.petGender === 'MALE' ? '수컷' : '암컷'}</td>
                            <td>{pet.petWeight} kg</td>
                            <td>{pet.petBreed}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.contentStats}>
                <div className={styles.box}>
                    <div className={styles.label}>좋아요 누른 컨텐츠</div>
                    <div className={styles.value}>{userData.countTipLike}건</div>
                </div>
                <div className={styles.box}>
                    <div className={styles.label}>문의한 내역</div>
                    <div className={styles.value}>{userData.countQuestion}건</div>
                </div>
            </div>
        </div>
    );
}
