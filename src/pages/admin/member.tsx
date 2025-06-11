import React, {useEffect, useState} from 'react';
import {MdFace} from "react-icons/md";
import {MdOutlineFaceRetouchingNatural} from "react-icons/md";
import {MdOutlineFaceRetouchingOff} from "react-icons/md";
import styles from '@/styles/Member.module.scss';
import {TiArrowSortedDown} from "react-icons/ti";
import {TiArrowSortedUp} from "react-icons/ti";
import {FaUserCircle} from "react-icons/fa";
import {FaUserSlash} from "react-icons/fa";
import {MdAdminPanelSettings} from "react-icons/md";

type User = {
    memberRole: string;
    name: string;
    userName: string;
    email: string;
    phone: string;
    petName: string;
    petBirthDate: string;
    petProfileImageUrl: string;
    createdAt: string;
    lastLoginInfo: string;
    isEnabled: boolean;

};

const Member = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // member type sort
    const [filter, setFilter] = useState('all');
    // member date sort
    const [isDescendingCreatedAt, setIsDescendingCreatedAt] = useState(true);
    const [isDescendingLastLoginAt, setIsDescendingLastLoginAt] = useState(true);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDirection, setSortDirection] = useState("desc");
    // member search
    const [searchOption, setSearchOption] = useState("name");
    const [searchWord, setSearchWord] = useState("");


    const fetchUsers = async (page: number, size: number, sortBy: string, direction: string, filter: string) => {
        const url = `http://localhost:8089/member/api?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&filter=${filter}`;
        // if (filter && filter != 'all') {
        //     url += `&filter=${filter}`;
        // }
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        // { "createdAt":"2025-05-15","email":"kxh1127a@gmail.com","isEnabled":true,"lastLoginInfo":"2 days ago","name":"허기범","petBirthDate":"2019-01-06",
        //    "petName":"제로","petProfileImageUrl":"uploads/petProfile/pic1.png","phone":"010-8888-8888","userName":"kxh1127a" }
        return data;
    }

    const searchUsers = async (page: number, size: number, option: string, word: string, sortBy: string, direction: string, filter: string) => {
        const searchUrl = `http://localhost:8089/member/search?${option}=${word}&page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&filter=${filter}`;
        console.log(searchUrl);
        const res = await fetch(searchUrl);
        const data = await res.json();
        console.log(data.data);
        return data;
    }

    // 검색 엔터
    // const handleSearch = () => {
    //     if (searchWord.trim() !== "") {
    //         searchUsers(searchOption, searchWord, sortBy, sortDirection, filter).then((data) => {
    //             setUsers(data.data.content);
    //             setTotalPages(data.data.totalPages);
    //         });
    //     }
    // };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchWord.trim() === "") {
                fetchUsers(page, 10, sortBy, sortDirection, filter).then(data => {
                    setUsers(data.data.content);
                    setTotalPages(data.data.totalPages);
                });
            } else {
                searchUsers(page, 10, searchOption, searchWord, sortBy, sortDirection, filter).then(data => {
                    console.log(searchWord);
                    setUsers(data.data.content);
                    setTotalPages(data.data.totalPages);
                });
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchWord, searchOption, page, sortBy, sortDirection, filter]);


    return (
        <div className="main-container">

            <article className={styles.article_container}>
                <section className={styles.upper_section}>

                    {/*sorting button*/}
                    <div className={styles.user_status_btn_container}>
                        <button className={filter == "all" ? styles.active_status : ''} onClick={() => {
                            setFilter("all");
                            setPage(0);
                        }}><MdFace/> 전체회원
                        </button>
                        <button className={filter == "normal" ? styles.active_status : ''} onClick={() => {
                            setFilter("normal");
                            setPage(0);
                        }}><MdOutlineFaceRetouchingNatural/> 활동회원
                        </button>
                        <button className={filter == "withdrawn" ? styles.active_status : ''} onClick={() => {
                            setFilter("withdrawn");
                            setPage(0);
                        }}><MdOutlineFaceRetouchingOff/> 탈퇴회원
                        </button>
                    </div>
                    <div className={styles.search_container}>
                        <div className={styles.select_box}>
                            <select onChange={(e) => setSearchOption(e.target.value)}>
                                <option value="name">이름</option>
                                <option value="userName">아이디</option>
                                <option value="email">이메일</option>
                                <option value="phone">핸드폰번호</option>
                            </select>
                        </div>

                        <input type="text" placeholder="검색어를 입력하세요."
                               onChange={(e) => {
                                   setSearchWord(e.target.value);
                                   setPage(0);
                               }}
                            // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                </section>
                <section className={styles.lower_section}>
                    <div className={styles.user_table}>
                        <div className={`${styles.user_header} ${styles.header}`}>
                            <div>유저기본정보</div>
                            <div>전화번호</div>
                            <div>반려견정보</div>
                            <div>가입일
                                {
                                    isDescendingCreatedAt
                                        ? <TiArrowSortedDown
                                            className={`${sortBy == "createdAt" ? styles.active_sort_btn : ''}`}
                                            onClick={() => {
                                                setIsDescendingCreatedAt(false);
                                                setSortBy("createdAt");
                                                // setPage(0);
                                                setSortDirection("asc");
                                            }}/>
                                        : <TiArrowSortedUp
                                            className={`${sortBy == "createdAt" ? styles.active_sort_btn : ''}`}
                                            onClick={() => {
                                                setIsDescendingCreatedAt(true);
                                                setSortBy("createdAt");
                                                // setPage(0);
                                                setSortDirection("desc");
                                            }}/>
                                }
                            </div>
                            <div>마지막접속
                                {
                                    isDescendingLastLoginAt
                                        ? <TiArrowSortedDown
                                            className={`${sortBy == "lastLoginAt" ? styles.active_sort_btn : ''}`}
                                            onClick={() => {
                                                setIsDescendingLastLoginAt(false);
                                                setSortBy("lastLoginAt");
                                                // setPage(0);
                                                setSortDirection("desc");
                                            }}/>
                                        : <TiArrowSortedUp
                                            className={`${sortBy == "lastLoginAt" ? styles.active_sort_btn : ''}`}
                                            onClick={() => {
                                                setIsDescendingLastLoginAt(true);
                                                setSortBy("lastLoginAt");
                                                // setPage(0);
                                                setSortDirection("asc");
                                            }}/>
                                }
                            </div>
                        </div>

                        <div className={styles.user_body}>

                            {/*{ "createdAt":"2025-05-15","email":"kxh1127a@gmail.com","isEnabled":true,"lastLoginInfo":"2 days ago","name":"허기범","petBirthDate":"2019-01-06",*/}
                            {/*    "petName":"제로","petProfileImageUrl":"uploads/petProfile/pic1.png","phone":"010-8888-8888","userName":"kxh1127a" }*/}
                            {
                                users.map((user, index: number) => (
                                    <div key={index}
                                         className={`${styles.user_row} ${!user.isEnabled ? styles.user_row_disabled : ''}`}>
                                        <div className={styles.user_info}>
                                            {/*<img className={`${styles.profile_icon}`}*/}
                                            {/*     style={{backgroundImage: `url(http://localhost:8089/${user.petProfileImageUrl})`}}/>*/}
                                            {
                                                !user.isEnabled ? <FaUserSlash className={styles.user_icon}/> :
                                                    (
                                                        user.memberRole === 'ADMIN' ?
                                                            <MdAdminPanelSettings className={styles.admin_icon}/> :
                                                            <FaUserCircle className={styles.user_icon}/>
                                                    )
                                            }
                                            <div>
                                                <div><strong>{user.name} / {user.userName}</strong></div>
                                                <div className={styles.email}>{user.email}</div>
                                            </div>
                                        </div>
                                        <div>{user.phone}</div>
                                        <div>{user.petName} ({user.petBirthDate})</div>
                                        <div>{user.createdAt}</div>
                                        <div>{user.lastLoginInfo}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/*paging button*/
                    }
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
                </section>
            </article>
        </div>
    )
        ;
};

export default Member;