import React, {useEffect, useState} from 'react';
import styles from '@/styles/Qna.module.scss';
import {useRouter} from "next/router";
import {TiArrowSortedDown, TiArrowSortedUp} from "react-icons/ti";
import {GrStatusPlaceholder} from "react-icons/gr";
import {GrStatusPlaceholderSmall} from "react-icons/gr";
import {Qna} from "@/types/QnaType";

const inquiries = [
    {id: 1, title: '앱에서 반려견 등록이 안돼요', user: '허기범', date: '2025-02-01', status: '답변완료'},
    {id: 2, title: '병원 정보가 잘못되어 있어요', user: '이건휘', date: '2025-02-02', status: '확인중'},
    {id: 3, title: '앱 오류 문의', user: '윤혜경', date: '2025-02-04', status: '답변완료'},
];

const Index = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(3);
    const [searchOption, setSearchOption] = useState("byTitle");
    const [searchWord, setSearchWord] = useState("");
    const [orderDirection, setOrderDirection] = useState("desc");
    const [status, setStatus] = useState("all");


    const fetchData = async (page: number, size: number, status: string, orderDirection: string, searchOption: string, searchWord: string) => {
        let url = `http://localhost:8089/qna/api?page=${page}&size=${size}&status=${status}&orderDirection=${orderDirection}`;
        if (searchWord != "") {
            url += `&${searchOption}=${searchWord}`;
        }
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        return data;
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData(page, 10, status, orderDirection, searchOption, searchWord).then(data => {
                setData(data.data.content);
                setTotalPages(data.data.totalPages);
            });

        }, 500);

        return () => {
            clearTimeout(handler);
        };

    }, [])

    return (
        <div className="main-container">
            <div className={styles.container}>

                <div className={styles.upperBox}>
                    <div className={styles.title}><h4>유저 1:1 문의내역</h4></div>

                    {/*검색 container*/}
                    <div className={styles.search_container}>
                        <div className={styles.select_box}>
                            <select onChange={(e) => setSearchOption(e.target.value)}>
                                <option value="byTitle">제목</option>
                                <option value="byWriter">작성자</option>
                            </select>
                        </div>

                        <input type="text" placeholder="검색어를 입력하세요."
                               onChange={(e) => {
                                   setSearchWord(e.target.value);
                                   setPage(0);
                               }}
                        />
                    </div>
                    {/*검색 container*/}

                </div>

                <div className={styles.box}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>문의 제목</th>
                            <th>작성자</th>
                            <th>
                                <div className={styles.orderIcon}>등록일
                                    {
                                        orderDirection === "desc"
                                            ? <TiArrowSortedDown
                                                className={styles.orderBtn}
                                                onClick={() => {
                                                    setOrderDirection("asc");
                                                }}/>
                                            : <TiArrowSortedUp
                                                className={styles.orderBtn}
                                                onClick={() => {
                                                    setOrderDirection("desc");
                                                }}/>
                                    }
                                </div>
                            </th>
                            <th>
                                <div className={styles.statusIcon}>
                                    상태
                                    {
                                        status == "all"
                                            ? <GrStatusPlaceholder onClick={() => setStatus("done")}/>
                                            : (status == "done"
                                                ? <GrStatusPlaceholderSmall className={styles.statusDone}
                                                                            onClick={() => setStatus("checking")}/>
                                                : <GrStatusPlaceholderSmall className={styles.statusChecking}
                                                                            onClick={() => setStatus("all")}/>)
                                    }
                                </div>
                            </th>
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


                {/*하단 페이징 버튼 container*/}
                <div className={styles.paging_button_container}>
                    <button onClick={() => setPage(page - 1)} disabled={page <= 0}>
                        &lt;
                    </button>
                    {
                        [...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={i === page ? styles.active_page : ''}
                                onClick={() => setPage(i)}
                            >
                                {i + 1}
                            </button>
                        ))
                    }
                    {/*<span>{page + 1}</span><span>/</span><span>{totalPages}</span>*/}
                    <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
                        &gt;
                    </button>
                </div>
                {/*하단 페이징 버튼 container*/}

            </div>
        </div>
    );
};

export default Index;