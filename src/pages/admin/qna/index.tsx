import React, {useEffect, useState} from 'react';
import styles from '@/styles/Qna.module.scss';
import {useRouter} from "next/router";

const inquiries = [
    {id: 1, title: '앱에서 반려견 등록이 안돼요', user: '허기범', date: '2025-02-01', status: '답변완료'},
    {id: 2, title: '병원 정보가 잘못되어 있어요', user: '이건휘', date: '2025-02-02', status: '확인중'},
    {id: 3, title: '앱 오류 문의', user: '윤혜경', date: '2025-02-04', status: '답변완료'},
];

const Index = () => {
    return (
        <div className="main-container">
            <div className={styles.container}>
                <div className={styles.upperBox}><h1 className={styles.title}>유저 1:1 문의내역</h1></div>
                <div className={styles.box}>

                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>문의 제목</th>
                            <th>문의자</th>
                            <th>등록일</th>
                            <th>상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inquiries.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.user}</td>
                                <td>{item.date}</td>
                                <td>
                  <span
                      className={
                          item.status === '답변완료'
                              ? styles.statusCompleted
                              : styles.statusPending
                      }
                  >
                    {item.status}
                  </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;